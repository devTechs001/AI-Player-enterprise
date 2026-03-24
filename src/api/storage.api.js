import api from '@services/api.service';

// Storage API endpoints
export const storageAPI = {
  // File management
  uploadFile: (formData, options = {}) => api.post('/storage/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    ...options
  }),
  getFileInfo: (fileId) => api.get(`/storage/files/${fileId}`),
  updateFile: (fileId, data) => api.put(`/storage/files/${fileId}`, data),
  deleteFile: (fileId) => api.delete(`/storage/files/${fileId}`),
  
  // Folder management
  createFolder: (folderData) => api.post('/storage/folders', folderData),
  getFolderContents: (folderId, params = {}) => api.get(`/storage/folders/${folderId}`, { params }),
  updateFolder: (folderId, data) => api.put(`/storage/folders/${folderId}`, data),
  deleteFolder: (folderId) => api.delete(`/storage/folders/${folderId}`),
  moveFolder: (folderId, newParentId) => api.put(`/storage/folders/${folderId}/move`, { newParentId }),
  
  // File operations
  moveFile: (fileId, newFolderId) => api.put(`/storage/files/${fileId}/move`, { newFolderId }),
  copyFile: (fileId, targetFolderId) => api.post(`/storage/files/${fileId}/copy`, { targetFolderId }),
  renameFile: (fileId, newName) => api.put(`/storage/files/${fileId}/rename`, { name: newName }),
  
  // Search and filtering
  searchFiles: (query, filters = {}) => api.get('/storage/search', { params: { q: query, ...filters } }),
  getFilesByType: (fileType, params = {}) => api.get(`/storage/files/type/${fileType}`, { params }),
  getRecentFiles: (params = {}) => api.get('/storage/files/recent', { params }),
  
  // Storage statistics
  getStorageStats: () => api.get('/storage/stats'),
  getUsageByType: () => api.get('/storage/usage/by-type'),
  getUsageByUser: (userId) => api.get(`/storage/usage/user/${userId}`),
  
  // Quota management
  getQuotaInfo: (userId) => api.get(`/storage/quota/${userId}`),
  updateQuota: (userId, quotaData) => api.put(`/storage/quota/${userId}`, quotaData),
  getQuotaUsage: (userId) => api.get(`/storage/quota/${userId}/usage`),
  
  // File sharing
  shareFile: (fileId, shareData) => api.post(`/storage/files/${fileId}/share`, shareData),
  getSharedFiles: () => api.get('/storage/shared'),
  unshareFile: (fileId, shareId) => api.delete(`/storage/files/${fileId}/share/${shareId}`),
  getShareLink: (shareId) => api.get(`/storage/shares/${shareId}`),
  
  // File versions
  getFileVersions: (fileId) => api.get(`/storage/files/${fileId}/versions`),
  createFileVersion: (fileId, formData) => api.post(`/storage/files/${fileId}/versions`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  restoreFileVersion: (fileId, versionId) => api.post(`/storage/files/${fileId}/versions/${versionId}/restore`),
  deleteFileVersion: (fileId, versionId) => api.delete(`/storage/files/${fileId}/versions/${versionId}`),
  
  // File metadata
  getFileMetadata: (fileId) => api.get(`/storage/files/${fileId}/metadata`),
  updateFileMetadata: (fileId, metadata) => api.put(`/storage/files/${fileId}/metadata`, metadata),
  
  // File thumbnails
  generateThumbnail: (fileId, options = {}) => api.post(`/storage/files/${fileId}/thumbnail`, options),
  getThumbnail: (fileId, size = 'medium') => api.get(`/storage/files/${fileId}/thumbnail/${size}`),
  
  // File preview
  getPreviewUrl: (fileId) => api.get(`/storage/files/${fileId}/preview`),
  getDownloadUrl: (fileId) => api.get(`/storage/files/${fileId}/download`),
  
  // Bulk operations
  bulkUpload: (formData, options = {}) => api.post('/storage/bulk/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    ...options
  }),
  bulkDelete: (fileIds) => api.post('/storage/bulk/delete', { fileIds }),
  bulkMove: (operations) => api.post('/storage/bulk/move', operations),
  bulkCopy: (operations) => api.post('/storage/bulk/copy', operations),
  
  // File compression
  compressFiles: (fileIds, options = {}) => api.post('/storage/compress', { fileIds, ...options }),
  extractArchive: (fileId, targetFolderId) => api.post(`/storage/files/${fileId}/extract`, { targetFolderId }),
  
  // File synchronization
  syncFolder: (folderId, options = {}) => api.post(`/storage/folders/${folderId}/sync`, options),
  getSyncStatus: (folderId) => api.get(`/storage/folders/${folderId}/sync/status`),
  cancelSync: (folderId) => api.post(`/storage/folders/${folderId}/sync/cancel`),
  
  // File backup
  createBackup: (backupData) => api.post('/storage/backup', backupData),
  getBackups: (params = {}) => api.get('/storage/backup', { params }),
  restoreBackup: (backupId) => api.post(`/storage/backup/${backupId}/restore`),
  deleteBackup: (backupId) => api.delete(`/storage/backup/${backupId}`),
  
  // File permissions
  getFilePermissions: (fileId) => api.get(`/storage/files/${fileId}/permissions`),
  updateFilePermissions: (fileId, permissions) => api.put(`/storage/files/${fileId}/permissions`, permissions),
  
  // File tags
  getFileTags: (fileId) => api.get(`/storage/files/${fileId}/tags`),
  addFileTag: (fileId, tag) => api.post(`/storage/files/${fileId}/tags`, { tag }),
  removeFileTag: (fileId, tagId) => api.delete(`/storage/files/${fileId}/tags/${tagId}`),
  getTags: () => api.get('/storage/tags'),
  
  // File favorites
  addToFavorites: (fileId) => api.post(`/storage/files/${fileId}/favorite`),
  removeFromFavorites: (fileId) => api.delete(`/storage/files/${fileId}/favorite`),
  getFavoriteFiles: () => api.get('/storage/favorites'),
  
  // File locks
  lockFile: (fileId, lockData) => api.post(`/storage/files/${fileId}/lock`, lockData),
  unlockFile: (fileId) => api.delete(`/storage/files/${fileId}/lock`),
  getFileLocks: (fileId) => api.get(`/storage/files/${fileId}/locks`),
  
  // File comments
  getFileComments: (fileId) => api.get(`/storage/files/${fileId}/comments`),
  addFileComment: (fileId, comment) => api.post(`/storage/files/${fileId}/comments`, comment),
  updateFileComment: (fileId, commentId, comment) => api.put(`/storage/files/${fileId}/comments/${commentId}`, comment),
  deleteFileComment: (fileId, commentId) => api.delete(`/storage/files/${fileId}/comments/${commentId}`),
  
  // Storage optimization
  optimizeStorage: () => api.post('/storage/optimize'),
  cleanupTempFiles: () => api.post('/storage/cleanup/temp'),
  cleanupDuplicates: () => api.post('/storage/cleanup/duplicates'),
  
  // Storage health
  getStorageHealth: () => api.get('/storage/health'),
  getDiskUsage: () => api.get('/storage/disk/usage'),
  getPerformanceMetrics: () => api.get('/storage/performance'),
  
  // Storage settings
  getStorageSettings: () => api.get('/storage/settings'),
  updateStorageSettings: (settings) => api.put('/storage/settings', settings),
  
  // External storage
  connectExternalStorage: (storageData) => api.post('/storage/external/connect', storageData),
  getExternalStorages: () => api.get('/storage/external'),
  disconnectExternalStorage: (storageId) => api.delete(`/storage/external/${storageId}`),
  syncExternalStorage: (storageId) => api.post(`/storage/external/${storageId}/sync`),
};

export default storageAPI;
