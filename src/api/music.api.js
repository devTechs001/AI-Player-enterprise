import api from '@services/api.service';

// Music API endpoints
export const musicAPI = {
  // Tracks
  getTracks: (params = {}) => api.get('/music/tracks', { params }),
  getTrack: (trackId) => api.get(`/music/tracks/${trackId}`),
  uploadTrack: (formData) => api.post('/music/tracks/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  updateTrack: (trackId, data) => api.put(`/music/tracks/${trackId}`, data),
  deleteTrack: (trackId) => api.delete(`/music/tracks/${trackId}`),
  
  // Albums
  getAlbums: (params = {}) => api.get('/music/albums', { params }),
  getAlbum: (albumId) => api.get(`/music/albums/${albumId}`),
  createAlbum: (albumData) => api.post('/music/albums', albumData),
  updateAlbum: (albumId, data) => api.put(`/music/albums/${albumId}`, data),
  deleteAlbum: (albumId) => api.delete(`/music/albums/${albumId}`),
  getAlbumTracks: (albumId) => api.get(`/music/albums/${albumId}/tracks`),
  addTrackToAlbum: (albumId, trackId) => api.post(`/music/albums/${albumId}/tracks`, { trackId }),
  removeTrackFromAlbum: (albumId, trackId) => api.delete(`/music/albums/${albumId}/tracks/${trackId}`),
  
  // Artists
  getArtists: (params = {}) => api.get('/music/artists', { params }),
  getArtist: (artistId) => api.get(`/music/artists/${artistId}`),
  createArtist: (artistData) => api.post('/music/artists', artistData),
  updateArtist: (artistId, data) => api.put(`/music/artists/${artistId}`, data),
  deleteArtist: (artistId) => api.delete(`/music/artists/${artistId}`),
  getArtistTracks: (artistId) => api.get(`/music/artists/${artistId}/tracks`),
  getArtistAlbums: (artistId) => api.get(`/music/artists/${artistId}/albums`),
  
  // Playlists
  getPlaylists: (params = {}) => api.get('/music/playlists', { params }),
  getPlaylist: (playlistId) => api.get(`/music/playlists/${playlistId}`),
  createPlaylist: (playlistData) => api.post('/music/playlists', playlistData),
  updatePlaylist: (playlistId, data) => api.put(`/music/playlists/${playlistId}`, data),
  deletePlaylist: (playlistId) => api.delete(`/music/playlists/${playlistId}`),
  getPlaylistTracks: (playlistId) => api.get(`/music/playlists/${playlistId}/tracks`),
  addTrackToPlaylist: (playlistId, trackId) => api.post(`/music/playlists/${playlistId}/tracks`, { trackId }),
  removeTrackFromPlaylist: (playlistId, trackId) => api.delete(`/music/playlists/${playlistId}/tracks/${trackId}`),
  reorderPlaylistTracks: (playlistId, trackIds) => api.put(`/music/playlists/${playlistId}/tracks/reorder`, { trackIds }),
  
  // Genres
  getGenres: () => api.get('/music/genres'),
  getGenre: (genreId) => api.get(`/music/genres/${genreId}`),
  getGenreTracks: (genreId, params = {}) => api.get(`/music/genres/${genreId}/tracks`, { params }),
  getGenreAlbums: (genreId, params = {}) => api.get(`/music/genres/${genreId}/albums`, { params }),
  
  // Search
  searchMusic: (query, filters = {}) => api.get('/music/search', { params: { q: query, ...filters } }),
  searchTracks: (query, params = {}) => api.get('/music/search/tracks', { params: { q: query, ...params } }),
  searchAlbums: (query, params = {}) => api.get('/music/search/albums', { params: { q: query, ...params } }),
  searchArtists: (query, params = {}) => api.get('/music/search/artists', { params: { q: query, ...params } }),
  searchPlaylists: (query, params = {}) => api.get('/music/search/playlists', { params: { q: query, ...params } }),
  
  // Recommendations
  getRecommendations: (params = {}) => api.get('/music/recommendations', { params }),
  getTrackRecommendations: (trackId) => api.get(`/music/tracks/${trackId}/recommendations`),
  getArtistRecommendations: (artistId) => api.get(`/music/artists/${artistId}/recommendations`),
  getGenreRecommendations: (genreId) => api.get(`/music/genres/${genreId}/recommendations`),
  
  // Radio
  getRadioStations: () => api.get('/music/radio/stations'),
  createRadioStation: (stationData) => api.post('/music/radio/stations', stationData),
  getRadioStation: (stationId) => api.get(`/music/radio/stations/${stationId}`),
  updateRadioStation: (stationId, data) => api.put(`/music/radio/stations/${stationId}`, data),
  deleteRadioStation: (stationId) => api.delete(`/music/radio/stations/${stationId}`),
  startRadio: (seedData) => api.post('/music/radio/start', seedData),
  getRadioQueue: (radioId) => api.get(`/music/radio/${radioId}/queue`),
  
  // Library
  getUserLibrary: (params = {}) => api.get('/music/library', { params }),
  addToLibrary: (type, id) => api.post(`/music/library/${type}/${id}`),
  removeFromLibrary: (type, id) => api.delete(`/music/library/${type}/${id}`),
  getLibraryTracks: (params = {}) => api.get('/music/library/tracks', { params }),
  getLibraryAlbums: (params = {}) => api.get('/music/library/albums', { params }),
  getLibraryArtists: (params = {}) => api.get('/music/library/artists', { params }),
  
  // Favorites
  getFavoriteTracks: () => api.get('/music/favorites/tracks'),
  getFavoriteAlbums: () => api.get('/music/favorites/albums'),
  getFavoriteArtists: () => api.get('/music/favorites/artists'),
  addToFavorites: (type, id) => api.post(`/music/favorites/${type}/${id}`),
  removeFromFavorites: (type, id) => api.delete(`/music/favorites/${type}/${id}`),
  
  // History
  getListeningHistory: (params = {}) => api.get('/music/history', { params }),
  addToHistory: (trackId, progress) => api.post(`/music/tracks/${trackId}/history`, { progress }),
  clearHistory: () => api.delete('/music/history'),
  
  // Now Playing
  getNowPlaying: () => api.get('/music/now-playing'),
  updateNowPlaying: (trackData) => api.put('/music/now-playing', trackData),
  
  // Queue
  getQueue: () => api.get('/music/queue'),
  addToQueue: (trackIds) => api.post('/music/queue', { trackIds }),
  removeFromQueue: (queueItemId) => api.delete(`/music/queue/${queueItemId}`),
  clearQueue: () => api.delete('/music/queue'),
  reorderQueue: (queueItemIds) => api.put('/music/queue/reorder', { queueItemIds }),
  
  // Lyrics
  getTrackLyrics: (trackId) => api.get(`/music/tracks/${trackId}/lyrics`),
  updateTrackLyrics: (trackId, lyricsData) => api.put(`/music/tracks/${trackId}/lyrics`, lyricsData),
  searchLyrics: (query) => api.get('/music/search/lyrics', { params: { q: query } }),
  
  // Audio analysis
  getTrackAnalysis: (trackId) => api.get(`/music/tracks/${trackId}/analysis`),
  analyzeTrack: (trackId) => api.post(`/music/tracks/${trackId}/analyze`),
  
  // Audio features
  getAudioFeatures: (trackId) => api.get(`/music/tracks/${trackId}/features`),
  extractAudioFeatures: (trackId) => api.post(`/music/tracks/${trackId}/features/extract`),
  
  // Similar tracks
  getSimilarTracks: (trackId) => api.get(`/music/tracks/${trackId}/similar`),
  getSimilarArtists: (artistId) => api.get(`/music/artists/${artistId}/similar`),
  
  // Charts and trending
  getCharts: (params = {}) => api.get('/music/charts', { params }),
  getTrendingTracks: () => api.get('/music/trending/tracks'),
  getTrendingAlbums: () => api.get('/music/trending/albums'),
  getTrendingArtists: () => api.get('/music/trending/artists'),
  
  // Music discovery
  discoverNew: (params = {}) => api.get('/music/discover', { params }),
  getDailyMix: () => api.get('/music/discover/daily-mix'),
  getReleaseRadar: () => api.get('/music/discover/release-radar'),
  
  // Music stats
  getUserMusicStats: (period) => api.get(`/music/stats/user/${period}`),
  getTrackStats: (trackId) => api.get(`/music/tracks/${trackId}/stats`),
  getArtistStats: (artistId) => api.get(`/music/artists/${artistId}/stats`),
  
  // Music sharing
  shareTrack: (trackId, options) => api.post(`/music/tracks/${trackId}/share`, options),
  shareAlbum: (albumId, options) => api.post(`/music/albums/${albumId}/share`, options),
  sharePlaylist: (playlistId, options) => api.post(`/music/playlists/${playlistId}/share`, options),
  
  // Music tags
  getTags: () => api.get('/music/tags'),
  getTagTracks: (tagId) => api.get(`/music/tags/${tagId}/tracks`),
  addTagToTrack: (trackId, tagId) => api.post(`/music/tracks/${trackId}/tags/${tagId}`),
  removeTagFromTrack: (trackId, tagId) => api.delete(`/music/tracks/${trackId}/tags/${tagId}`),
  
  // Music moods
  getMoods: () => api.get('/music/moods'),
  getMoodTracks: (moodId) => api.get(`/music/moods/${moodId}/tracks`),
  setTrackMood: (trackId, moodId) => api.put(`/music/tracks/${trackId}/mood`, { moodId }),
  
  // Crossfade and transitions
  getCrossfadeSettings: () => api.get('/music/crossfade/settings'),
  updateCrossfadeSettings: (settings) => api.put('/music/crossfade/settings', settings),
  
  // Equalizer
  getEqualizerPresets: () => api.get('/music/equalizer/presets'),
  getEqualizerSettings: () => api.get('/music/equalizer/settings'),
  updateEqualizerSettings: (settings) => api.put('/music/equalizer/settings', settings),
  createEqualizerPreset: (presetData) => api.post('/music/equalizer/presets', presetData),
  deleteEqualizerPreset: (presetId) => api.delete(`/music/equalizer/presets/${presetId}`),
};

export default musicAPI;
