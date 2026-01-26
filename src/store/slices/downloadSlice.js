import { createSlice } from ' @reduxjs/toolkit';

const downloadSlice = createSlice({
  name: 'download',
  initialState: {
    downloads: [],
    queue: [],
    history: [],
    activeDownloads: 0,
    maxConcurrent: 3,
    settings: {
      defaultFormat: 'mp4',
      defaultQuality: '1080p',
      downloadPath: '',
      autoConvert: false,
      notifications: true,
    },
    isProcessing: false,
  },
  reducers: {
    addToQueue: (state, action) => {
      state.queue.push(action.payload);
    },
    removeFromQueue: (state, action) => {
      state.queue = state.queue.filter(item => item.id !== action.payload);
    },
    startDownload: (state, action) => {
      const download = action.payload;
      state.downloads.push(download);
      state.activeDownloads += 1;
      state.isProcessing = true;
      
      // Remove from queue
      state.queue = state.queue.filter(item => item.id !== download.id);
    },
    updateDownloadProgress: (state, action) => {
      const { id, progress, speed, eta, downloaded, total } = action.payload;
      const download = state.downloads.find(d => d.id === id);
      if (download) {
        download.progress = progress;
        download.speed = speed;
        download.eta = eta;
        download.downloaded = downloaded;
        download.total = total;
      }
    },
    completeDownload: (state, action) => {
      const { id, filePath } = action.payload;
      const download = state.downloads.find(d => d.id === id);
      if (download) {
        download.status = 'completed';
        download.filePath = filePath;
        
        // Move to history
        state.history.unshift(download);
        state.downloads = state.downloads.filter(d => d.id !== id);
        state.activeDownloads -= 1;
        
        if (state.activeDownloads === 0) {
          state.isProcessing = false;
        }
      }
    },
    failDownload: (state, action) => {
      const { id, error } = action.payload;
      const download = state.downloads.find(d => d.id === id);
      if (download) {
        download.status = 'failed';
        download.error = error;
        state.downloads = state.downloads.filter(d => d.id !== id);
        state.activeDownloads -= 1;
        
        if (state.activeDownloads === 0) {
          state.isProcessing = false;
        }
      }
    },
    pauseDownload: (state, action) => {
      const download = state.downloads.find(d => d.id === action.payload);
      if (download) {
        download.status = 'paused';
      }
    },
    resumeDownload: (state, action) => {
      const download = state.downloads.find(d => d.id === action.payload);
      if (download) {
        download.status = 'downloading';
      }
    },
    cancelDownload: (state, action) => {
      state.downloads = state.downloads.filter(d => d.id !== action.payload);
      state.activeDownloads -= 1;
      
      if (state.activeDownloads === 0) {
        state.isProcessing = false;
      }
    },
    clearHistory: (state) => {
      state.history = [];
    },
    updateSettings: (state, action) => {
      state.settings = { ...state.settings, ...action.payload };
    },
    setMaxConcurrent: (state, action) => {
      state.maxConcurrent = action.payload;
    },
  },
});

export const { 
  addToQueue,
  removeFromQueue,
  startDownload,
  updateDownloadProgress,
  completeDownload,
  failDownload,
  pauseDownload,
  resumeDownload,
  cancelDownload,
  clearHistory,
  updateSettings,
  setMaxConcurrent
} = downloadSlice.actions;

export default downloadSlice.reducer;