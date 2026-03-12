import { createContext, useReducer, useCallback, useRef } from 'react';
import { downloadService } from '@services/download.service';
import { v4 as uuidv4 } from 'uuid';

const DownloadContext = createContext(null);

const initialState = {
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

const downloadReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_QUEUE':
      return {
        ...state,
        queue: [...state.queue, action.payload],
      };
    case 'REMOVE_FROM_QUEUE':
      return {
        ...state,
        queue: state.queue.filter((item) => item.id !== action.payload),
      };
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
        downloads: state.downloads.map((download) =>
          download.id === action.payload.id
            ? { ...download, ...action.payload.updates }
            : download
        ),
      };
    case 'COMPLETE_DOWNLOAD': {
      const completedDownload = state.downloads.find(
        (d) => d.id === action.payload.id
      );
      return {
        ...state,
        downloads: state.downloads.filter((d) => d.id !== action.payload.id),
        history: [
          { ...completedDownload, completedAt: new Date().toISOString(), ...action.payload.data },
          ...state.history,
        ],
        activeDownloads: Math.max(0, state.activeDownloads - 1),
        isProcessing: state.activeDownloads > 1,
      };
    }
    case 'FAIL_DOWNLOAD':
      return {
        ...state,
        downloads: state.downloads.map((download) =>
          download.id === action.payload.id
            ? { ...download, status: 'failed', error: action.payload.error }
            : download
        ),
        activeDownloads: Math.max(0, state.activeDownloads - 1),
      };
    case 'PAUSE_DOWNLOAD':
      return {
        ...state,
        downloads: state.downloads.map((download) =>
          download.id === action.payload
            ? { ...download, status: 'paused' }
            : download
        ),
      };
    case 'RESUME_DOWNLOAD':
      return {
        ...state,
        downloads: state.downloads.map((download) =>
          download.id === action.payload
            ? { ...download, status: 'downloading' }
            : download
        ),
      };
    case 'CANCEL_DOWNLOAD':
      return {
        ...state,
        downloads: state.downloads.filter((d) => d.id !== action.payload),
        activeDownloads: Math.max(0, state.activeDownloads - 1),
      };
    case 'CLEAR_HISTORY':
      return {
        ...state,
        history: [],
      };
    case 'UPDATE_SETTINGS':
      return {
        ...state,
        settings: { ...state.settings, ...action.payload },
      };
    case 'SET_TOTAL_SPEED':
      return {
        ...state,
        totalSpeed: action.payload,
      };
    default:
      return state;
  }
};

export const DownloadProvider = ({ children }) => {
  const [state, dispatch] = useReducer(downloadReducer, initialState);
  const abortControllers = useRef(new Map());

  // Analyze URL
  const analyzeURL = useCallback(async (url) => {
    try {
      const analysis = await downloadService.analyzeURL(url);
      return {
        success: true,
        data: analysis,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
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
      payload: { ...item, status: 'downloading', startedAt: new Date().toISOString() },
    });

    try {
      await downloadService.download(
        item.url,
        {
          format: item.format,
          quality: item.quality,
          filename: item.filename,
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

      dispatch({
        type: 'COMPLETE_DOWNLOAD',
        payload: {
          id: item.id,
          data: {
            status: 'completed',
            fileSize: item.total,
          },
        },
      });

      abortControllers.current.delete(item.id);
    } catch (error) {
      if (error.name === 'AbortError') {
        dispatch({ type: 'CANCEL_DOWNLOAD', payload: item.id });
      } else {
        dispatch({
          type: 'FAIL_DOWNLOAD',
          payload: { id: item.id, error: error.message },
        });
      }
      abortControllers.current.delete(item.id);
    }
  }, []);

  // Download with options
  const download = useCallback(async (url, options = {}) => {
    const analysis = await analyzeURL(url);
    if (!analysis.success) {
      return { success: false, error: analysis.error };
    }

    const downloadItem = {
      id: uuidv4(),
      url,
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
      addedAt: new Date().toISOString(),
    };

    if (state.activeDownloads < state.maxConcurrent) {
      startDownload(downloadItem);
    } else {
      dispatch({ type: 'ADD_TO_QUEUE', payload: downloadItem });
    }

    return { success: true, id: downloadItem.id };
  }, [analyzeURL, startDownload, state.activeDownloads, state.maxConcurrent, state.settings]);

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
    dispatch({ type: 'PAUSE_DOWNLOAD', payload: id });
  }, []);

  // Resume download
  const resumeDownload = useCallback((id) => {
    const download = state.downloads.find((d) => d.id === id);
    if (download) {
      dispatch({ type: 'RESUME_DOWNLOAD', payload: id });
      startDownload(download);
    }
  }, [state.downloads, startDownload]);

  // Cancel download
  const cancelDownload = useCallback((id) => {
    const controller = abortControllers.current.get(id);
    if (controller) {
      controller.abort();
    }
    dispatch({ type: 'CANCEL_DOWNLOAD', payload: id });
  }, []);

  // Retry download
  const retryDownload = useCallback((id) => {
    const download = state.downloads.find((d) => d.id === id);
    if (download) {
      startDownload({ ...download, status: 'queued', progress: 0, error: null });
    }
  }, [state.downloads, startDownload]);

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