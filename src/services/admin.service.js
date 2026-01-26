import api from './api.service';

class AdminService {
  // Get dashboard stats
  async getStats(timeRange = '7d') {
    const response = await api.get('/admin/stats', { params: { timeRange } });
    return response.data;
  }

  // Get user list
  async getUsers(options = {}) {
    const response = await api.get('/admin/users', { params: options });
    return response.data;
  }

  // Get user details
  async getUser(userId) {
    const response = await api.get(`/admin/users/${userId}`);
    return response.data;
  }

  // Update user
  async updateUser(userId, userData) {
    const response = await api.put(`/admin/users/${userId}`, userData);
    return response.data;
  }

  // Delete user
  async deleteUser(userId) {
    const response = await api.delete(`/admin/users/${userId}`);
    return response.data;
  }

  // Ban user
  async banUser(userId, reason) {
    const response = await api.post(`/admin/users/${userId}/ban`, { reason });
    return response.data;
  }

  // Unban user
  async unbanUser(userId) {
    const response = await api.post(`/admin/users/${userId}/unban`);
    return response.data;
  }

  // Get content reports
  async getReports(options = {}) {
    const response = await api.get('/admin/reports', { params: options });
    return response.data;
  }

  // Get flagged content
  async getFlaggedContent(options = {}) {
    const response = await api.get('/admin/flagged', { params: options });
    return response.data;
  }

  // Moderate content
  async moderateContent(reportId, action, reason) {
    const response = await api.post(`/admin/reports/${reportId}/moderate`, {
      action, // approve, reject, remove
      reason,
    });
    return response.data;
  }

  // Get system health
  async getSystemHealth() {
    const response = await api.get('/admin/system-health');
    return response.data;
  }

  // Get system logs
  async getSystemLogs(options = {}) {
    const response = await api.get('/admin/logs', { params: options });
    return response.data;
  }

  // Get audit logs
  async getAuditLogs(options = {}) {
    const response = await api.get('/admin/audit-logs', { params: options });
    return response.data;
  }

  // Get analytics
  async getAnalytics(options = {}) {
    const response = await api.get('/admin/analytics', { params: options });
    return response.data;
  }

  // Get revenue stats
  async getRevenueStats(options = {}) {
    const response = await api.get('/admin/revenue', { params: options });
    return response.data;
  }

  // Get subscription stats
  async getSubscriptionStats() {
    const response = await api.get('/admin/subscriptions/stats');
    return response.data;
  }

  // Get user subscriptions
  async getUserSubscriptions(options = {}) {
    const response = await api.get('/admin/subscriptions', { params: options });
    return response.data;
  }

  // Update subscription
  async updateSubscription(subscriptionId, data) {
    const response = await api.put(`/admin/subscriptions/${subscriptionId}`, data);
    return response.data;
  }

  // Cancel subscription
  async cancelSubscription(subscriptionId, reason) {
    const response = await api.post(`/admin/subscriptions/${subscriptionId}/cancel`, { reason });
    return response.data;
  }

  // Get API keys
  async getApiKeys() {
    const response = await api.get('/admin/api-keys');
    return response.data;
  }

  // Create API key
  async createApiKey(keyData) {
    const response = await api.post('/admin/api-keys', keyData);
    return response.data;
  }

  // Update API key
  async updateApiKey(keyId, keyData) {
    const response = await api.put(`/admin/api-keys/${keyId}`, keyData);
    return response.data;
  }

  // Delete API key
  async deleteApiKey(keyId) {
    const response = await api.delete(`/admin/api-keys/${keyId}`);
    return response.data;
  }

  // Get system settings
  async getSystemSettings() {
    const response = await api.get('/admin/settings');
    return response.data;
  }

  // Update system settings
  async updateSystemSettings(settings) {
    const response = await api.put('/admin/settings', settings);
    return response.data;
  }

  // Get maintenance mode
  async getMaintenanceMode() {
    const response = await api.get('/admin/maintenance');
    return response.data;
  }

  // Set maintenance mode
  async setMaintenanceMode(enabled, message = '') {
    const response = await api.post('/admin/maintenance', { enabled, message });
    return response.data;
  }

  // Get backup status
  async getBackupStatus() {
    const response = await api.get('/admin/backup');
    return response.data;
  }

  // Create backup
  async createBackup() {
    const response = await api.post('/admin/backup');
    return response.data;
  }

  // Restore backup
  async restoreBackup(backupId) {
    const response = await api.post(`/admin/backup/${backupId}/restore`);
    return response.data;
  }

  // Get storage usage
  async getStorageUsage() {
    const response = await api.get('/admin/storage');
    return response.data;
  }

  // Get performance metrics
  async getPerformanceMetrics(options = {}) {
    const response = await api.get('/admin/performance', { params: options });
    return response.data;
  }

  // Get user activity
  async getUserActivity(userId, options = {}) {
    const response = await api.get(`/admin/users/${userId}/activity`, { params: options });
    return response.data;
  }

  // Get content stats
  async getContentStats() {
    const response = await api.get('/admin/content-stats');
    return response.data;
  }

  // Get video content
  async getVideoContent(options = {}) {
    const response = await api.get('/admin/content/videos', { params: options });
    return response.data;
  }

  // Get audio content
  async getAudioContent(options = {}) {
    const response = await api.get('/admin/content/audio', { params: options });
    return response.data;
  }

  // Get user uploads
  async getUserUploads(options = {}) {
    const response = await api.get('/admin/content/uploads', { params: options });
    return response.data;
  }

  // Get download stats
  async getDownloadStats(options = {}) {
    const response = await api.get('/admin/downloads', { params: options });
    return response.data;
  }

  // Get API usage
  async getApiUsage(options = {}) {
    const response = await api.get('/admin/api-usage', { params: options });
    return response.data;
  }

  // Get feature usage
  async getFeatureUsage(options = {}) {
    const response = await api.get('/admin/features', { params: options });
    return response.data;
  }

  // Get error logs
  async getErrorLogs(options = {}) {
    const response = await api.get('/admin/errors', { params: options });
    return response.data;
  }

  // Clear error logs
  async clearErrorLogs() {
    const response = await api.delete('/admin/errors');
    return response.data;
  }

  // Get notification templates
  async getNotificationTemplates() {
    const response = await api.get('/admin/notifications/templates');
    return response.data;
  }

  // Create notification template
  async createNotificationTemplate(template) {
    const response = await api.post('/admin/notifications/templates', template);
    return response.data;
  }

  // Update notification template
  async updateNotificationTemplate(templateId, template) {
    const response = await api.put(`/admin/notifications/templates/${templateId}`, template);
    return response.data;
  }

  // Delete notification template
  async deleteNotificationTemplate(templateId) {
    const response = await api.delete(`/admin/notifications/templates/${templateId}`);
    return response.data;
  }

  // Send notification
  async sendNotification(notificationData) {
    const response = await api.post('/admin/notifications', notificationData);
    return response.data;
  }

  // Get system configuration
  async getSystemConfig() {
    const response = await api.get('/admin/config');
    return response.data;
  }

  // Update system configuration
  async updateSystemConfig(config) {
    const response = await api.put('/admin/config', config);
    return response.data;
  }

  // Get cache stats
  async getCacheStats() {
    const response = await api.get('/admin/cache');
    return response.data;
  }

  // Clear cache
  async clearCache() {
    const response = await api.post('/admin/cache/clear');
    return response.data;
  }

  // Get database stats
  async getDatabaseStats() {
    const response = await api.get('/admin/database');
    return response.data;
  }

  // Optimize database
  async optimizeDatabase() {
    const response = await api.post('/admin/database/optimize');
    return response.data;
  }

  // Get security logs
  async getSecurityLogs(options = {}) {
    const response = await api.get('/admin/security', { params: options });
    return response.data;
  }

  // Get suspicious activities
  async getSuspiciousActivities(options = {}) {
    const response = await api.get('/admin/security/suspicious', { params: options });
    return response.data;
  }

  // Get IP bans
  async getIpBans() {
    const response = await api.get('/admin/security/ip-bans');
    return response.data;
  }

  // Ban IP
  async banIp(ipAddress, reason) {
    const response = await api.post('/admin/security/ip-bans', { ipAddress, reason });
    return response.data;
  }

  // Unban IP
  async unbanIp(ipAddress) {
    const response = await api.delete(`/admin/security/ip-bans/${ipAddress}`);
    return response.data;
  }

  // Get rate limiting stats
  async getRateLimitingStats() {
    const response = await api.get('/admin/security/rate-limiting');
    return response.data;
  }

  // Export data
  async exportData(type, options = {}) {
    const response = await api.get(`/admin/export/${type}`, {
      params: options,
      responseType: 'blob',
    });
    return response.data;
  }

  // Import data
  async importData(type, file) {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post(`/admin/import/${type}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }

  // Get system updates
  async getSystemUpdates() {
    const response = await api.get('/admin/updates');
    return response.data;
  }

  // Apply system updates
  async applySystemUpdate(updateId) {
    const response = await api.post(`/admin/updates/${updateId}/apply`);
    return response.data;
  }

  // Get plugin list
  async getPlugins() {
    const response = await api.get('/admin/plugins');
    return response.data;
  }

  // Install plugin
  async installPlugin(pluginId) {
    const response = await api.post(`/admin/plugins/${pluginId}/install`);
    return response.data;
  }

  // Uninstall plugin
  async uninstallPlugin(pluginId) {
    const response = await api.delete(`/admin/plugins/${pluginId}`);
    return response.data;
  }

  // Enable plugin
  async enablePlugin(pluginId) {
    const response = await api.post(`/admin/plugins/${pluginId}/enable`);
    return response.data;
  }

  // Disable plugin
  async disablePlugin(pluginId) {
    const response = await api.post(`/admin/plugins/${pluginId}/disable`);
    return response.data;
  }
}

export const adminService = new AdminService();
export default adminService;