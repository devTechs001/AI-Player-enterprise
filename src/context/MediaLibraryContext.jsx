import { createContext, useReducer, useCallback, useEffect } from 'react';
import { localMediaScanner } from '@services/mediaScanner.service';
import { downloadService } from '@services/download.service';

export const MediaLibraryContext = createContext(null);

const initialState = {
  files: [],
  directories: [],
  isLoading: false,
  error: null,
  statistics: {
    total: 0,
    videos: 0,
    audios: 0,
    images: 0,
    totalSize: 0,
    totalDuration: 0,
  },
  filters: {
    type: 'all', // all, video, audio, image
    sortBy: 'date', // date, name, size, duration
    sortOrder: 'desc', // asc, desc
  },
  searchQuery: '',
  selectedFiles: [],
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
        statistics: localMediaScanner.getStatistics(state.files.filter(f => f.id !== action.payload)),
      };
    
    case 'ADD_DIRECTORY':
      return { ...state, directories: [...state.directories, action.payload] };
    
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    
    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload };
    
    case 'SELECT_FILE':
      return {
        ...state,
        selectedFiles: action.payload.includes(action.payload)
          ? state.selectedFiles.filter(id => id !== action.payload)
          : [...state.selectedFiles, action.payload],
      };
    
    case 'CLEAR_SELECTION':
      return { ...state, selectedFiles: [] };
    
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

  // Load download history on mount
  useEffect(() => {
    loadDownloadHistory();
  }, []);

  // Scan local directory
  const scanDirectory = useCallback(async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const result = await localMediaScanner.scanDirectory();
      
      if (result.success) {
        dispatch({ type: 'SET_FILES', payload: result.files });
        dispatch({ type: 'ADD_DIRECTORY', payload: {
          name: result.directory,
          fileCount: result.files.length,
          totalSize: result.totalSize,
          scannedAt: new Date().toISOString(),
        }});
      } else {
        dispatch({ type: 'SET_ERROR', payload: result.error });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  // Import files
  const importFiles = useCallback(async (multiple = false) => {
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      const files = multiple
        ? await localMediaScanner.importFiles()
        : [await localMediaScanner.importFile()].filter(Boolean);
      
      if (files.length > 0) {
        dispatch({ type: 'ADD_FILES', payload: files });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, []);

  // Remove file
  const removeFile = useCallback((fileId) => {
    dispatch({ type: 'REMOVE_FILE', payload: fileId });
  }, []);

  // Set filters
  const setFilters = useCallback((filters) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  }, []);

  // Set search query
  const setSearchQuery = useCallback((query) => {
    dispatch({ type: 'SET_SEARCH', payload: query });
  }, []);

  // Toggle file selection
  const toggleFileSelection = useCallback((fileId) => {
    dispatch({ type: 'SELECT_FILE', payload: fileId });
  }, []);

  // Clear selection
  const clearSelection = useCallback(() => {
    dispatch({ type: 'CLEAR_SELECTION' });
  }, []);

  // Load download history
  const loadDownloadHistory = useCallback(async () => {
    try {
      const history = await downloadService.getDownloadHistory();
      dispatch({ type: 'SET_DOWNLOAD_HISTORY', payload: history });
    } catch (error) {
      console.error('Failed to load download history:', error);
    }
  }, []);

  // Add to download history
  const addToDownloadHistory = useCallback((download) => {
    downloadService.addToDownloadHistory(download);
    dispatch({ type: 'ADD_TO_HISTORY', payload: download });
  }, []);

  // Get filtered and sorted files
  const getFilteredFiles = useCallback(() => {
    let filtered = [...state.files];

    // Apply type filter
    if (state.filters.type !== 'all') {
      filtered = filtered.filter(f => f.type === state.filters.type);
    }

    // Apply search filter
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(f =>
        f.name.toLowerCase().includes(query) ||
        f.title.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (state.filters.sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'size':
          comparison = a.size - b.size;
          break;
        case 'duration':
          comparison = (a.duration || 0) - (b.duration || 0);
          break;
        case 'date':
        default:
          comparison = a.lastModified - b.lastModified;
          break;
      }
      
      return state.filters.sortOrder === 'desc' ? -comparison : comparison;
    });

    return filtered;
  }, [state.files, state.filters, state.searchQuery]);

  // Get file by ID
  const getFileById = useCallback((fileId) => {
    return state.files.find(f => f.id === fileId);
  }, [state.files]);

  // Play file
  const playFile = useCallback((file) => {
    if (!file || !file.handle) return null;
    
    const url = URL.createObjectURL(file.file || file.handle);
    return {
      url,
      media: {
        url,
        title: file.title,
        thumbnail: file.thumbnail,
        duration: file.duration,
        type: file.type,
      },
    };
  }, []);

  const value = {
    ...state,
    files: getFilteredFiles(),
    scanDirectory,
    importFiles,
    removeFile,
    setFilters,
    setSearchQuery,
    toggleFileSelection,
    clearSelection,
    loadDownloadHistory,
    addToDownloadHistory,
    getFileById,
    playFile,
  };

  return (
    <MediaLibraryContext.Provider value={value}>
      {children}
    </MediaLibraryContext.Provider>
  );
};

export default MediaLibraryContext;
