import api from '@services/api.service';

// Notification API endpoints
export const notificationAPI = {
  // Get notifications
  getNotifications: (params = {}) => api.get('/notifications', { params }),
  getUnreadNotifications: () => api.get('/notifications/unread'),
  getNotification: (notificationId) => api.get(`/notifications/${notificationId}`),
  
  // Mark notifications
  markAsRead: (notificationId) => api.put(`/notifications/${notificationId}/read`),
  markAllAsRead: () => api.put('/notifications/read-all'),
  markAsUnread: (notificationId) => api.put(`/notifications/${notificationId}/unread`),
  
  // Notification management
  deleteNotification: (notificationId) => api.delete(`/notifications/${notificationId}`),
  deleteAllNotifications: () => api.delete('/notifications'),
  archiveNotification: (notificationId) => api.put(`/notifications/${notificationId}/archive`),
  unarchiveNotification: (notificationId) => api.put(`/notifications/${notificationId}/unarchive`),
  
  // Create notifications
  createNotification: (notificationData) => api.post('/notifications', notificationData),
  createBulkNotifications: (notifications) => api.post('/notifications/bulk', notifications),
  
  // Notification preferences
  getNotificationPreferences: () => api.get('/notifications/preferences'),
  updateNotificationPreferences: (preferences) => api.put('/notifications/preferences', preferences),
  resetNotificationPreferences: () => api.post('/notifications/preferences/reset'),
  
  // Notification types
  getNotificationTypes: () => api.get('/notifications/types'),
  enableNotificationType: (type) => api.post(`/notifications/types/${type}/enable`),
  disableNotificationType: (type) => api.post(`/notifications/types/${type}/disable`),
  
  // Push notifications
  registerDevice: (deviceData) => api.post('/notifications/devices/register', deviceData),
  unregisterDevice: (deviceId) => api.delete(`/notifications/devices/${deviceId}`),
  getRegisteredDevices: () => api.get('/notifications/devices'),
  updateDeviceSettings: (deviceId, settings) => api.put(`/notifications/devices/${deviceId}`, settings),
  
  // Email notifications
  enableEmailNotifications: () => api.post('/notifications/email/enable'),
  disableEmailNotifications: () => api.post('/notifications/email/disable'),
  updateEmailSettings: (settings) => api.put('/notifications/email/settings', settings),
  testEmailNotification: (testData) => api.post('/notifications/email/test', testData),
  
  // SMS notifications
  enableSMSNotifications: (phoneData) => api.post('/notifications/sms/enable', phoneData),
  disableSMSNotifications: () => api.post('/notifications/sms/disable'),
  updateSMSSettings: (settings) => api.put('/notifications/sms/settings', settings),
  testSMSNotification: (testData) => api.post('/notifications/sms/test', testData),
  
  // In-app notifications
  getInAppNotifications: (params = {}) => api.get('/notifications/in-app', { params }),
  dismissInAppNotification: (notificationId) => api.post(`/notifications/in-app/${notificationId}/dismiss`),
  
  // Notification templates
  getNotificationTemplates: () => api.get('/notifications/templates'),
  createNotificationTemplate: (templateData) => api.post('/notifications/templates', templateData),
  updateNotificationTemplate: (templateId, data) => api.put(`/notifications/templates/${templateId}`, data),
  deleteNotificationTemplate: (templateId) => api.delete(`/notifications/templates/${templateId}`),
  previewNotificationTemplate: (templateId, data) => api.post(`/notifications/templates/${templateId}/preview`, data),
  
  // Notification scheduling
  scheduleNotification: (scheduleData) => api.post('/notifications/schedule', scheduleData),
  getScheduledNotifications: () => api.get('/notifications/scheduled'),
  cancelScheduledNotification: (scheduleId) => api.delete(`/notifications/schedule/${scheduleId}`),
  updateScheduledNotification: (scheduleId, data) => api.put(`/notifications/schedule/${scheduleId}`, data),
  
  // Notification campaigns
  createCampaign: (campaignData) => api.post('/notifications/campaigns', campaignData),
  getCampaigns: (params = {}) => api.get('/notifications/campaigns', { params }),
  getCampaign: (campaignId) => api.get(`/notifications/campaigns/${campaignId}`),
  updateCampaign: (campaignId, data) => api.put(`/notifications/campaigns/${campaignId}`, data),
  deleteCampaign: (campaignId) => api.delete(`/notifications/campaigns/${campaignId}`),
  launchCampaign: (campaignId) => api.post(`/notifications/campaigns/${campaignId}/launch`),
  pauseCampaign: (campaignId) => api.post(`/notifications/campaigns/${campaignId}/pause`),
  resumeCampaign: (campaignId) => api.post(`/notifications/campaigns/${campaignId}/resume`),
  
  // Notification analytics
  getNotificationStats: (period) => api.get(`/notifications/stats/${period}`),
  getCampaignStats: (campaignId) => api.get(`/notifications/campaigns/${campaignId}/stats`),
  getDeliveryStats: (period) => api.get(`/notifications/delivery/${period}`),
  getOpenRates: (period) => api.get(`/notifications/open-rates/${period}`),
  getClickRates: (period) => api.get(`/notifications/click-rates/${period}`),
  
  // Notification targeting
  getTargetingOptions: () => api.get('/notifications/targeting/options'),
  validateTargeting: (targetingData) => api.post('/notifications/targeting/validate', targetingData),
  getTargetAudience: (targetingData) => api.post('/notifications/targeting/audience', targetingData),
  
  // Notification rules
  getNotificationRules: () => api.get('/notifications/rules'),
  createNotificationRule: (ruleData) => api.post('/notifications/rules', ruleData),
  updateNotificationRule: (ruleId, data) => api.put(`/notifications/rules/${ruleId}`, data),
  deleteNotificationRule: (ruleId) => api.delete(`/notifications/rules/${ruleId}`),
  enableNotificationRule: (ruleId) => api.post(`/notifications/rules/${ruleId}/enable`),
  disableNotificationRule: (ruleId) => api.post(`/notifications/rules/${ruleId}/disable`),
  
  // Notification channels
  getNotificationChannels: () => api.get('/notifications/channels'),
  createNotificationChannel: (channelData) => api.post('/notifications/channels', channelData),
  updateNotificationChannel: (channelId, data) => api.put(`/notifications/channels/${channelId}`, data),
  deleteNotificationChannel: (channelId) => api.delete(`/notifications/channels/${channelId}`),
  testNotificationChannel: (channelId, testData) => api.post(`/notifications/channels/${channelId}/test`, testData),
  
  // Notification history
  getNotificationHistory: (params = {}) => api.get('/notifications/history', { params }),
  getNotificationHistory: (notificationId) => api.get(`/notifications/${notificationId}/history`),
  
  // Notification search
  searchNotifications: (query, filters = {}) => api.get('/notifications/search', { params: { q: query, ...filters } }),
  
  // Notification exports
  exportNotifications: (exportConfig) => api.post('/notifications/export', exportConfig),
  getExportStatus: (exportId) => api.get(`/notifications/export/${exportId}/status`),
  downloadExport: (exportId) => api.get(`/notifications/export/${exportId}/download`),
  
  // Notification subscriptions
  subscribeToNotifications: (subscriptionData) => api.post('/notifications/subscribe', subscriptionData),
  unsubscribeFromNotifications: (subscriptionId) => api.delete(`/notifications/subscribe/${subscriptionId}`),
  getNotificationSubscriptions: () => api.get('/notifications/subscribe'),
  
  // Real-time notifications
  getWebSocketToken: () => api.get('/notifications/websocket/token'),
  
  // Notification batching
  enableBatching: (settings) => api.post('/notifications/batching/enable', settings),
  disableBatching: () => api.post('/notifications/batching/disable'),
  getBatchingSettings: () => api.get('/notifications/batching/settings'),
  
  // Notification rate limiting
  getRateLimits: () => api.get('/notifications/rate-limits'),
  updateRateLimits: (limits) => api.put('/notifications/rate-limits', limits),
  
  // Notification content
  getNotificationContent: (notificationId) => api.get(`/notifications/${notificationId}/content`),
  updateNotificationContent: (notificationId, content) => api.put(`/notifications/${notificationId}/content`, content),
  
  // Notification localization
  getLocalizedNotification: (notificationId, language) => api.get(`/notifications/${notificationId}/localized/${language}`),
  updateLocalization: (notificationId, language, content) => api.put(`/notifications/${notificationId}/localized/${language}`, content),
  
  // Notification A/B testing
  createABTest: (testData) => api.post('/notifications/ab-test', testData),
  getABTestResults: (testId) => api.get(`/notifications/ab-test/${testId}`),
  endABTest: (testId) => api.post(`/notifications/ab-test/${testId}/end`),
};

export default notificationAPI;
