import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { videoService } from '@services/video.service';

const initialState = {
  currentMedia: null,
  mediaType: null,
  isPlaying: false,
  isPaused: false,
  isBuffering: false,
  isEnded: false,
  isMuted: false,
  isFullscreen: false,
  isPiP: false,
  isMinimized: false,
  isTheaterMode: false,
  currentTime: 0,
  duration: 0,
  buffered: 0,
  progress: 0,
  volume: 1,
  previousVolume: 1,
  playbackRate: 1,
  quality: 'auto',
  availableQualities: [],
  subtitles: [],
  activeSubtitle: null,
  chapters: [],
  currentChapter: null,
  playlist: [],
  currentIndex: 0,
  shuffle: false,
  repeat: 'none',
  aiAnalysis: null,
  recommendations: [],
  watchHistory: [],
  error: null,
  loading: false,
};

// Async Thunks
export const loadMedia = createAsyncThunk(
  'player/loadMedia',
  async ({ mediaId, type }, { rejectWithValue }) => {
    try {
      const mediaInfo = await videoService.getMediaInfo(mediaId);
      return { ...mediaInfo, type };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getRecommendations = createAsyncThunk(
  'player/getRecommendations',
  async (mediaId, { rejectWithValue }) => {
    try {
      const recommendations = await videoService.getRecommendations(mediaId);
      return recommendations;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const saveWatchProgress = createAsyncThunk(
  'player/saveWatchProgress',
  async ({ mediaId, currentTime, duration }, { rejectWithValue }) => {
    try {
      await videoService.saveProgress(mediaId, currentTime, duration);
      return { mediaId, currentTime, duration };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setMedia: (state, action) => {
      state.currentMedia = action.payload.media;
      state.mediaType = action.payload.type;
      state.currentTime = 0;
      state.duration = 0;
      state.progress = 0;
      state.isEnded = false;
      state.error = null;
    },
    play: (state) => {
      state.isPlaying = true;
      state.isPaused = false;
      state.isEnded = false;
    },
    pause: (state) => {
      state.isPlaying = false;
      state.isPaused = true;
    },
    stop: (state) => {
      state.isPlaying = false;
      state.isPaused = false;
      state.currentTime = 0;
      state.progress = 0;
    },
    setTime: (state, action) => {
      state.currentTime = action.payload;
      state.progress = (action.payload / state.duration) * 100;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    setBuffered: (state, action) => {
      state.buffered = action.payload;
    },
    setVolume: (state, action) => {
      state.volume = Math.max(0, Math.min(1, action.payload));
      state.isMuted = state.volume === 0;
    },
    toggleMute: (state) => {
      if (state.isMuted) {
        state.volume = state.previousVolume;
        state.isMuted = false;
      } else {
        state.previousVolume = state.volume;
        state.volume = 0;
        state.isMuted = true;
      }
    },
    setPlaybackRate: (state, action) => {
      state.playbackRate = action.payload;
    },
    setQuality: (state, action) => {
      state.quality = action.payload;
    },
    setAvailableQualities: (state, action) => {
      state.availableQualities = action.payload;
    },
    setSubtitles: (state, action) => {
      state.subtitles = action.payload;
    },
    setActiveSubtitle: (state, action) => {
      state.activeSubtitle = action.payload;
    },
    setChapters: (state, action) => {
      state.chapters = action.payload;
    },
    setCurrentChapter: (state, action) => {
      state.currentChapter = action.payload;
    },
    setPlaylist: (state, action) => {
      state.playlist = action.payload;
      state.currentIndex = 0;
    },
    setCurrentIndex: (state, action) => {
      state.currentIndex = action.payload;
    },
    nextTrack: (state) => {
      if (state.shuffle) {
        state.currentIndex = Math.floor(Math.random() * state.playlist.length);
      } else {
        state.currentIndex = (state.currentIndex + 1) % state.playlist.length;
      }
      state.currentMedia = state.playlist[state.currentIndex];
    },
    previousTrack: (state) => {
      state.currentIndex =
        state.currentIndex === 0
          ? state.playlist.length - 1
          : state.currentIndex - 1;
      state.currentMedia = state.playlist[state.currentIndex];
    },
    toggleShuffle: (state) => {
      state.shuffle = !state.shuffle;
    },
    setRepeat: (state, action) => {
      state.repeat = action.payload;
    },
    toggleFullscreen: (state) => {
      state.isFullscreen = !state.isFullscreen;
    },
    togglePiP: (state) => {
      state.isPiP = !state.isPiP;
    },
    toggleMinimize: (state) => {
      state.isMinimized = !state.isMinimized;
    },
    toggleTheater: (state) => {
      state.isTheaterMode = !state.isTheaterMode;
    },
    setBuffering: (state, action) => {
      state.isBuffering = action.payload;
    },
    setEnded: (state) => {
      state.isEnded = true;
      state.isPlaying = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isPlaying = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadMedia.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadMedia.fulfilled, (state, action) => {
        state.loading = false;
        state.currentMedia = action.payload;
        state.mediaType = action.payload.type;
        state.availableQualities = action.payload.qualities || [];
        state.subtitles = action.payload.subtitles || [];
        state.chapters = action.payload.chapters || [];
        state.aiAnalysis = action.payload.aiAnalysis;
      })
      .addCase(loadMedia.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getRecommendations.fulfilled, (state, action) => {
        state.recommendations = action.payload;
      });
  },
});

export const {
  setMedia,
  play,
  pause,
  stop,
  setTime,
  setDuration,
  setBuffered,
  setVolume,
  toggleMute,
  setPlaybackRate,
  setQuality,
  setAvailableQualities,
  setSubtitles,
  setActiveSubtitle,
  setChapters,
  setCurrentChapter,
  setPlaylist,
  setCurrentIndex,
  nextTrack,
  previousTrack,
  toggleShuffle,
  setRepeat,
  toggleFullscreen,
  togglePiP,
  toggleMinimize,
  toggleTheater,
  setBuffering,
  setEnded,
  setError,
  clearError,
  reset,
} = playerSlice.actions;

export default playerSlice.reducer;