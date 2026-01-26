import api from './api.service';

class AIService {
  // Chat with AI
  async chat(message, context = {}) {
    const response = await api.post('/ai/chat', { message, context });
    return response.data;
  }

  // Analyze video content
  async analyzeVideo(videoId) {
    const response = await api.post(`/ai/analyze/video/${videoId}`);
    return response.data;
  }

  // Generate subtitles
  async generateSubtitles(videoId, language = 'en') {
    const response = await api.post(`/ai/subtitles/generate`, {
      videoId,
      language,
    });
    return response.data;
  }

  // Translate subtitles
  async translateSubtitles(subtitleId, targetLanguage) {
    const response = await api.post(`/ai/subtitles/translate`, {
      subtitleId,
      targetLanguage,
    });
    return response.data;
  }

  // Get content recommendations
  async getRecommendations(userId, options = {}) {
    const response = await api.get('/ai/recommendations', {
      params: { userId, ...options },
    });
    return response.data;
  }

  // Detect scenes in video
  async detectScenes(videoId) {
    const response = await api.post(`/ai/scenes/detect/${videoId}`);
    return response.data;
  }

  // Object detection
  async detectObjects(videoId, timestamp) {
    const response = await api.post(`/ai/objects/detect`, {
      videoId,
      timestamp,
    });
    return response.data;
  }

  // Face detection
  async detectFaces(videoId, timestamp) {
    const response = await api.post(`/ai/faces/detect`, {
      videoId,
      timestamp,
    });
    return response.data;
  }

  // Sentiment analysis
  async analyzeSentiment(text) {
    const response = await api.post('/ai/sentiment', { text });
    return response.data;
  }

  // Video summarization
  async summarizeVideo(videoId) {
    const response = await api.post(`/ai/summarize/${videoId}`);
    return response.data;
  }

  // Smart search
  async smartSearch(query, options = {}) {
    const response = await api.get('/ai/search', {
      params: { query, ...options },
    });
    return response.data;
  }

  // Enhance video quality
  async enhanceVideo(videoId, options = {}) {
    const response = await api.post(`/ai/enhance/${videoId}`, options);
    return response.data;
  }

  // Voice to text
  async speechToText(audioBlob, language = 'en') {
    const formData = new FormData();
    formData.append('audio', audioBlob);
    formData.append('language', language);

    const response = await api.post('/ai/speech-to-text', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }

  // Text to speech
  async textToSpeech(text, options = {}) {
    const response = await api.post('/ai/text-to-speech', { text, ...options }, {
      responseType: 'blob',
    });
    return response.data;
  }

  // Get AI usage stats
  async getUsageStats() {
    const response = await api.get('/ai/usage');
    return response.data;
  }
}

export const aiService = new AIService();
export default aiService;