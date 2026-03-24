import api from '@services/api.service';

// Admin API endpoints
export const adminAPI = {
  // User management
  getUsers: (params = {}) => api.get('/admin/users', { params }),
  getUser: (userId) => api.get(`/admin/users/${userId}`),
  updateUser: (userId, data) => api.put(`/admin/users/${userId}`, data),
  deleteUser: (userId) => api.delete(`/admin/users/${userId}`),
  suspendUser: (userId, reason, duration) => api.post(`/admin/users/${userId}/suspend`, { reason, duration }),
  unsuspendUser: (userId) => api.post(`/admin/users/${userId}/unsuspend`),
  banUser: (userId, reason) => api.post(`/admin/users/${userId}/ban`, { reason }),
  unbanUser: (userId) => api.post(`/admin/users/${userId}/unban`),
  
  // User roles and permissions
  getUserRoles: (userId) => api.get(`/admin/users/${userId}/roles`),
  assignRole: (userId, roleId) => api.post(`/admin/users/${userId}/roles`, { roleId }),
  removeRole: (userId, roleId) => api.delete(`/admin/users/${userId}/roles/${roleId}`),
  getRoles: () => api.get('/admin/roles'),
  createRole: (roleData) => api.post('/admin/roles', roleData),
  updateRole: (roleId, roleData) => api.put(`/admin/roles/${roleId}`, roleData),
  deleteRole: (roleId) => api.delete(`/admin/roles/${roleId}`),
  
  // Content moderation
  getPendingContent: (params = {}) => api.get('/admin/content/pending', { params }),
  approveContent: (contentId) => api.post(`/admin/content/${contentId}/approve`),
  rejectContent: (contentId, reason) => api.post(`/admin/content/${contentId}/reject`, { reason }),
  getFlaggedContent: (params = {}) => api.get('/admin/content/flagged', { params }),
  reviewFlag: (flagId, action, reason) => api.put(`/admin/content/flags/${flagId}`, { action, reason }),
  
  // System settings
  getSystemSettings: () => api.get('/admin/settings'),
  updateSystemSettings: (settings) => api.put('/admin/settings', settings),
  getSystemConfig: () => api.get('/admin/config'),
  updateSystemConfig: (config) => api.put('/admin/config', config),
  
  // Analytics and reports
  getSystemAnalytics: (period) => api.get(`/admin/analytics/${period}`),
  getUserAnalytics: (period) => api.get(`/admin/analytics/users/${period}`),
  getContentAnalytics: (period) => api.get(`/admin/analytics/content/${period}`),
  getRevenueAnalytics: (period) => api.get(`/admin/analytics/revenue/${period}`),
  generateReport: (type, params) => api.post('/admin/reports/generate', { type, ...params }),
  getReports: (params = {}) => api.get('/admin/reports', { params }),
  downloadReport: (reportId) => api.get(`/admin/reports/${reportId}/download`),
  
  // Audit logs
  getAuditLogs: (params = {}) => api.get('/admin/audit-logs', { params }),
  getAuditLog: (logId) => api.get(`/admin/audit-logs/${logId}`),
  exportAuditLogs: (params = {}) => api.get('/admin/audit-logs/export', { params }),
  
  // System health
  getSystemHealth: () => api.get('/admin/health'),
  getSystemMetrics: () => api.get('/admin/metrics'),
  getDatabaseStats: () => api.get('/admin/database/stats'),
  getCacheStats: () => api.get('/admin/cache/stats'),
  
  // Content management
  getAllVideos: (params = {}) => api.get('/admin/videos', { params }),
  getAdminVideo: (videoId) => api.get(`/admin/videos/${videoId}`),
  updateAdminVideo: (videoId, data) => api.put(`/admin/videos/${videoId}`, data),
  deleteAdminVideo: (videoId) => api.delete(`/admin/videos/${videoId}`),
  
  // Categories and tags
  getCategories: () => api.get('/admin/categories'),
  createCategory: (categoryData) => api.post('/admin/categories', categoryData),
  updateCategory: (categoryId, data) => api.put(`/admin/categories/${categoryId}`, data),
  deleteCategory: (categoryId) => api.delete(`/admin/categories/${categoryId}`),
  getTags: () => api.get('/admin/tags'),
  createTag: (tagData) => api.post('/admin/tags', tagData),
  updateTag: (tagId, data) => api.put(`/admin/tags/${tagId}`, data),
  deleteTag: (tagId) => api.delete(`/admin/tags/${tagId}`),
  
  // Announcements
  getAnnouncements: (params = {}) => api.get('/admin/announcements', { params }),
  createAnnouncement: (announcementData) => api.post('/admin/announcements', announcementData),
  updateAnnouncement: (announcementId, data) => api.put(`/admin/announcements/${announcementId}`, data),
  deleteAnnouncement: (announcementId) => api.delete(`/admin/announcements/${announcementId}`),
  publishAnnouncement: (announcementId) => api.post(`/admin/announcements/${announcementId}/publish`),
  unpublishAnnouncement: (announcementId) => api.post(`/admin/announcements/${announcementId}/unpublish`),
  
  // Maintenance
  enableMaintenanceMode: (message) => api.post('/admin/maintenance/enable', { message }),
  disableMaintenanceMode: () => api.post('/admin/maintenance/disable'),
  getMaintenanceStatus: () => api.get('/admin/maintenance/status'),
  
  // Backups
  createBackup: () => api.post('/admin/backups/create'),
  getBackups: () => api.get('/admin/backups'),
  restoreBackup: (backupId) => api.post(`/admin/backups/${backupId}/restore`),
  deleteBackup: (backupId) => api.delete(`/admin/backups/${backupId}`),
  downloadBackup: (backupId) => api.get(`/admin/backups/${backupId}/download`),
  
  // Security
  getSecurityLogs: (params = {}) => api.get('/admin/security/logs', { params }),
  getFailedLoginAttempts: (params = {}) => api.get('/admin/security/failed-logins', { params }),
  getSecurityAlerts: () => api.get('/admin/security/alerts'),
  acknowledgeSecurityAlert: (alertId) => api.put(`/admin/security/alerts/${alertId}/acknowledge`),
  
  // API keys
  getAPIKeys: () => api.get('/admin/api-keys'),
  createAPIKey: (keyData) => api.post('/admin/api-keys', keyData),
  updateAPIKey: (keyId, data) => api.put(`/admin/api-keys/${keyId}`, data),
  deleteAPIKey: (keyId) => api.delete(`/admin/api-keys/${keyId}`),
  regenerateAPIKey: (keyId) => api.post(`/admin/api-keys/${keyId}/regenerate`),
  
  // Email management
  getEmailTemplates: () => api.get('/admin/email-templates'),
  updateEmailTemplate: (templateId, data) => api.put(`/admin/email-templates/${templateId}`, data),
  sendTestEmail: (templateId, testData) => api.post(`/admin/email-templates/${templateId}/test`, testData),
  
  // Storage management
  getStorageUsage: () => api.get('/admin/storage/usage'),
  getStorageStats: () => api.get('/admin/storage/stats'),
  cleanupStorage: (options) => api.post('/admin/storage/cleanup', options),
  
  // Queue management
  getQueueStats: () => api.get('/admin/queue/stats'),
  getQueuedJobs: (params = {}) => api.get('/admin/queue/jobs', { params }),
  retryJob: (jobId) => api.post(`/admin/queue/jobs/${jobId}/retry`),
  cancelJob: (jobId) => api.delete(`/admin/queue/jobs/${jobId}`),
  
  // Feature flags
  getFeatureFlags: () => api.get('/admin/feature-flags'),
  updateFeatureFlag: (flagId, data) => api.put(`/admin/feature-flags/${flagId}`, data),
  createFeatureFlag: (flagData) => api.post('/admin/feature-flags', flagData),
  deleteFeatureFlag: (flagId) => api.delete(`/admin/feature-flags/${flagId}`),
};

export default adminAPI;
