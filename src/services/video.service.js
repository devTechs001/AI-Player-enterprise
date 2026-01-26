import api from './api.service';

class VideoService {
  // Get video information
  async getMediaInfo(videoId) {
    const response = await api.get(`/videos/${videoId}/info`);
    return response.data;
  }

  // Get video stream
  async getVideoStream(videoId, options = {}) {
    const response = await api.get(`/videos/${videoId}/stream`, {
      params: options,
    });
    return response.data;
  }

  // Get video metadata
  async getVideoMetadata(videoId) {
    const response = await api.get(`/videos/${videoId}/metadata`);
    return response.data;
  }

  // Get video recommendations
  async getRecommendations(videoId) {
    const response = await api.get(`/videos/${videoId}/recommendations`);
    return response.data;
  }

  // Save watch progress
  async saveProgress(videoId, currentTime, duration) {
    const response = await api.post(`/videos/${videoId}/progress`, {
      currentTime,
      duration,
    });
    return response.data;
  }

  // Get watch history
  async getWatchHistory() {
    const response = await api.get('/videos/history');
    return response.data;
  }

  // Add to favorites
  async addToFavorites(videoId) {
    const response = await api.post(`/videos/${videoId}/favorites`);
    return response.data;
  }

  // Remove from favorites
  async removeFromFavorites(videoId) {
    const response = await api.delete(`/videos/${videoId}/favorites`);
    return response.data;
  }

  // Get favorites
  async getFavorites() {
    const response = await api.get('/videos/favorites');
    return response.data;
  }

  // Get video analytics
  async getAnalytics(videoId) {
    const response = await api.get(`/videos/${videoId}/analytics`);
    return response.data;
  }

  // Report video
  async reportVideo(videoId, reason) {
    const response = await api.post(`/videos/${videoId}/report`, { reason });
    return response.data;
  }

  // Get video comments
  async getComments(videoId, options = {}) {
    const response = await api.get(`/videos/${videoId}/comments`, {
      params: options,
    });
    return response.data;
  }

  // Add comment
  async addComment(videoId, comment) {
    const response = await api.post(`/videos/${videoId}/comments`, { comment });
    return response.data;
  }

  // Like comment
  async likeComment(commentId) {
    const response = await api.post(`/comments/${commentId}/like`);
    return response.data;
  }

  // Get related videos
  async getRelatedVideos(videoId, options = {}) {
    const response = await api.get(`/videos/${videoId}/related`, {
      params: options,
    });
    return response.data;
  }

  // Search videos
  async searchVideos(query, options = {}) {
    const response = await api.get('/videos/search', {
      params: { q: query, ...options },
    });
    return response.data;
  }

  // Get video categories
  async getCategories() {
    const response = await api.get('/videos/categories');
    return response.data;
  }

  // Get trending videos
  async getTrendingVideos(options = {}) {
    const response = await api.get('/videos/trending', { params: options });
    return response.data;
  }

  // Get featured videos
  async getFeaturedVideos(options = {}) {
    const response = await api.get('/videos/featured', { params: options });
    return response.data;
  }

  // Get user's uploaded videos
  async getUserVideos(userId, options = {}) {
    const response = await api.get(`/users/${userId}/videos`, { params: options });
    return response.data;
  }

  // Upload video
  async uploadVideo(videoData) {
    const formData = new FormData();
    formData.append('video', videoData.file);
    formData.append('title', videoData.title);
    formData.append('description', videoData.description);
    formData.append('category', videoData.category);
    formData.append('tags', JSON.stringify(videoData.tags || []));
    formData.append('visibility', videoData.visibility || 'public');

    const response = await api.post('/videos/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: videoData.onUploadProgress,
    });
    return response.data;
  }

  // Update video
  async updateVideo(videoId, videoData) {
    const response = await api.put(`/videos/${videoId}`, videoData);
    return response.data;
  }

  // Delete video
  async deleteVideo(videoId) {
    const response = await api.delete(`/videos/${videoId}`);
    return response.data;
  }

  // Get video thumbnails
  async getThumbnails(videoId) {
    const response = await api.get(`/videos/${videoId}/thumbnails`);
    return response.data;
  }

  // Get video subtitles
  async getSubtitles(videoId) {
    const response = await api.get(`/videos/${videoId}/subtitles`);
    return response.data;
  }

  // Add subtitles
  async addSubtitles(videoId, subtitleData) {
    const formData = new FormData();
    formData.append('file', subtitleData.file);
    formData.append('language', subtitleData.language);
    formData.append('name', subtitleData.name);

    const response = await api.post(`/videos/${videoId}/subtitles`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }

  // Get video chapters
  async getChapters(videoId) {
    const response = await api.get(`/videos/${videoId}/chapters`);
    return response.data;
  }

  // Add chapter
  async addChapter(videoId, chapter) {
    const response = await api.post(`/videos/${videoId}/chapters`, chapter);
    return response.data;
  }

  // Get video quality options
  async getQualityOptions(videoId) {
    const response = await api.get(`/videos/${videoId}/qualities`);
    return response.data;
  }

  // Get video formats
  async getFormats(videoId) {
    const response = await api.get(`/videos/${videoId}/formats`);
    return response.data;
  }

  // Get video streams
  async getStreams(videoId) {
    const response = await api.get(`/videos/${videoId}/streams`);
    return response.data;
  }

  // Get video statistics
  async getStats(videoId) {
    const response = await api.get(`/videos/${videoId}/stats`);
    return response.data;
  }

  // Get dashboard statistics
  async getDashboardStats() {
    const response = await api.get('/dashboard/stats');
    return response.data;
  }

  // Get recent videos
  async getRecentVideos(limit = 10) {
    const response = await api.get('/videos/recent', { params: { limit } });
    return response.data;
  }

  // Get recent activity
  async getRecentActivity() {
    const response = await api.get('/activity/recent');
    return response.data;
  }
}

export const videoService = new VideoService();
export default videoService;