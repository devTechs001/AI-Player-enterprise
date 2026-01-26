import api from './api.service';

class MusicService {
  // Get user's music library
  async getLibrary(options = {}) {
    const response = await api.get('/music/library', { params: options });
    return response.data;
  }

  // Get user's playlists
  async getPlaylists() {
    const response = await api.get('/music/playlists');
    return response.data;
  }

  // Create playlist
  async createPlaylist(playlistData) {
    const response = await api.post('/music/playlists', playlistData);
    return response.data;
  }

  // Update playlist
  async updatePlaylist(playlistId, playlistData) {
    const response = await api.put(`/music/playlists/${playlistId}`, playlistData);
    return response.data;
  }

  // Delete playlist
  async deletePlaylist(playlistId) {
    const response = await api.delete(`/music/playlists/${playlistId}`);
    return response.data;
  }

  // Add track to playlist
  async addTrackToPlaylist(playlistId, trackId) {
    const response = await api.post(`/music/playlists/${playlistId}/tracks`, { trackId });
    return response.data;
  }

  // Remove track from playlist
  async removeTrackFromPlaylist(playlistId, trackId) {
    const response = await api.delete(`/music/playlists/${playlistId}/tracks/${trackId}`);
    return response.data;
  }

  // Get playlist tracks
  async getPlaylistTracks(playlistId) {
    const response = await api.get(`/music/playlists/${playlistId}/tracks`);
    return response.data;
  }

  // Get recently played tracks
  async getRecentlyPlayed(limit = 10) {
    const response = await api.get('/music/recently-played', { params: { limit } });
    return response.data;
  }

  // Get favorite tracks
  async getFavorites() {
    const response = await api.get('/music/favorites');
    return response.data;
  }

  // Add track to favorites
  async addToFavorites(trackId) {
    const response = await api.post(`/music/favorites/${trackId}`);
    return response.data;
  }

  // Remove track from favorites
  async removeFromFavorites(trackId) {
    const response = await api.delete(`/music/favorites/${trackId}`);
    return response.data;
  }

  // Get track recommendations
  async getRecommendations(trackId) {
    const response = await api.get(`/music/recommendations/${trackId}`);
    return response.data;
  }

  // Get artist info
  async getArtist(artistId) {
    const response = await api.get(`/music/artists/${artistId}`);
    return response.data;
  }

  // Get artist tracks
  async getArtistTracks(artistId) {
    const response = await api.get(`/music/artists/${artistId}/tracks`);
    return response.data;
  }

  // Get album info
  async getAlbum(albumId) {
    const response = await api.get(`/music/albums/${albumId}`);
    return response.data;
  }

  // Get album tracks
  async getAlbumTracks(albumId) {
    const response = await api.get(`/music/albums/${albumId}/tracks`);
    return response.data;
  }

  // Search music
  async search(query, options = {}) {
    const response = await api.get('/music/search', {
      params: { q: query, ...options }
    });
    return response.data;
  }

  // Get music genres
  async getGenres() {
    const response = await api.get('/music/genres');
    return response.data;
  }

  // Get music moods
  async getMoods() {
    const response = await api.get('/music/moods');
    return response.data;
  }

  // Get music charts
  async getCharts(options = {}) {
    const response = await api.get('/music/charts', { params: options });
    return response.data;
  }

  // Get trending music
  async getTrending(options = {}) {
    const response = await api.get('/music/trending', { params: options });
    return response.data;
  }

  // Get new releases
  async getNewReleases(options = {}) {
    const response = await api.get('/music/new-releases', { params: options });
    return response.data;
  }

  // Get radio stations
  async getRadioStations() {
    const response = await api.get('/music/radio');
    return response.data;
  }

  // Get radio station tracks
  async getRadioStationTracks(stationId) {
    const response = await api.get(`/music/radio/${stationId}/tracks`);
    return response.data;
  }

  // Get lyrics for track
  async getLyrics(trackId) {
    const response = await api.get(`/music/tracks/${trackId}/lyrics`);
    return response.data;
  }

  // Upload music
  async uploadMusic(musicData) {
    const formData = new FormData();
    formData.append('file', musicData.file);
    formData.append('title', musicData.title);
    formData.append('artist', musicData.artist);
    formData.append('album', musicData.album);
    formData.append('genre', musicData.genre);
    formData.append('year', musicData.year);
    formData.append('artwork', musicData.artwork);

    const response = await api.post('/music/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: musicData.onUploadProgress,
    });
    return response.data;
  }

  // Get music statistics
  async getStats() {
    const response = await api.get('/music/stats');
    return response.data;
  }

  // Get user's listening history
  async getListeningHistory(options = {}) {
    const response = await api.get('/music/history', { params: options });
    return response.data;
  }

  // Save listening progress
  async saveListeningProgress(trackId, currentTime, duration) {
    const response = await api.post(`/music/tracks/${trackId}/progress`, {
      currentTime,
      duration,
    });
    return response.data;
  }

  // Get track info
  async getTrackInfo(trackId) {
    const response = await api.get(`/music/tracks/${trackId}`);
    return response.data;
  }

  // Get track stream
  async getTrackStream(trackId, options = {}) {
    const response = await api.get(`/music/tracks/${trackId}/stream`, {
      params: options,
    });
    return response.data;
  }

  // Get track waveform
  async getWaveform(trackId) {
    const response = await api.get(`/music/tracks/${trackId}/waveform`);
    return response.data;
  }

  // Get track analysis
  async getTrackAnalysis(trackId) {
    const response = await api.get(`/music/tracks/${trackId}/analysis`);
    return response.data;
  }

  // Get music categories
  async getCategories() {
    const response = await api.get('/music/categories');
    return response.data;
  }

  // Get category tracks
  async getCategoryTracks(categoryId, options = {}) {
    const response = await api.get(`/music/categories/${categoryId}/tracks`, {
      params: options,
    });
    return response.data;
  }

  // Get mood tracks
  async getMoodTracks(moodId, options = {}) {
    const response = await api.get(`/music/moods/${moodId}/tracks`, {
      params: options,
    });
    return response.data;
  }

  // Get similar tracks
  async getSimilarTracks(trackId) {
    const response = await api.get(`/music/tracks/${trackId}/similar`);
    return response.data;
  }

  // Get top artists
  async getTopArtists(options = {}) {
    const response = await api.get('/music/artists/top', { params: options });
    return response.data;
  }

  // Get top albums
  async getTopAlbums(options = {}) {
    const response = await api.get('/music/albums/top', { params: options });
    return response.data;
  }

  // Get user's music preferences
  async getPreferences() {
    const response = await api.get('/music/preferences');
    return response.data;
  }

  // Update user's music preferences
  async updatePreferences(preferences) {
    const response = await api.put('/music/preferences', preferences);
    return response.data;
  }

  // Get equalizer presets
  async getEqualizerPresets() {
    const response = await api.get('/music/equalizer-presets');
    return response.data;
  }

  // Get visualization options
  async getVisualizationOptions() {
    const response = await api.get('/music/visualization-options');
    return response.data;
  }

  // Report track
  async reportTrack(trackId, reason) {
    const response = await api.post(`/music/tracks/${trackId}/report`, { reason });
    return response.data;
  }

  // Share track
  async shareTrack(trackId, options = {}) {
    const response = await api.post(`/music/tracks/${trackId}/share`, options);
    return response.data;
  }

  // Get shared track
  async getSharedTrack(shareId) {
    const response = await api.get(`/music/shared/${shareId}`);
    return response.data;
  }

  // Get music recommendations for user
  async getUserRecommendations(options = {}) {
    const response = await api.get('/music/user-recommendations', { params: options });
    return response.data;
  }

  // Get music discovery
  async getDiscovery(options = {}) {
    const response = await api.get('/music/discovery', { params: options });
    return response.data;
  }

  // Get music podcasts
  async getPodcasts(options = {}) {
    const response = await api.get('/music/podcasts', { params: options });
    return response.data;
  }

  // Get podcast episodes
  async getPodcastEpisodes(podcastId, options = {}) {
    const response = await api.get(`/music/podcasts/${podcastId}/episodes`, { params: options });
    return response.data;
  }

  // Get music videos
  async getMusicVideos(options = {}) {
    const response = await api.get('/music/videos', { params: options });
    return response.data;
  }

  // Get track comments
  async getTrackComments(trackId, options = {}) {
    const response = await api.get(`/music/tracks/${trackId}/comments`, { params: options });
    return response.data;
  }

  // Add comment to track
  async addTrackComment(trackId, comment) {
    const response = await api.post(`/music/tracks/${trackId}/comments`, { comment });
    return response.data;
  }

  // Like track
  async likeTrack(trackId) {
    const response = await api.post(`/music/tracks/${trackId}/like`);
    return response.data;
  }

  // Unlike track
  async unlikeTrack(trackId) {
    const response = await api.delete(`/music/tracks/${trackId}/like`);
    return response.data;
  }

  // Get user's liked tracks
  async getUserLikes(options = {}) {
    const response = await api.get('/music/user-likes', { params: options });
    return response.data;
  }
}

export const musicService = new MusicService();
export default musicService;