import { createContext, useReducer, useCallback, useRef, useEffect } from 'react';
import { downloadService } from '@services/download.service';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'ultimate_player_downloads';

export const DownloadContext = createContext(null);

function loadPersistedState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Only restore queue, history, settings — never active downloads on fresh load
      return {
        ...parsed,
        downloads: [],
        activeDownloads: 0,
        isProcessing: false,
        totalSpeed: 0,
      };
    }
  } catch { /* */ }
  return null;
}

function getInitialState() {
  const persisted = loadPersistedState();
  if (persisted) return persisted;
  return {
    downloads: [],
    queue: [],
    history: [],
    activeDownloads: 0,
    maxConcurrent: 3,
    isProcessing: false,
    totalSpeed: 0,
    settings: {
      defaultFormat: 'mp4',
      defaultQuality: '1080p',
      downloadPath: 'downloads',
      autoConvert: false,
      notifications: true,
    },
  };
}

const downloadReducer = (state, action) => {
  switch (action.type) {
    case 'RESTORE_STATE':
      return { ...state, ...action.payload };
    case 'ADD_TO_QUEUE':
      return { ...state, queue: [...state.queue, action.payload] };
    case 'REMOVE_FROM_QUEUE':
      return { ...state, queue: state.queue.filter((item) => item.id !== action.payload) };
    case 'START_DOWNLOAD':
      return {
        ...state,
        downloads: [...state.downloads, action.payload],
        queue: state.queue.filter((item) => item.id !== action.payload.id),
        activeDownloads: state.activeDownloads + 1,
        isProcessing: true,
      };
    case 'UPDATE_PROGRESS':
      return {
        ...state,
        downloads: state.downloads.map((d) =>
          d.id === action.payload.id ? { ...d, ...action.payload.updates, lastUpdated: Date.now() } : d
        ),
      };
    case 'COMPLETE_DOWNLOAD': {
      const completed = state.downloads.find((d) => d.id === action.payload.id);
      return {
        ...state,
        downloads: state.downloads.filter((d) => d.id !== action.payload.id),
        history: [{ ...completed, completedAt: new Date().toISOString(), ...action.payload.data }, ...state.history],
        activeDownloads: Math.max(0, state.activeDownloads - 1),
        isProcessing: state.activeDownloads > 1,
      };
    }
    case 'FAIL_DOWNLOAD':
      return {
        ...state,
        downloads: state.downloads.map((d) =>
          d.id === action.payload.id ? { ...d, status: 'failed', error: action.payload.error, failedAt: new Date().toISOString() } : d
        ),
        activeDownloads: Math.max(0, state.activeDownloads - 1),
      };
    case 'PAUSE_DOWNLOAD':
      return {
        ...state,
        downloads: state.downloads.map((d) =>
          d.id === action.payload ? { ...d, status: 'paused', pausedAt: Date.now() } : d
        ),
      };
    case 'RESUME_DOWNLOAD':
      return {
        ...state,
        downloads: state.downloads.map((d) =>
          d.id === action.payload ? { ...d, status: 'downloading', error: null } : d
        ),
      };
    case 'CANCEL_DOWNLOAD':
      return {
        ...state,
        downloads: state.downloads.filter((d) => d.id !== action.payload),
        activeDownloads: Math.max(0, state.activeDownloads - 1),
      };
    case 'CLEAR_HISTORY':
      return { ...state, history: [] };
    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.payload } };
    case 'SET_TOTAL_SPEED':
      return { ...state, totalSpeed: action.payload };
    default:
      return state;
  }
};

function persistState(state) {
  try {
    const { downloads, ...rest } = state;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rest));
  } catch { /* storage full or unavailable */ }
}

export const DownloadProvider = ({ children }) => {
  const [state, dispatch] = useReducer(downloadReducer, undefined, getInitialState);
  const abortControllers = useRef(new Map());
  const persistTimer = useRef(null);

  // Refs to avoid stale closures — must be defined before useCallbacks below
  const dispatchRef = useRef(dispatch);
  dispatchRef.current = dispatch;
  const stateRef = useRef(state);
  stateRef.current = state;
  const startDownloadRef = useRef(null);
  const getSpeedRef = useRef(() => 0);
  getSpeedRef.current = () => state.totalSpeed;

  // Process the next queued item if slots are open
  const processQueue = useCallback(() => {
    const s = stateRef.current;
    if (s.queue.length > 0 && s.activeDownloads < s.maxConcurrent) {
      const next = s.queue[0];
      dispatch({ type: 'REMOVE_FROM_QUEUE', payload: next.id });
      if (startDownloadRef.current) startDownloadRef.current(next);
    }
  }, []);

  // Persist state on change (debounced)
  useEffect(() => {
    if (persistTimer.current) clearTimeout(persistTimer.current);
    persistTimer.current = setTimeout(() => persistState(state), 500);
    return () => { if (persistTimer.current) clearTimeout(persistTimer.current); };
  }, [state.history, state.queue, state.settings]);

  // Attempt to restore partial downloads on mount
  useEffect(() => {
    downloadService.getAllPartialDownloads().then(() => {});
  }, []);

  // Process queue when state changes
  useEffect(() => {
    processQueue();
  }, [state.queue, state.activeDownloads, processQueue]);

  // Analyze URL
  const analyzeURL = useCallback(async (url) => {
    try {
      const analysis = await downloadService.analyzeURL(url);
      return { success: true, data: analysis };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, []);

  // Add to queue
  const addToQueue = useCallback((item) => {
    const downloadItem = {
      id: uuidv4(),
      ...item,
      status: 'queued',
      progress: 0,
      speed: 0,
      eta: null,
      error: null,
      retries: 0,
      maxRetries: 5,
      addedAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_TO_QUEUE', payload: downloadItem });
    return downloadItem.id;
  }, []);

  // Start download
  const startDownload = useCallback(async (item) => {
    const controller = new AbortController();
    abortControllers.current.set(item.id, controller);

    dispatch({
      type: 'START_DOWNLOAD',
      payload: { ...item, status: 'downloading', startedAt: new Date().toISOString(), retries: item.retries || 0 },
    });

    const isResume = item.downloaded > 0;

    try {
      if (isResume) {
        await downloadService.resumeDownload(
          item.partialId || item.id,
          item.url,
          {
            format: item.format,
            quality: item.quality,
            filename: item.filename,
            downloadId: item.partialId || item.id,
          },
          {
            signal: controller.signal,
            onProgress: (progress) => {
              dispatch({
                type: 'UPDATE_PROGRESS',
                payload: {
                  id: item.id,
                  updates: {
                    progress: progress.percent,
                    speed: progress.speed,
                    eta: progress.eta,
                    downloaded: progress.downloaded,
                    total: progress.total,
                  },
                },
              });
            },
          }
        );
      } else {
        await downloadService.download(
          item.url,
          {
            format: item.format,
            quality: item.quality,
            filename: item.filename,
            downloadId: item.partialId || item.id,
          },
          {
            signal: controller.signal,
            onProgress: (progress) => {
              dispatch({
                type: 'UPDATE_PROGRESS',
                payload: {
                  id: item.id,
                  updates: {
                    progress: progress.percent,
                    speed: progress.speed,
                    eta: progress.eta,
                    downloaded: progress.downloaded,
                    total: progress.total,
                  },
                },
              });
            },
          }
        );
      }

      dispatch({
        type: 'COMPLETE_DOWNLOAD',
        payload: { id: item.id, data: { status: 'completed' } },
      });

      await downloadService.addToDownloadHistory({
        url: item.url,
        title: item.title,
        filename: item.filename,
        format: item.format,
        quality: item.quality,
        timestamp: new Date().toISOString(),
      });

      abortControllers.current.delete(item.id);
      processQueue();
    } catch (error) {
      abortControllers.current.delete(item.id);

      if (error.name === 'AbortError') {
        // Aborted by user (pause/cancel) — keep in downloads with paused status
        // The pauseDownload function already set paused, so we won't update here
      } else {
        const retries = (item.retries || 0) + 1;
        if (retries <= (item.maxRetries || 5)) {
          // Auto-retry with backoff
          dispatch({
            type: 'FAIL_DOWNLOAD',
            payload: { id: item.id, error: `${error.message} (retry ${retries}/${item.maxRetries})` },
          });
          setTimeout(() => {
            const current = stateRef.current.downloads.find((d) => d.id === item.id);
            if (current && current.status === 'failed') {
              startDownloadRef.current({ ...item, retries, partialId: item.partialId || item.id });
            }
          }, Math.min(1000 * Math.pow(2, retries), 30000));
        } else {
          dispatch({
            type: 'FAIL_DOWNLOAD',
            payload: { id: item.id, error: error.message },
          });
        }
      }
      processQueue();
    }
  }, [processQueue]);

  startDownloadRef.current = startDownload;

  // Download with options
  const download = useCallback(async (url, options = {}) => {
    const analysis = await analyzeURL(url);
    if (!analysis.success) return { success: false, error: analysis.error };

    const downloadItem = {
      id: uuidv4(),
      url,
      partialId: `partial_${btoa(url).slice(0, 20)}`,
      title: analysis.data.title,
      thumbnail: analysis.data.thumbnail,
      duration: analysis.data.duration,
      format: options.format || state.settings.defaultFormat,
      quality: options.quality || state.settings.defaultQuality,
      filename: options.filename || analysis.data.suggestedFilename,
      status: 'queued',
      progress: 0,
      speed: 0,
      eta: null,
      error: null,
      retries: 0,
      maxRetries: 5,
      addedAt: new Date().toISOString(),
    };

    if (state.activeDownloads < state.maxConcurrent) {
      startDownloadRef.current(downloadItem);
    } else {
      dispatch({ type: 'ADD_TO_QUEUE', payload: downloadItem });
    }

    return { success: true, id: downloadItem.id };
  }, [analyzeURL, state.activeDownloads, state.maxConcurrent, state.settings]);

  // Batch download
  const batchDownload = useCallback(async (urls, options = {}) => {
    const results = [];
    for (const url of urls) {
      const result = await download(url, options);
      results.push(result);
    }
    return results;
  }, [download]);

  // Pause download
  const pauseDownload = useCallback((id) => {
    const controller = abortControllers.current.get(id);
    if (controller) controller.abort();
    dispatch({ type: 'PAUSE_DOWNLOAD', payload: id });
  }, []);

  // Resume download
  const resumeDownload = useCallback((id) => {
    const dl = stateRef.current.downloads.find((d) => d.id === id);
    if (dl) {
      dispatch({ type: 'RESUME_DOWNLOAD', payload: id });
      startDownloadRef.current(dl);
    }
  }, []);

  // Cancel download and remove partial
  const cancelDownload = useCallback(async (id) => {
    const controller = abortControllers.current.get(id);
    if (controller) controller.abort();
    const dl = stateRef.current.downloads.find((d) => d.id === id);
    if (dl?.partialId) await downloadService.removePartialDownload(dl.partialId);
    dispatch({ type: 'CANCEL_DOWNLOAD', payload: id });
    processQueue();
  }, [processQueue]);

  // Retry download from scratch or resume partial
  const retryDownload = useCallback((id) => {
    const dl = stateRef.current.downloads.find((d) => d.id === id);
    if (dl) {
      const wasFailed = dl.status === 'failed';
      if (wasFailed) {
        dispatch({ type: 'CANCEL_DOWNLOAD', payload: id });
      }
      // Re-add as fresh download
      const retryItem = {
        ...dl,
        status: 'queued',
        progress: dl.downloaded || 0,
        error: null,
        retries: 0,
        addedAt: new Date().toISOString(),
      };
      if (stateRef.current.activeDownloads < stateRef.current.maxConcurrent) {
        startDownloadRef.current(retryItem);
      } else {
        dispatch({ type: 'ADD_TO_QUEUE', payload: retryItem });
      }
    }
  }, []);

  // Get supported formats
  const getSupportedFormats = useCallback(() => {
    return downloadService.getSupportedFormats();
  }, []);

  // Get available qualities
  const getAvailableQualities = useCallback(async (url) => {
    const analysis = await analyzeURL(url);
    return analysis.success ? analysis.data.qualities : [];
  }, [analyzeURL]);

  // Convert format
  const convertFormat = useCallback(async (file, targetFormat, options = {}) => {
    return await downloadService.convertFormat(file, targetFormat, options);
  }, []);

  const value = {
    ...state,
    analyzeURL,
    addToQueue,
    download,
    batchDownload,
    startDownload,
    pauseDownload,
    resumeDownload,
    cancelDownload,
    retryDownload,
    getSupportedFormats,
    getAvailableQualities,
    convertFormat,
    clearHistory: () => dispatch({ type: 'CLEAR_HISTORY' }),
    updateSettings: (settings) => dispatch({ type: 'UPDATE_SETTINGS', payload: settings }),
    removeFromQueue: (id) => dispatch({ type: 'REMOVE_FROM_QUEUE', payload: id }),
  };

  return <DownloadContext.Provider value={value}>{children}</DownloadContext.Provider>;
};

export default DownloadContext;