import api from '@services/api.service';

// WebSocket API endpoints
export const websocketAPI = {
  // WebSocket connection management
  getWebSocketToken: () => api.get('/websocket/token'),
  validateWebSocketToken: (token) => api.post('/websocket/token/validate', { token }),
  refreshWebSocketToken: () => api.post('/websocket/token/refresh'),
  
  // WebSocket rooms
  joinRoom: (roomId, roomData = {}) => api.post(`/websocket/rooms/${roomId}/join`, roomData),
  leaveRoom: (roomId) => api.post(`/websocket/rooms/${roomId}/leave`),
  getRoomInfo: (roomId) => api.get(`/websocket/rooms/${roomId}`),
  getRoomParticipants: (roomId) => api.get(`/websocket/rooms/${roomId}/participants`),
  
  // WebSocket messaging
  sendMessage: (roomId, messageData) => api.post(`/websocket/rooms/${roomId}/message`, messageData),
  getMessageHistory: (roomId, params = {}) => api.get(`/websocket/rooms/${roomId}/messages`, { params }),
  deleteMessage: (roomId, messageId) => api.delete(`/websocket/rooms/${roomId}/messages/${messageId}`),
  
  // WebSocket events
  getEventHistory: (params = {}) => api.get('/websocket/events', { params }),
  getEventTypes: () => api.get('/websocket/events/types'),
  subscribeToEvents: (eventTypes) => api.post('/websocket/events/subscribe', { eventTypes }),
  unsubscribeFromEvents: (eventTypes) => api.post('/websocket/events/unsubscribe', { eventTypes }),
  
  // WebSocket presence
  updatePresence: (presenceData) => api.put('/websocket/presence', presenceData),
  getPresence: (roomId) => api.get(`/websocket/presence/${roomId}`),
  getUserPresence: (userId) => api.get(`/websocket/presence/user/${userId}`),
  
  // WebSocket notifications
  enableNotifications: () => api.post('/websocket/notifications/enable'),
  disableNotifications: () => api.post('/websocket/notifications/disable'),
  getNotificationSettings: () => api.get('/websocket/notifications/settings'),
  updateNotificationSettings: (settings) => api.put('/websocket/notifications/settings', settings),
  
  // WebSocket authentication
  authenticateConnection: (authData) => api.post('/websocket/authenticate', authData),
  deauthenticateConnection: () => api.post('/websocket/deauthenticate'),
  getConnectionInfo: () => api.get('/websocket/connection/info'),
  
  // WebSocket statistics
  getConnectionStats: () => api.get('/websocket/stats/connections'),
  getRoomStats: (roomId) => api.get(`/websocket/stats/rooms/${roomId}`),
  getMessageStats: (period) => api.get(`/websocket/stats/messages/${period}`),
  getEventStats: (period) => api.get(`/websocket/stats/events/${period}`),
  
  // WebSocket administration
  getActiveConnections: () => api.get('/websocket/admin/connections'),
  getConnectionDetails: (connectionId) => api.get(`/websocket/admin/connections/${connectionId}`),
  terminateConnection: (connectionId, reason) => api.post(`/websocket/admin/connections/${connectionId}/terminate`, { reason }),
  broadcastMessage: (messageData) => api.post('/websocket/admin/broadcast', messageData),
  
  // WebSocket rooms management
  createRoom: (roomData) => api.post('/websocket/admin/rooms', roomData),
  updateRoom: (roomId, data) => api.put(`/websocket/admin/rooms/${roomId}`, data),
  deleteRoom: (roomId) => api.delete(`/websocket/admin/rooms/${roomId}`),
  getRoomList: (params = {}) => api.get('/websocket/admin/rooms', { params }),
  
  // WebSocket rate limiting
  getRateLimits: () => api.get('/websocket/rate-limits'),
  updateRateLimits: (limits) => api.put('/websocket/rate-limits', limits),
  getConnectionRateLimit: (connectionId) => api.get(`/websocket/rate-limits/connections/${connectionId}`),
  
  // WebSocket security
  getSecuritySettings: () => api.get('/websocket/security'),
  updateSecuritySettings: (settings) => api.put('/websocket/security', settings),
  getBlockedIPs: () => api.get('/websocket/security/blocked-ips'),
  blockIP: (ipData) => api.post('/websocket/security/block-ip', ipData),
  unblockIP: (ip) => api.delete(`/websocket/security/block-ip/${ip}`),
  
  // WebSocket health monitoring
  getHealthStatus: () => api.get('/websocket/health'),
  getPerformanceMetrics: () => api.get('/websocket/performance'),
  getErrorLogs: (params = {}) => api.get('/websocket/logs/errors', { params }),
  
  // WebSocket scaling
  getScalingInfo: () => api.get('/websocket/scaling'),
  updateScalingSettings: (settings) => api.put('/websocket/scaling/settings', settings),
  getServerNodes: () => api.get('/websocket/scaling/nodes'),
  addServerNode: (nodeData) => api.post('/websocket/scaling/nodes', nodeData),
  removeServerNode: (nodeId) => api.delete(`/websocket/scaling/nodes/${nodeId}`),
  
  // WebSocket debugging
  enableDebugMode: () => api.post('/websocket/debug/enable'),
  disableDebugMode: () => api.post('/websocket/debug/disable'),
  getDebugLogs: (params = {}) => api.get('/websocket/debug/logs', { params }),
  getConnectionTrace: (connectionId) => api.get(`/websocket/debug/connections/${connectionId}/trace`),
  
  // WebSocket webhooks
  registerWebhook: (webhookData) => api.post('/websocket/webhooks', webhookData),
  getWebhooks: () => api.get('/websocket/webhooks'),
  updateWebhook: (webhookId, data) => api.put(`/websocket/webhooks/${webhookId}`, data),
  deleteWebhook: (webhookId) => api.delete(`/websocket/webhooks/${webhookId}`),
  testWebhook: (webhookId, testData) => api.post(`/websocket/webhooks/${webhookId}/test`, testData),
  
  // WebSocket persistence
  enablePersistence: (settings) => api.post('/websocket/persistence/enable', settings),
  disablePersistence: () => api.post('/websocket/persistence/disable'),
  getPersistenceSettings: () => api.get('/websocket/persistence/settings'),
  getPersistentData: (roomId) => api.get(`/websocket/persistence/${roomId}`),
  
  // WebSocket clustering
  getClusterInfo: () => api.get('/websocket/cluster'),
  getClusterNodes: () => api.get('/websocket/cluster/nodes'),
  syncCluster: () => api.post('/websocket/cluster/sync'),
  rebalanceCluster: () => api.post('/websocket/cluster/rebalance'),
  
  // WebSocket backups
  createBackup: () => api.post('/websocket/backup/create'),
  getBackups: () => api.get('/websocket/backup'),
  restoreBackup: (backupId) => api.post(`/websocket/backup/${backupId}/restore`),
  deleteBackup: (backupId) => api.delete(`/websocket/backup/${backupId}`),
  
  // WebSocket configuration
  getConfiguration: () => api.get('/websocket/config'),
  updateConfiguration: (config) => api.put('/websocket/config', config),
  resetConfiguration: () => api.post('/websocket/config/reset'),
  exportConfiguration: () => api.get('/websocket/config/export'),
  importConfiguration: (configData) => api.post('/websocket/config/import', configData),
  
  // WebSocket metrics
  getRealTimeMetrics: () => api.get('/websocket/metrics/realtime'),
  getHistoricalMetrics: (period) => api.get(`/websocket/metrics/historical/${period}`),
  getCustomMetrics: (metricNames) => api.post('/websocket/metrics/custom', { metricNames }),
  
  // WebSocket alerts
  getAlerts: (params = {}) => api.get('/websocket/alerts', { params }),
  createAlert: (alertData) => api.post('/websocket/alerts', alertData),
  updateAlert: (alertId, data) => api.put(`/websocket/alerts/${alertId}`, data),
  deleteAlert: (alertId) => api.delete(`/websocket/alerts/${alertId}`),
  acknowledgeAlert: (alertId) => api.post(`/websocket/alerts/${alertId}/acknowledge`),
  
  // WebSocket testing
  testConnection: (testData) => api.post('/websocket/test/connection', testData),
  testMessage: (testData) => api.post('/websocket/test/message', testData),
  testRoom: (testData) => api.post('/websocket/test/room', testData),
  
  // WebSocket versioning
  getVersion: () => api.get('/websocket/version'),
  getChangelog: () => api.get('/websocket/changelog'),
  checkCompatibility: (version) => api.post('/websocket/compatibility/check', { version }),
};

export default websocketAPI;
