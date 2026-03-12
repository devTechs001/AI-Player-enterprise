import { createSlice } from '@reduxjs/toolkit';

const musicSlice = createSlice({
  name: 'music',
  initialState: {
    queue: [],
    currentIndex: 0,
    isPlaying: false,
    currentTrack: null,
    volume: 0.8,
    repeatMode: 'none', // none, one, all
    shuffle: false,
    playlists: [],
    likedTracks: [],
    recentlyPlayed: [],
    equalizer: {
      enabled: false,
      bass: 0,
      mid: 0,
      treble: 0,
      custom: null,
    },
    visualization: {
      type: 'bars', // bars, wave, particles, spectrum
      enabled: true,
      sensitivity: 0.5,
    },
    lyrics: {
      enabled: false,
      currentLyrics: null,
      currentTime: 0,
    },
  },
  reducers: {
    setQueue: (state, action) => {
      state.queue = action.payload;
      state.currentIndex = 0;
    },
    setCurrentIndex: (state, action) => {
      state.currentIndex = action.payload;
      state.currentTrack = state.queue[action.payload] || null;
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setCurrentTrack: (state, action) => {
      state.currentTrack = action.payload;
    },
    setVolume: (state, action) => {
      state.volume = action.payload;
    },
    setRepeatMode: (state, action) => {
      state.repeatMode = action.payload;
    },
    toggleShuffle: (state) => {
      state.shuffle = !state.shuffle;
    },
    addToQueue: (state, action) => {
      state.queue.push(action.payload);
    },
    removeFromQueue: (state, action) => {
      state.queue = state.queue.filter((_, index) => index !== action.payload);
    },
    clearQueue: (state) => {
      state.queue = [];
      state.currentIndex = 0;
      state.currentTrack = null;
    },
    addPlaylist: (state, action) => {
      state.playlists.push(action.payload);
    },
    removePlaylist: (state, action) => {
      state.playlists = state.playlists.filter(playlist => playlist.id !== action.payload);
    },
    updatePlaylist: (state, action) => {
      const { id, updates } = action.payload;
      const playlist = state.playlists.find(p => p.id === id);
      if (playlist) {
        Object.assign(playlist, updates);
      }
    },
    likeTrack: (state, action) => {
      if (!state.likedTracks.includes(action.payload)) {
        state.likedTracks.push(action.payload);
      }
    },
    unlikeTrack: (state, action) => {
      state.likedTracks = state.likedTracks.filter(trackId => trackId !== action.payload);
    },
    addToRecentlyPlayed: (state, action) => {
      const track = action.payload;
      // Remove if already exists
      state.recentlyPlayed = state.recentlyPlayed.filter(t => t.id !== track.id);
      // Add to beginning
      state.recentlyPlayed.unshift(track);
      // Limit to 50 most recent
      if (state.recentlyPlayed.length > 50) {
        state.recentlyPlayed = state.recentlyPlayed.slice(0, 50);
      }
    },
    setEqualizer: (state, action) => {
      state.equalizer = { ...state.equalizer, ...action.payload };
    },
    enableEqualizer: (state) => {
      state.equalizer.enabled = true;
    },
    disableEqualizer: (state) => {
      state.equalizer.enabled = false;
    },
    setVisualization: (state, action) => {
      state.visualization = { ...state.visualization, ...action.payload };
    },
    toggleVisualization: (state) => {
      state.visualization.enabled = !state.visualization.enabled;
    },
    setLyrics: (state, action) => {
      state.lyrics.currentLyrics = action.payload;
      state.lyrics.enabled = !!action.payload;
    },
    setLyricsTime: (state, action) => {
      state.lyrics.currentTime = action.payload;
    },
    toggleLyrics: (state) => {
      state.lyrics.enabled = !state.lyrics.enabled;
    },
    nextTrack: (state) => {
      if (state.repeatMode === 'one') {
        // Stay on current track
        return;
      }
      
      if (state.shuffle) {
        // Pick random track
        state.currentIndex = Math.floor(Math.random() * state.queue.length);
      } else if (state.currentIndex < state.queue.length - 1) {
        // Go to next track
        state.currentIndex++;
      } else if (state.repeatMode === 'all') {
        // Loop back to start
        state.currentIndex = 0;
      } else {
        // Stop playing
        state.isPlaying = false;
        return;
      }
      
      state.currentTrack = state.queue[state.currentIndex] || null;
    },
    prevTrack: (state) => {
      if (state.currentIndex > 0) {
        state.currentIndex--;
      } else if (state.repeatMode === 'all' && state.queue.length > 0) {
        state.currentIndex = state.queue.length - 1;
      }
      
      state.currentTrack = state.queue[state.currentIndex] || null;
    },
    resetMusic: (state) => {
      state.queue = [];
      state.currentIndex = 0;
      state.isPlaying = false;
      state.currentTrack = null;
      state.volume = 0.8;
      state.repeatMode = 'none';
      state.shuffle = false;
      state.equalizer = {
        enabled: false,
        bass: 0,
        mid: 0,
        treble: 0,
        custom: null,
      };
      state.visualization = {
        type: 'bars',
        enabled: true,
        sensitivity: 0.5,
      };
      state.lyrics = {
        enabled: false,
        currentLyrics: null,
        currentTime: 0,
      };
    },
  },
});

export const { 
  setQueue,
  setCurrentIndex,
  setIsPlaying,
  setCurrentTrack,
  setVolume,
  setRepeatMode,
  toggleShuffle,
  addToQueue,
  removeFromQueue,
  clearQueue,
  addPlaylist,
  removePlaylist,
  updatePlaylist,
  likeTrack,
  unlikeTrack,
  addToRecentlyPlayed,
  setEqualizer,
  enableEqualizer,
  disableEqualizer,
  setVisualization,
  toggleVisualization,
  setLyrics,
  setLyricsTime,
  toggleLyrics,
  nextTrack,
  prevTrack,
  resetMusic
} = musicSlice.actions;

export default musicSlice.reducer;