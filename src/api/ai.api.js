import api from '@services/api.service';

// AI API endpoints
export const aiAPI = {
  // AI Chat
  chatWithAI: (message, context = {}) => api.post('/ai/chat', { message, ...context }),
  getChatHistory: (params = {}) => api.get('/ai/chat/history', { params }),
  clearChatHistory: () => api.delete('/ai/chat/history'),
  
  // Content Analysis
  analyzeVideo: (videoId, options = {}) => api.post(`/ai/analyze/video/${videoId}`, options),
  analyzeAudio: (audioId, options = {}) => api.post(`/ai/analyze/audio/${audioId}`, options),
  analyzeImage: (imageData, options = {}) => api.post('/ai/analyze/image', { image: imageData, ...options }),
  analyzeText: (text, options = {}) => api.post('/ai/analyze/text', { text, ...options }),
  
  // Object Detection
  detectObjects: (mediaId, options = {}) => api.post(`/ai/detect/objects/${mediaId}`, options),
  getObjectLabels: (mediaId) => api.get(`/ai/detect/objects/${mediaId}/labels`),
  
  // Face Recognition
  detectFaces: (mediaId, options = {}) => api.post(`/ai/detect/faces/${mediaId}`, options),
  recognizeFaces: (mediaId) => api.post(`/ai/recognize/faces/${mediaId}`),
  getFaceMatches: (mediaId) => api.get(`/ai/faces/${mediaId}/matches`),
  
  // Scene Detection
  detectScenes: (videoId, options = {}) => api.post(`/ai/detect/scenes/${videoId}`, options),
  getSceneSegments: (videoId) => api.get(`/ai/scenes/${videoId}/segments`),
  
  // Sentiment Analysis
  analyzeSentiment: (text, options = {}) => api.post('/ai/analyze/sentiment', { text, ...options }),
  getVideoSentiment: (videoId) => api.get(`/ai/sentiment/video/${videoId}`),
  
  // Auto Subtitles
  generateSubtitles: (mediaId, options = {}) => api.post(`/ai/subtitles/generate/${mediaId}`, options),
  getSubtitles: (mediaId, language) => api.get(`/ai/subtitles/${mediaId}/${language}`),
  translateSubtitles: (mediaId, fromLang, toLang) => api.post(`/ai/subtitles/${mediaId}/translate`, { fromLang, toLang }),
  
  // Smart Search
  smartSearch: (query, filters = {}) => api.post('/ai/search', { query, ...filters }),
  searchByContent: (query, mediaType) => api.post('/ai/search/content', { query, mediaType }),
  searchSimilar: (mediaId, options = {}) => api.post(`/ai/search/similar/${mediaId}`, options),
  
  // Recommendations
  getRecommendations: (userId, options = {}) => api.get(`/ai/recommendations/${userId}`, { params: options }),
  getContentRecommendations: (contentId, options = {}) => api.get(`/ai/recommendations/content/${contentId}`, { params: options }),
  updateRecommendationProfile: (profileData) => api.put('/ai/recommendations/profile', profileData),
  
  // AI Enhancement
  enhanceVideo: (videoId, options = {}) => api.post(`/ai/enhance/video/${videoId}`, options),
  enhanceAudio: (audioId, options = {}) => api.post(`/ai/enhance/audio/${audioId}`, options),
  upscaleVideo: (videoId, targetResolution) => api.post(`/ai/enhance/video/${videoId}/upscale`, { targetResolution }),
  denoiseAudio: (audioId) => api.post(`/ai/enhance/audio/${audioId}/denoise`),
  
  // Voice Commands
  processVoiceCommand: (audioData, options = {}) => api.post('/ai/voice/command', { audio: audioData, ...options }),
  trainVoiceModel: (userId, voiceSamples) => api.post(`/ai/voice/train/${userId}`, { voiceSamples }),
  getVoiceCommands: () => api.get('/ai/voice/commands'),
  
  // Content Moderation
  moderateContent: (contentId, options = {}) => api.post(`/ai/moderate/${contentId}`, options),
  getModerationReport: (contentId) => api.get(`/ai/moderate/${contentId}/report`),
  
  // AI Models
  getAvailableModels: () => api.get('/ai/models'),
  getModelInfo: (modelId) => api.get(`/ai/models/${modelId}`),
  switchModel: (modelId) => api.post('/ai/models/switch', { modelId }),
  
  // AI Training
  trainCustomModel: (trainingData) => api.post('/ai/train/custom', trainingData),
  getTrainingStatus: (trainingId) => api.get(`/ai/train/${trainingId}/status`),
  getTrainingResults: (trainingId) => api.get(`/ai/train/${trainingId}/results`),
  
  // AI Analytics
  getAIUsageStats: (period) => api.get(`/ai/analytics/usage/${period}`),
  getModelPerformance: (modelId, period) => api.get(`/ai/analytics/models/${modelId}/${period}`),
  getAIInsights: (options = {}) => api.get('/ai/analytics/insights', { params: options }),
  
  // AI Settings
  getAISettings: () => api.get('/ai/settings'),
  updateAISettings: (settings) => api.put('/ai/settings', settings),
  resetAISettings: () => api.post('/ai/settings/reset'),
  
  // AI Features
  enableAIFeature: (feature, options = {}) => api.post(`/ai/features/${feature}/enable`, options),
  disableAIFeature: (feature) => api.post(`/ai/features/${feature}/disable`),
  getFeatureStatus: (feature) => api.get(`/ai/features/${feature}/status`),
  
  // AI Content Generation
  generateThumbnail: (videoId, options = {}) => api.post(`/ai/generate/thumbnail/${videoId}`, options),
  generateDescription: (contentId, options = {}) => api.post(`/ai/generate/description/${contentId}`, options),
  generateTags: (contentId, options = {}) => api.post(`/ai/generate/tags/${contentId}`, options),
  generateTitle: (contentId, options = {}) => api.post(`/ai/generate/title/${contentId}`, options),
  
  // AI Summarization
  summarizeVideo: (videoId, options = {}) => api.post(`/ai/summarize/video/${videoId}`, options),
  summarizeText: (text, options = {}) => api.post('/ai/summarize/text', { text, ...options }),
  getVideoSummary: (videoId) => api.get(`/ai/summary/video/${videoId}`),
  
  // AI Transcription
  transcribeAudio: (audioId, options = {}) => api.post(`/ai/transcribe/${audioId}`, options),
  getTranscription: (audioId, language) => api.get(`/ai/transcription/${audioId}/${language}`),
  correctTranscription: (transcriptionId, corrections) => api.put(`/ai/transcription/${transcriptionId}/correct`, { corrections }),
  
  // AI Translation
  translateContent: (contentId, targetLanguage, options = {}) => api.post(`/ai/translate/${contentId}`, { targetLanguage, ...options }),
  getTranslation: (contentId, language) => api.get(`/ai/translation/${contentId}/${language}`),
  
  // AI Quality Assessment
  assessVideoQuality: (videoId) => api.get(`/ai/quality/video/${videoId}`),
  assessAudioQuality: (audioId) => api.get(`/ai/quality/audio/${audioId}`),
  getQualityReport: (contentId) => api.get(`/ai/quality/report/${contentId}`),
  
  // AI Personalization
  getPersonalizedContent: (userId, options = {}) => api.get(`/ai/personalize/${userId}`, { params: options }),
  updatePersonalizationProfile: (userId, profileData) => api.put(`/ai/personalize/${userId}`, profileData),
  
  // AI Predictions
  predictContentPerformance: (contentId, options = {}) => api.post(`/ai/predict/performance/${contentId}`, options),
  predictUserEngagement: (userId, contentId) => api.post(`/ai/predict/engagement`, { userId, contentId }),
  
  // AI Batch Processing
  startBatchProcessing: (items, operation, options = {}) => api.post('/ai/batch/process', { items, operation, ...options }),
  getBatchStatus: (batchId) => api.get(`/ai/batch/${batchId}/status`),
  cancelBatchProcessing: (batchId) => api.delete(`/ai/batch/${batchId}`),
  
  // AI Webhooks
  registerWebhook: (webhookData) => api.post('/ai/webhooks', webhookData),
  getWebhooks: () => api.get('/ai/webhooks'),
  updateWebhook: (webhookId, data) => api.put(`/ai/webhooks/${webhookId}`, data),
  deleteWebhook: (webhookId) => api.delete(`/ai/webhooks/${webhookId}`),
  
  // AI Exports
  exportAIResults: (type, options = {}) => api.post('/ai/export', { type, ...options }),
  getExportStatus: (exportId) => api.get(`/ai/export/${exportId}/status`),
  downloadExport: (exportId) => api.get(`/ai/export/${exportId}/download`),
};

export default aiAPI;
