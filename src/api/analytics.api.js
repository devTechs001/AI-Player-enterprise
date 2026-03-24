import api from '@services/api.service';

// Analytics API endpoints
export const analyticsAPI = {
  // User analytics
  getUserAnalytics: (userId, period) => api.get(`/analytics/users/${userId}/${period}`),
  getUserActivity: (userId, period) => api.get(`/analytics/users/${userId}/activity/${period}`),
  getUserEngagement: (userId, period) => api.get(`/analytics/users/${userId}/engagement/${period}`),
  
  // Content analytics
  getContentAnalytics: (contentType, period) => api.get(`/analytics/content/${contentType}/${period}`),
  getVideoAnalytics: (videoId, period) => api.get(`/analytics/videos/${videoId}/${period}`),
  getMusicAnalytics: (trackId, period) => api.get(`/analytics/music/${trackId}/${period}`),
  
  // Engagement metrics
  getEngagementMetrics: (period, filters = {}) => api.get(`/analytics/engagement/${period}`, { params: filters }),
  getViewMetrics: (period, filters = {}) => api.get(`/analytics/views/${period}`, { params: filters }),
  getInteractionMetrics: (period, filters = {}) => api.get(`/analytics/interactions/${period}`, { params: filters }),
  
  // Performance analytics
  getPerformanceMetrics: (period) => api.get(`/analytics/performance/${period}`),
  getSystemPerformance: (period) => api.get(`/analytics/system/performance/${period}`),
  getAPIPerformance: (period) => api.get(`/analytics/api/performance/${period}`),
  
  // Conversion analytics
  getConversionMetrics: (period) => api.get(`/analytics/conversions/${period}`),
  getFunnelAnalytics: (funnelType, period) => api.get(`/analytics/funnels/${funnelType}/${period}`),
  getRetentionMetrics: (period) => api.get(`/analytics/retention/${period}`),
  
  // Revenue analytics
  getRevenueAnalytics: (period) => api.get(`/analytics/revenue/${period}`),
  getSubscriptionRevenue: (period) => api.get(`/analytics/revenue/subscriptions/${period}`),
  getAdRevenue: (period) => api.get(`/analytics/revenue/ads/${period}`),
  
  // Real-time analytics
  getRealTimeMetrics: () => api.get('/analytics/realtime'),
  getLiveViewers: () => api.get('/analytics/live/viewers'),
  getActiveUsers: () => api.get('/analytics/active-users'),
  
  // Custom events
  trackEvent: (eventName, eventData) => api.post('/analytics/events', { name: eventName, data: eventData }),
  getEventAnalytics: (eventName, period) => api.get(`/analytics/events/${eventName}/${period}`),
  
  // Dashboards
  getDashboardData: (dashboardId, period) => api.get(`/analytics/dashboards/${dashboardId}/${period}`),
  createDashboard: (dashboardData) => api.post('/analytics/dashboards', dashboardData),
  updateDashboard: (dashboardId, data) => api.put(`/analytics/dashboards/${dashboardId}`, data),
  deleteDashboard: (dashboardId) => api.delete(`/analytics/dashboards/${dashboardId}`),
  
  // Reports
  generateReport: (reportConfig) => api.post('/analytics/reports', reportConfig),
  getReports: (params = {}) => api.get('/analytics/reports', { params }),
  downloadReport: (reportId) => api.get(`/analytics/reports/${reportId}/download`),
  
  // Segments
  getUserSegments: () => api.get('/analytics/segments'),
  createSegment: (segmentData) => api.post('/analytics/segments', segmentData),
  updateSegment: (segmentId, data) => api.put(`/analytics/segments/${segmentId}`, data),
  deleteSegment: (segmentId) => api.delete(`/analytics/segments/${segmentId}`),
  
  // Cohorts
  getCohortAnalysis: (period) => api.get(`/analytics/cohorts/${period}`),
  createCohort: (cohortData) => api.post('/analytics/cohorts', cohortData),
  getCohortMetrics: (cohortId, period) => api.get(`/analytics/cohorts/${cohortId}/${period}`),
  
  // Heatmaps
  getHeatmapData: (contentType, contentId, period) => api.get(`/analytics/heatmaps/${contentType}/${contentId}/${period}`),
  getClickHeatmap: (contentType, contentId) => api.get(`/analytics/heatmaps/${contentType}/${contentId}/clicks`),
  getScrollHeatmap: (contentType, contentId) => api.get(`/analytics/heatmaps/${contentType}/${contentId}/scroll`),
  
  // A/B Testing
  getABTestResults: (testId) => api.get(`/analytics/ab-tests/${testId}`),
  createABTest: (testData) => api.post('/analytics/ab-tests', testData),
  updateABTest: (testId, data) => api.put(`/analytics/ab-tests/${testId}`, data),
  endABTest: (testId) => api.post(`/analytics/ab-tests/${testId}/end`),
  
  // Predictive analytics
  getPredictions: (modelType, params = {}) => api.get(`/analytics/predictions/${modelType}`, { params }),
  getChurnPrediction: (userId) => api.get(`/analytics/predictions/churn/${userId}`),
  getRevenuePrediction: (period) => api.get(`/analytics/predictions/revenue/${period}`),
  
  // Attribution
  getAttributionData: (period) => api.get(`/analytics/attribution/${period}`),
  getChannelAttribution: (period) => api.get(`/analytics/attribution/channels/${period}`),
  getCampaignAttribution: (campaignId, period) => api.get(`/analytics/attribution/campaigns/${campaignId}/${period}`),
  
  // Analytics settings
  getAnalyticsSettings: () => api.get('/analytics/settings'),
  updateAnalyticsSettings: (settings) => api.put('/analytics/settings', settings),
  
  // Data exports
  exportAnalyticsData: (exportConfig) => api.post('/analytics/export', exportConfig),
  getExportStatus: (exportId) => api.get(`/analytics/export/${exportId}/status`),
  downloadExport: (exportId) => api.get(`/analytics/export/${exportId}/download`),
  
  // API usage analytics
  getAPIUsageStats: (period) => api.get(`/analytics/api/usage/${period}`),
  getEndpointStats: (endpoint, period) => api.get(`/analytics/api/endpoints/${endpoint}/${period}`),
  getErrorAnalytics: (period) => api.get(`/analytics/errors/${period}`),
  
  // Content performance
  getTopContent: (contentType, period, limit = 10) => api.get(`/analytics/content/${contentType}/top/${period}`, { params: { limit } }),
  getTrendingContent: (contentType, period) => api.get(`/analytics/content/${contentType}/trending/${period}`),
  getUnderperformingContent: (contentType, period) => api.get(`/analytics/content/${contentType}/underperforming/${period}`),
  
  // User behavior
  getUserJourney: (userId) => api.get(`/analytics/users/${userId}/journey`),
  getUserSessions: (userId, period) => api.get(`/analytics/users/${userId}/sessions/${period}`),
  getUserPaths: (period) => api.get(`/analytics/paths/${period}`),
  
  // Search analytics
  getSearchAnalytics: (period) => api.get(`/analytics/search/${period}`),
  getPopularSearches: (period) => api.get(`/analytics/search/popular/${period}`),
  getSearchConversions: (period) => api.get(`/analytics/search/conversions/${period}`),
};

export default analyticsAPI;
