import api from '@services/api.service';

// Download API endpoints
export const downloadAPI = {
  // Download video
  downloadVideo: (url, options) => api.post('/download/video', { url, ...options }),
  
  // Get download formats
  getFormats: (url) => api.get('/download/formats', { params: { url } }),
  
  // Get download progress
  getDownloadProgress: (downloadId) => api.get(`/download/${downloadId}/progress`),
  
  // Cancel download
  cancelDownload: (downloadId) => api.delete(`/download/${downloadId}`),
  
  // Pause/Resume download
  pauseDownload: (downloadId) => api.post(`/download/${downloadId}/pause`),
  resumeDownload: (downloadId) => api.post(`/download/${downloadId}/resume`),
  
  // Download history
  getDownloadHistory: (params = {}) => api.get('/download/history', { params }),
  
  // Batch downloads
  createBatchDownload: (items) => api.post('/download/batch', { items }),
  getBatchDownloadStatus: (batchId) => api.get(`/download/batch/${batchId}`),
  
  // Download queue
  getDownloadQueue: () => api.get('/download/queue'),
  addToQueue: (item) => api.post('/download/queue', item),
  removeFromQueue: (queueId) => api.delete(`/download/queue/${queueId}`),
  
  // Scheduled downloads
  scheduleDownload: (item, scheduleTime) => api.post('/download/schedule', { item, scheduleTime }),
  getScheduledDownloads: () => api.get('/download/scheduled'),
  cancelScheduledDownload: (scheduleId) => api.delete(`/download/schedule/${scheduleId}`),
  
  // Download settings
  getDownloadSettings: () => api.get('/download/settings'),
  updateDownloadSettings: (settings) => api.put('/download/settings', settings),
  
  // Download statistics
  getDownloadStats: () => api.get('/download/stats'),
  getDownloadStatsByPeriod: (period) => api.get(`/download/stats/${period}`),
  
  // URL parsing
  parseURL: (url) => api.get('/download/parse', { params: { url } }),
  
  // Quality selection
  getAvailableQualities: (url) => api.get('/download/qualities', { params: { url } }),
  
  // Subtitle download
  downloadSubtitles: (url, language) => api.post('/download/subtitles', { url, language }),
  
  // Audio extraction
  extractAudio: (url, format = 'mp3') => api.post('/download/extract-audio', { url, format }),
  
  // Video conversion
  convertVideo: (downloadId, format, options) => api.post(`/download/${downloadId}/convert`, { format, ...options }),
  getConversionProgress: (conversionId) => api.get(`/download/convert/${conversionId}/progress`),
  
  // Download folders
  getDownloadFolders: () => api.get('/download/folders'),
  createDownloadFolder: (name, path) => api.post('/download/folders', { name, path }),
  updateDownloadFolder: (folderId, data) => api.put(`/download/folders/${folderId}`, data),
  deleteDownloadFolder: (folderId) => api.delete(`/download/folders/${folderId}`),
  
  // Download limits
  getDownloadLimits: () => api.get('/download/limits'),
  updateDownloadLimits: (limits) => api.put('/download/limits', limits),
  
  // Download cleanup
  cleanupDownloads: (options) => api.post('/download/cleanup', options),
  
  // Download sharing
  shareDownload: (downloadId, options) => api.post(`/download/${downloadId}/share`, options),
  getSharedDownloads: () => api.get('/download/shared'),
  
  // Download templates
  getDownloadTemplates: () => api.get('/download/templates'),
  createDownloadTemplate: (template) => api.post('/download/templates', template),
  updateDownloadTemplate: (templateId, template) => api.put(`/download/templates/${templateId}`, template),
  deleteDownloadTemplate: (templateId) => api.delete(`/download/templates/${templateId}`),
  
  // Download monitoring
  getActiveDownloads: () => api.get('/download/active'),
  getFailedDownloads: () => api.get('/download/failed'),
  retryFailedDownload: (downloadId) => api.post(`/download/${downloadId}/retry`),
  
  // Download notifications
  getDownloadNotifications: () => api.get('/download/notifications'),
  markNotificationRead: (notificationId) => api.put(`/download/notifications/${notificationId}/read`),
  updateNotificationSettings: (settings) => api.put('/download/notifications/settings', settings),
};

export default downloadAPI;
