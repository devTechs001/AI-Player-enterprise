import { createContext, useReducer, useCallback, useEffect, useRef, useMemo } from 'react';
import { localMediaScanner } from '@services/mediaScanner.service';
import { downloadService } from '@services/download.service';
import { v4 as uuidv4 } from 'uuid';

export const MediaLibraryContext = createContext(null);

const initialState = {
  files: [],
  directories: [],
  isLoading: false,
  error: null,
  statistics: { total: 0, videos: 0, audios: 0, images: 0, totalSize: 0, totalDuration: 0 },
  filters: { type: 'all', sortBy: 'date', sortOrder: 'desc' },
  searchQuery: '',
  selectedFiles: [],
  currentPage: 1,
  perPage: 24,
  totalPages: 1,
  downloadHistory: [],
};

const mediaLibraryReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_FILES':
      return {
        ...state,
        files: action.payload,
        statistics: localMediaScanner.getStatistics(action.payload),
        currentPage: 1,
      };
    case 'ADD_FILES':
      return {
        ...state,
        files: [...state.files, ...action.payload],
        statistics: localMediaScanner.getStatistics([...state.files, ...action.payload]),
      };
    case 'REMOVE_FILE':
      return {
        ...state,
        files: state.files.filter(f => f.id !== action.payload),
        selectedFiles: state.selectedFiles.filter(id => id !== action.payload),
        statistics: localMediaScanner.getStatistics(state.files.filter(f => f.id !== action.payload)),
      };
    case 'REMOVE_FILES':
      return {
        ...state,
        files: state.files.filter(f => !action.payload.includes(f.id)),
        selectedFiles: state.selectedFiles.filter(id => !action.payload.includes(id)),
        statistics: localMediaScanner.getStatistics(state.files.filter(f => !action.payload.includes(f.id))),
      };
    case 'RENAME_FILE':
      return {
        ...state,
        files: state.files.map(f => f.id === action.payload.id ? { ...f, name: action.payload.name, title: action.payload.name } : f),
      };
    case 'ADD_DIRECTORY':
      return { ...state, directories: [...state.directories, action.payload] };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload }, currentPage: 1 };
    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload, currentPage: 1 };
    case 'SELECT_FILE': {
      const id = action.payload;
      const exists = state.selectedFiles.includes(id);
      return {
        ...state,
        selectedFiles: exists
          ? state.selectedFiles.filter(fid => fid !== id)
          : [...state.selectedFiles, id],
      };
    }
    case 'SELECT_ALL':
      return { ...state, selectedFiles: action.payload };
    case 'CLEAR_SELECTION':
      return { ...state, selectedFiles: [] };
    case 'SET_PAGE':
      return { ...state, currentPage: action.payload };
    case 'SET_DOWNLOAD_HISTORY':
      return { ...state, downloadHistory: action.payload };
    case 'ADD_TO_HISTORY':
      return { ...state, downloadHistory: [action.payload, ...state.downloadHistory] };
    default:
      return state;
  }
};

export const MediaLibraryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mediaLibraryReducer, initialState);

  useEffect(() => { loadDownloadHistory(); }, []);

  const _wrapScan = useCallback(async (scanFn) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });
    try {
      const result = await scanFn();
      if (result.success) {
        dispatch({ type: 'SET_FILES', payload: result.files });
        if (result.directory) {
          dispatch({ type: 'ADD_DIRECTORY', payload: { name: result.directory, fileCount: result.files.length, totalSize: result.totalSize, scannedAt: new Date().toISOString() } });
        }
        if (result.directories) {
          result.directories.forEach(dir => dispatch({ type: 'ADD_DIRECTORY', payload: { name: dir, fileCount: result.files.length, totalSize: result.totalSize, scannedAt: new Date().toISOString() } }));
        }
      } else if (result.error && result.error !== 'cancelled') {
        dispatch({ type: 'SET_ERROR', payload: result.error });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const scanDirectory = useCallback(async () => {
    await _wrapScan(() => localMediaScanner.scanDirectory());
  }, [_wrapScan]);

  const scanGallery = useCallback(async () => {
    await _wrapScan(() => localMediaScanner.scanGallery());
  }, [_wrapScan]);

  const scanMusic = useCallback(async () => {
    await _wrapScan(() => localMediaScanner.scanMusic());
  }, [_wrapScan]);

  const scanPictures = useCallback(async () => {
    await _wrapScan(() => localMediaScanner.scanPictures());
  }, [_wrapScan]);

  const scanDownloads = useCallback(async () => {
    await _wrapScan(() => localMediaScanner.scanDownloads());
  }, [_wrapScan]);

  const scanDeviceMedia = useCallback(async () => {
    await _wrapScan(() => localMediaScanner.scanDeviceMedia());
  }, [_wrapScan]);

  const importFiles = useCallback(async (multiple = false) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const files = multiple ? await localMediaScanner.importFiles() : [await localMediaScanner.importFile()].filter(Boolean);
      if (files.length > 0) dispatch({ type: 'ADD_FILES', payload: files });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const importDroppedFiles = useCallback(async (dataTransfer) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const files = await localMediaScanner.scanDroppedFiles(dataTransfer);
      if (files.length > 0) dispatch({ type: 'ADD_FILES', payload: files });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  const removeFile = useCallback((fileId) => dispatch({ type: 'REMOVE_FILE', payload: fileId }), []);
  const removeFiles = useCallback((fileIds) => dispatch({ type: 'REMOVE_FILES', payload: fileIds }), []);
  const renameFile = useCallback((id, name) => dispatch({ type: 'RENAME_FILE', payload: { id, name } }), []);
  const setFilters = useCallback((filters) => dispatch({ type: 'SET_FILTERS', payload: filters }), []);
  const setSearchQuery = useCallback((query) => dispatch({ type: 'SET_SEARCH', payload: query }), []);
  const toggleFileSelection = useCallback((fileId) => dispatch({ type: 'SELECT_FILE', payload: fileId }), []);
  const selectAll = useCallback((ids) => dispatch({ type: 'SELECT_ALL', payload: ids }), []);
  const clearSelection = useCallback(() => dispatch({ type: 'CLEAR_SELECTION' }), []);
  const setPage = useCallback((page) => dispatch({ type: 'SET_PAGE', payload: page }), []);

  const loadDownloadHistory = useCallback(async () => {
    try {
      const history = await downloadService.getDownloadHistory();
      dispatch({ type: 'SET_DOWNLOAD_HISTORY', payload: history });
    } catch { /* */ }
  }, []);

  const addToDownloadHistory = useCallback((download) => {
    downloadService.addToDownloadHistory(download);
    dispatch({ type: 'ADD_TO_HISTORY', payload: download });
  }, []);

  const getFilteredFiles = useCallback(() => {
    let filtered = [...state.files];
    if (state.filters.type !== 'all') filtered = filtered.filter(f => f.type === state.filters.type);
    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      filtered = filtered.filter(f => f.name.toLowerCase().includes(q) || f.title.toLowerCase().includes(q));
    }
    filtered.sort((a, b) => {
      let c = 0;
      switch (state.filters.sortBy) {
        case 'name': c = a.name.localeCompare(b.name); break;
        case 'size': c = a.size - b.size; break;
        case 'duration': c = (a.duration || 0) - (b.duration || 0); break;
        case 'date': default: c = a.lastModified - b.lastModified; break;
      }
      return state.filters.sortOrder === 'desc' ? -c : c;
    });
    return filtered;
  }, [state.files, state.filters, state.searchQuery]);

  const filteredFiles = useMemo(() => getFilteredFiles(), [getFilteredFiles]);
  const totalPages = useMemo(() => Math.max(1, Math.ceil(filteredFiles.length / state.perPage)), [filteredFiles.length, state.perPage]);
  const paginatedFiles = useMemo(() => {
    const start = (state.currentPage - 1) * state.perPage;
    return filteredFiles.slice(start, start + state.perPage);
  }, [filteredFiles, state.currentPage, state.perPage]);

  const getFileById = useCallback((fileId) => state.files.find(f => f.id === fileId), [state.files]);

  const playFile = useCallback((file) => {
    if (!file || !file.handle) return null;
    const url = URL.createObjectURL(file.file || file.handle);
    return { url, media: { url, title: file.title, thumbnail: file.thumbnail, duration: file.duration, type: file.type } };
  }, []);

  const value = {
    ...state,
    allFiles: state.files,
    files: paginatedFiles,
    filteredFiles,
    totalPages,
    scanDirectory,
    scanGallery,
    scanMusic,
    scanPictures,
    scanDownloads,
    scanDeviceMedia,
    importFiles,
    importDroppedFiles,
    removeFile,
    removeFiles,
    renameFile,
    setFilters,
    setSearchQuery,
    toggleFileSelection,
    selectAll,
    clearSelection,
    loadDownloadHistory,
    addToDownloadHistory,
    getFileById,
    playFile,
    setPage,
  };

  return <MediaLibraryContext.Provider value={value}>{children}</MediaLibraryContext.Provider>;
};

export default MediaLibraryContext;
