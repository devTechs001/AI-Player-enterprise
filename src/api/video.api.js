import api from '@services/api.service';

// Video API endpoints
export const videoAPI = {
  // Get videos
  getVideos: (params = {}) => api.get('/videos', { params }),
  getVideo: (id) => api.get(`/videos/${id}`),
  
  // Upload video
  uploadVideo: (formData) => api.post('/videos/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  
  // Update video
  updateVideo: (id, data) => api.put(`/videos/${id}`, data),
  
  // Delete video
  deleteVideo: (id) => api.delete(`/videos/${id}`),
  
  // Video metadata
  getVideoMetadata: (id) => api.get(`/videos/${id}/metadata`),
  updateVideoMetadata: (id, metadata) => api.put(`/videos/${id}/metadata`, metadata),
  
  // Video processing
  processVideo: (id, options) => api.post(`/videos/${id}/process`, options),
  getProcessingStatus: (id) => api.get(`/videos/${id}/processing-status`),
  
  // Video analytics
  getVideoAnalytics: (id) => api.get(`/videos/${id}/analytics`),
  getVideoViews: (id) => api.get(`/videos/${id}/views`),
  
  // Video comments
  getVideoComments: (id, params = {}) => api.get(`/videos/${id}/comments`, { params }),
  addVideoComment: (id, comment) => api.post(`/videos/${id}/comments`, comment),
  updateVideoComment: (videoId, commentId, comment) => api.put(`/videos/${id}/comments/${commentId}`, comment),
  deleteVideoComment: (videoId, commentId) => api.delete(`/videos/${id}/comments/${commentId}`),
  
  // Video likes/dislikes
  likeVideo: (id) => api.post(`/videos/${id}/like`),
  unlikeVideo: (id) => api.delete(`/videos/${id}/like`),
  getVideoLikes: (id) => api.get(`/videos/${id}/likes`),
  
  // Video favorites
  favoriteVideo: (id) => api.post(`/videos/${id}/favorite`),
  unfavoriteVideo: (id) => api.delete(`/videos/${id}/favorite`),
  getFavoriteVideos: () => api.get('/videos/favorites'),
  
  // Video history
  getVideoHistory: (params = {}) => api.get('/videos/history', { params }),
  addToHistory: (id, progress) => api.post(`/videos/${id}/history`, { progress }),
  
  // Video playlists
  getVideoPlaylists: () => api.get('/videos/playlists'),
  createPlaylist: (data) => api.post('/videos/playlists', data),
  addToPlaylist: (playlistId, videoId) => api.post(`/videos/playlists/${playlistId}/add`, { videoId }),
  removeFromPlaylist: (playlistId, videoId) => api.delete(`/videos/playlists/${playlistId}/${videoId}`),
  
  // Video search
  searchVideos: (query, filters = {}) => api.get('/videos/search', { params: { q: query, ...filters } }),
  
  // Video recommendations
  getRecommendations: (videoId) => api.get(`/videos/${id}/recommendations`),
  getTrendingVideos: () => api.get('/videos/trending'),
  
  // Video categories
  getCategories: () => api.get('/videos/categories'),
  getCategoryVideos: (categoryId, params = {}) => api.get(`/videos/categories/${categoryId}`, { params }),
  
  // Video tags
  getTags: () => api.get('/videos/tags'),
  getTagVideos: (tag, params = {}) => api.get(`/videos/tags/${tag}`, { params }),
  
  // Video subtitles
  getVideoSubtitles: (id) => api.get(`/videos/${id}/subtitles`),
  uploadSubtitle: (id, formData) => api.post(`/videos/${id}/subtitles`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteSubtitle: (id, subtitleId) => api.delete(`/videos/${id}/subtitles/${subtitleId}`),
  
  // Video thumbnails
  getVideoThumbnails: (id) => api.get(`/videos/${id}/thumbnails`),
  generateThumbnail: (id, timestamp) => api.post(`/videos/${id}/thumbnails`, { timestamp }),
  uploadThumbnail: (id, formData) => api.post(`/videos/${id}/thumbnails/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  
  // Video sharing
  getShareLink: (id) => api.get(`/videos/${id}/share`),
  createShareLink: (id, options) => api.post(`/videos/${id}/share`, options),
  deleteShareLink: (id, shareId) => api.delete(`/videos/${id}/share/${shareId}`),
  
  // Video reporting
  reportVideo: (id, reason) => api.post(`/videos/${id}/report`, { reason }),
  getVideoReports: (params = {}) => api.get('/videos/reports', { params }),
  
  // Video moderation
  approveVideo: (id) => api.post(`/videos/${id}/approve`),
  rejectVideo: (id, reason) => api.post(`/videos/${id}/reject`, { reason }),
};

export default videoAPI;
