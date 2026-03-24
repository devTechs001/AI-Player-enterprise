import api from '@services/api.service';

// Media API endpoints
export const mediaAPI = {
  // Media upload
  uploadMedia: (formData, options = {}) => api.post('/media/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    ...options
  }),
  
  // Media management
  getMedia: (params = {}) => api.get('/media', { params }),
  getMediaItem: (mediaId) => api.get(`/media/${mediaId}`),
  updateMedia: (mediaId, data) => api.put(`/media/${mediaId}`, data),
  deleteMedia: (mediaId) => api.delete(`/media/${mediaId}`),
  
  // Media processing
  processMedia: (mediaId, options = {}) => api.post(`/media/${mediaId}/process`, options),
  getProcessingStatus: (mediaId) => api.get(`/media/${mediaId}/processing-status`),
  cancelProcessing: (mediaId) => api.delete(`/media/${mediaId}/processing`),
  
  // Media conversion
  convertMedia: (mediaId, conversionOptions) => api.post(`/media/${mediaId}/convert`, conversionOptions),
  getConversionStatus: (conversionId) => api.get(`/media/conversions/${conversionId}/status`),
  getAvailableFormats: (mediaId) => api.get(`/media/${mediaId}/formats`),
  
  // Media streaming
  getStreamUrl: (mediaId, options = {}) => api.get(`/media/${mediaId}/stream`, { params: options }),
  getHLSStream: (mediaId) => api.get(`/media/${mediaId}/stream/hls`),
  getDASHStream: (mediaId) => api.get(`/media/${mediaId}/stream/dash`),
  getThumbnail: (mediaId, timestamp) => api.get(`/media/${mediaId}/thumbnail`, { params: { timestamp } }),
  
  // Media metadata
  getMediaMetadata: (mediaId) => api.get(`/media/${mediaId}/metadata`),
  updateMediaMetadata: (mediaId, metadata) => api.put(`/media/${mediaId}/metadata`, metadata),
  extractMetadata: (mediaId) => api.post(`/media/${mediaId}/metadata/extract`),
  
  // Media search
  searchMedia: (query, filters = {}) => api.get('/media/search', { params: { q: query, ...filters } }),
  getSimilarMedia: (mediaId, options = {}) => api.get(`/media/${mediaId}/similar`, { params: options }),
  
  // Media categories
  getMediaCategories: () => api.get('/media/categories'),
  getCategoryMedia: (categoryId, params = {}) => api.get(`/media/categories/${categoryId}`, { params }),
  createCategory: (categoryData) => api.post('/media/categories', categoryData),
  updateCategory: (categoryId, data) => api.put(`/media/categories/${categoryId}`, data),
  deleteCategory: (categoryId) => api.delete(`/media/categories/${categoryId}`),
  
  // Media tags
  getMediaTags: (mediaId) => api.get(`/media/${mediaId}/tags`),
  addMediaTag: (mediaId, tag) => api.post(`/media/${mediaId}/tags`, { tag }),
  removeMediaTag: (mediaId, tagId) => api.delete(`/media/${mediaId}/tags/${tagId}`),
  getAllTags: () => api.get('/media/tags'),
  
  // Media collections
  getCollections: (params = {}) => api.get('/media/collections', { params }),
  getCollection: (collectionId) => api.get(`/media/collections/${collectionId}`),
  createCollection: (collectionData) => api.post('/media/collections', collectionData),
  updateCollection: (collectionId, data) => api.put(`/media/collections/${collectionId}`, data),
  deleteCollection: (collectionId) => api.delete(`/media/collections/${collectionId}`),
  addToCollection: (collectionId, mediaId) => api.post(`/media/collections/${collectionId}/items`, { mediaId }),
  removeFromCollection: (collectionId, mediaId) => api.delete(`/media/collections/${collectionId}/${mediaId}`),
  
  // Media favorites
  getFavoriteMedia: () => api.get('/media/favorites'),
  addToFavorites: (mediaId) => api.post(`/media/${mediaId}/favorite`),
  removeFromFavorites: (mediaId) => api.delete(`/media/${mediaId}/favorite`),
  
  // Media history
  getMediaHistory: (params = {}) => api.get('/media/history', { params }),
  addToHistory: (mediaId, progress) => api.post(`/media/${mediaId}/history`, { progress }),
  clearHistory: () => api.delete('/media/history'),
  
  // Media sharing
  shareMedia: (mediaId, shareData) => api.post(`/media/${mediaId}/share`, shareData),
  getSharedMedia: () => api.get('/media/shared'),
  unshareMedia: (mediaId, shareId) => api.delete(`/media/${mediaId}/share/${shareId}`),
  
  // Media comments
  getMediaComments: (mediaId, params = {}) => api.get(`/media/${mediaId}/comments`, { params }),
  addMediaComment: (mediaId, comment) => api.post(`/media/${mediaId}/comments`, comment),
  updateMediaComment: (mediaId, commentId, comment) => api.put(`/media/${mediaId}/comments/${commentId}`, comment),
  deleteMediaComment: (mediaId, commentId) => api.delete(`/media/${mediaId}/comments/${commentId}`),
  
  // Media ratings
  rateMedia: (mediaId, rating) => api.post(`/media/${mediaId}/rating`, { rating }),
  getMediaRating: (mediaId) => api.get(`/media/${mediaId}/rating`),
  getUserRating: (mediaId) => api.get(`/media/${mediaId}/rating/user`),
  
  // Media analytics
  getMediaAnalytics: (mediaId, period) => api.get(`/media/${mediaId}/analytics/${period}`),
  getMediaViews: (mediaId, period) => api.get(`/media/${mediaId}/views/${period}`),
  getMediaEngagement: (mediaId, period) => api.get(`/media/${mediaId}/engagement/${period}`),
  
  // Media quality
  getQualityInfo: (mediaId) => api.get(`/media/${mediaId}/quality`),
  enhanceQuality: (mediaId, options) => api.post(`/media/${mediaId}/quality/enhance`, options),
  
  // Media subtitles
  getMediaSubtitles: (mediaId) => api.get(`/media/${mediaId}/subtitles`),
  uploadSubtitle: (mediaId, formData) => api.post(`/media/${mediaId}/subtitles`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteSubtitle: (mediaId, subtitleId) => api.delete(`/media/${mediaId}/subtitles/${subtitleId}`),
  
  // Media chapters
  getMediaChapters: (mediaId) => api.get(`/media/${mediaId}/chapters`),
  createChapter: (mediaId, chapterData) => api.post(`/media/${mediaId}/chapters`, chapterData),
  updateChapter: (mediaId, chapterId, data) => api.put(`/media/${mediaId}/chapters/${chapterId}`, data),
  deleteChapter: (mediaId, chapterId) => api.delete(`/media/${mediaId}/chapters/${chapterId}`),
  
  // Media thumbnails
  generateThumbnails: (mediaId, options) => api.post(`/media/${mediaId}/thumbnails/generate`, options),
  getMediaThumbnails: (mediaId) => api.get(`/media/${mediaId}/thumbnails`),
  uploadThumbnail: (mediaId, formData) => api.post(`/media/${mediaId}/thumbnails`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteThumbnail: (mediaId, thumbnailId) => api.delete(`/media/${mediaId}/thumbnails/${thumbnailId}`),
  
  // Media transcoding
  transcodeMedia: (mediaId, transcodeOptions) => api.post(`/media/${mediaId}/transcode`, transcodeOptions),
  getTranscodePresets: () => api.get('/media/transcode/presets'),
  createTranscodePreset: (presetData) => api.post('/media/transcode/presets', presetData),
  updateTranscodePreset: (presetId, data) => api.put(`/media/transcode/presets/${presetId}`, data),
  deleteTranscodePreset: (presetId) => api.delete(`/media/transcode/presets/${presetId}`),
  
  // Media watermarking
  addWatermark: (mediaId, watermarkData) => api.post(`/media/${mediaId}/watermark`, watermarkData),
  removeWatermark: (mediaId) => api.delete(`/media/${mediaId}/watermark`),
  getWatermarkPresets: () => api.get('/media/watermark/presets'),
  
  // Media compression
  compressMedia: (mediaId, compressionOptions) => api.post(`/media/${mediaId}/compress`, compressionOptions),
  getCompressionStats: (mediaId) => api.get(`/media/${mediaId}/compression/stats`),
  
  // Media backup
  backupMedia: (mediaId, backupOptions) => api.post(`/media/${mediaId}/backup`, backupOptions),
  getMediaBackups: (mediaId) => api.get(`/media/${mediaId}/backups`),
  restoreFromBackup: (mediaId, backupId) => api.post(`/media/${mediaId}/backup/${backupId}/restore`),
  
  // Media permissions
  getMediaPermissions: (mediaId) => api.get(`/media/${mediaId}/permissions`),
  updateMediaPermissions: (mediaId, permissions) => api.put(`/media/${mediaId}/permissions`, permissions),
  
  // Media versions
  getMediaVersions: (mediaId) => api.get(`/media/${mediaId}/versions`),
  createMediaVersion: (mediaId, versionData) => api.post(`/media/${mediaId}/versions`, versionData),
  restoreMediaVersion: (mediaId, versionId) => api.post(`/media/${mediaId}/versions/${versionId}/restore`),
  
  // Media export
  exportMedia: (mediaId, exportOptions) => api.post(`/media/${mediaId}/export`, exportOptions),
  getExportStatus: (exportId) => api.get(`/media/export/${exportId}/status`),
  downloadExport: (exportId) => api.get(`/media/export/${exportId}/download`),
  
  // Media stats
  getMediaStats: (period) => api.get(`/media/stats/${period}`),
  getStorageStats: () => api.get('/media/stats/storage'),
  getBandwidthStats: (period) => api.get(`/media/stats/bandwidth/${period}`),
  
  // Media recommendations
  getRecommendations: (mediaId, options = {}) => api.get(`/media/${mediaId}/recommendations`, { params: options }),
  getTrendingMedia: (params = {}) => api.get('/media/trending', { params }),
  
  // Media filters
  getFilterOptions: () => api.get('/media/filters'),
  applyFilters: (filters) => api.post('/media/filters/apply', filters),
  
  // Media bulk operations
  bulkUpload: (formData, options = {}) => api.post('/media/bulk/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    ...options
  }),
  bulkDelete: (mediaIds) => api.post('/media/bulk/delete', { mediaIds }),
  bulkProcess: (mediaIds, options) => api.post('/media/bulk/process', { mediaIds, ...options }),
  
  // Media CDN
  getCDNInfo: (mediaId) => api.get(`/media/${mediaId}/cdn`),
  purgeCDN: (mediaId) => api.delete(`/media/${mediaId}/cdn/purge`),
  getCDNStats: (period) => api.get(`/media/cdn/stats/${period}`),
};

export default mediaAPI;
