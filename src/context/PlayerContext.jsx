import { createContext, useReducer, useCallback, useRef } from 'react';
import { mediaService } from '@services/media.service';

export const PlayerContext = createContext(null);

const initialState = {
  // Current Media
  currentMedia: null,
  mediaType: null, // 'video' | 'audio'
  
  // Playback State
  isPlaying: false,
  isPaused: false,
  isBuffering: false,
  isEnded: false,
  isMuted: false,
  isFullscreen: false,
  isPiP: false,
  isMinimized: false,
  isTheaterMode: false,
  
  // Time & Progress
  currentTime: 0,
  duration: 0,
  buffered: 0,
  progress: 0,
  
  // Volume
  volume: 1,
  previousVolume: 1,
  
  // Playback
  playbackRate: 1,
  quality: 'auto',
  availableQualities: [],
  
  // Subtitles
  subtitles: [],
  activeSubtitle: null,
  
  // Chapters
  chapters: [],
  currentChapter: null,
  
  // Playlist
  playlist: [],
  currentIndex: 0,
  shuffle: false,
  repeat: 'none', // 'none' | 'one' | 'all'
  
  // AI Features
  aiAnalysis: null,
  recommendations: [],
  
  // Errors
  error: null,
};

const playerReducer = (state, action) => {
  switch (action.type) {
    case 'SET_MEDIA':
      return {
        ...state,
        currentMedia: action.payload.media,
        mediaType: action.payload.type,
        duration: 0,
        currentTime: 0,
        progress: 0,
        isEnded: false,
        error: null,
      };
    case 'PLAY':
      return { ...state, isPlaying: true, isPaused: false, isEnded: false };
    case 'PAUSE':
      return { ...state, isPlaying: false, isPaused: true };
    case 'STOP':
      return { ...state, isPlaying: false, isPaused: false, currentTime: 0, progress: 0 };
    case 'SET_TIME':
      return { ...state, currentTime: action.payload };
    case 'SET_DURATION':
      return { ...state, duration: action.payload };
    case 'SET_PROGRESS':
      return { ...state, progress: action.payload };
    case 'SET_BUFFERED':
      return { ...state, buffered: action.payload };
    case 'SET_VOLUME':
      return { ...state, volume: action.payload, isMuted: action.payload === 0 };
    case 'TOGGLE_MUTE':
      return {
        ...state,
        isMuted: !state.isMuted,
        previousVolume: state.isMuted ? state.previousVolume : state.volume,
        volume: state.isMuted ? state.previousVolume : 0,
      };
    case 'SET_PLAYBACK_RATE':
      return { ...state, playbackRate: action.payload };
    case 'SET_QUALITY':
      return { ...state, quality: action.payload };
    case 'SET_AVAILABLE_QUALITIES':
      return { ...state, availableQualities: action.payload };
    case 'SET_SUBTITLES':
      return { ...state, subtitles: action.payload };
    case 'SET_ACTIVE_SUBTITLE':
      return { ...state, activeSubtitle: action.payload };
    case 'SET_CHAPTERS':
      return { ...state, chapters: action.payload };
    case 'SET_CURRENT_CHAPTER':
      return { ...state, currentChapter: action.payload };
    case 'SET_PLAYLIST':
      return { ...state, playlist: action.payload, currentIndex: 0 };
    case 'SET_CURRENT_INDEX':
      return { ...state, currentIndex: action.payload };
    case 'TOGGLE_SHUFFLE':
      return { ...state, shuffle: !state.shuffle };
    case 'SET_REPEAT':
      return { ...state, repeat: action.payload };
    case 'TOGGLE_FULLSCREEN':
      return { ...state, isFullscreen: !state.isFullscreen };
    case 'TOGGLE_PIP':
      return { ...state, isPiP: !state.isPiP };
    case 'TOGGLE_MINIMIZE':
      return { ...state, isMinimized: !state.isMinimized };
    case 'TOGGLE_THEATER':
      return { ...state, isTheaterMode: !state.isTheaterMode };
    case 'SET_BUFFERING':
      return { ...state, isBuffering: action.payload };
    case 'SET_ENDED':
      return { ...state, isEnded: true, isPlaying: false };
    case 'SET_AI_ANALYSIS':
      return { ...state, aiAnalysis: action.payload };
    case 'SET_RECOMMENDATIONS':
      return { ...state, recommendations: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isPlaying: false };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

export const PlayerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(playerReducer, initialState);
  const playerRef = useRef(null);
  const audioRef = useRef(null);

  // Load Media
  const loadMedia = useCallback(async (media, type = 'video') => {
    try {
      dispatch({ type: 'SET_MEDIA', payload: { media, type } });
      
      // Get media info
      const mediaInfo = await mediaService.getMediaInfo(media.id);
      dispatch({ type: 'SET_AVAILABLE_QUALITIES', payload: mediaInfo.qualities });
      dispatch({ type: 'SET_SUBTITLES', payload: mediaInfo.subtitles });
      dispatch({ type: 'SET_CHAPTERS', payload: mediaInfo.chapters });
      
      // Get AI analysis
      if (mediaInfo.aiAnalysis) {
        dispatch({ type: 'SET_AI_ANALYSIS', payload: mediaInfo.aiAnalysis });
      }
      
      // Get recommendations
      const recommendations = await mediaService.getRecommendations(media.id);
      dispatch({ type: 'SET_RECOMMENDATIONS', payload: recommendations });
      
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  }, []);

  // Playback Controls
  const play = useCallback(() => {
    dispatch({ type: 'PLAY' });
    if (state.mediaType === 'video' && playerRef.current) {
      playerRef.current.play();
    } else if (state.mediaType === 'audio' && audioRef.current) {
      audioRef.current.play();
    }
  }, [state.mediaType]);

  const pause = useCallback(() => {
    dispatch({ type: 'PAUSE' });
    if (state.mediaType === 'video' && playerRef.current) {
      playerRef.current.pause();
    } else if (state.mediaType === 'audio' && audioRef.current) {
      audioRef.current.pause();
    }
  }, [state.mediaType]);

  const togglePlay = useCallback(() => {
    if (state.isPlaying) {
      pause();
    } else {
      play();
    }
  }, [state.isPlaying, play, pause]);

  const stop = useCallback(() => {
    dispatch({ type: 'STOP' });
    if (playerRef.current) {
      playerRef.current.pause();
      playerRef.current.currentTime = 0;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  const seek = useCallback((time) => {
    dispatch({ type: 'SET_TIME', payload: time });
    if (state.mediaType === 'video' && playerRef.current) {
      playerRef.current.currentTime = time;
    } else if (state.mediaType === 'audio' && audioRef.current) {
      audioRef.current.currentTime = time;
    }
  }, [state.mediaType]);

  const seekRelative = useCallback((delta) => {
    seek(Math.max(0, Math.min(state.duration, state.currentTime + delta)));
  }, [state.currentTime, state.duration, seek]);

  const setVolume = useCallback((volume) => {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    dispatch({ type: 'SET_VOLUME', payload: clampedVolume });
    if (playerRef.current) {
      playerRef.current.volume = clampedVolume;
    }
    if (audioRef.current) {
      audioRef.current.volume = clampedVolume;
    }
  }, []);

  const toggleMute = useCallback(() => {
    dispatch({ type: 'TOGGLE_MUTE' });
  }, []);

  const setPlaybackRate = useCallback((rate) => {
    dispatch({ type: 'SET_PLAYBACK_RATE', payload: rate });
    if (playerRef.current) {
      playerRef.current.playbackRate = rate;
    }
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  }, []);

  const setQuality = useCallback((quality) => {
    dispatch({ type: 'SET_QUALITY', payload: quality });
    // Handle quality change
  }, []);

  // Playlist Controls
  const playNext = useCallback(() => {
    if (state.playlist.length === 0) return;
    
    let nextIndex;
    if (state.shuffle) {
      nextIndex = Math.floor(Math.random() * state.playlist.length);
    } else {
      nextIndex = (state.currentIndex + 1) % state.playlist.length;
    }
    
    if (nextIndex === 0 && state.repeat === 'none') {
      dispatch({ type: 'SET_ENDED' });
      return;
    }
    
    dispatch({ type: 'SET_CURRENT_INDEX', payload: nextIndex });
    loadMedia(state.playlist[nextIndex], state.mediaType);
    play();
  }, [state.playlist, state.currentIndex, state.shuffle, state.repeat, state.mediaType, loadMedia, play]);

  const playPrevious = useCallback(() => {
    if (state.playlist.length === 0) return;
    
    if (state.currentTime > 3) {
      seek(0);
      return;
    }
    
    const prevIndex = state.currentIndex === 0 
      ? state.playlist.length - 1 
      : state.currentIndex - 1;
    
    dispatch({ type: 'SET_CURRENT_INDEX', payload: prevIndex });
    loadMedia(state.playlist[prevIndex], state.mediaType);
    play();
  }, [state.playlist, state.currentIndex, state.currentTime, state.mediaType, loadMedia, play, seek]);

  const playAtIndex = useCallback((index) => {
    if (index < 0 || index >= state.playlist.length) return;
    dispatch({ type: 'SET_CURRENT_INDEX', payload: index });
    loadMedia(state.playlist[index], state.mediaType);
    play();
  }, [state.playlist, state.mediaType, loadMedia, play]);

  const value = {
    ...state,
    playerRef,
    audioRef,
    
    // Media
    loadMedia,
    
    // Playback
    play,
    pause,
    togglePlay,
    stop,
    seek,
    seekRelative,
    
    // Volume
    setVolume,
    toggleMute,
    
    // Speed & Quality
    setPlaybackRate,
    setQuality,
    
    // Subtitles
    setActiveSubtitle: (subtitle) => dispatch({ type: 'SET_ACTIVE_SUBTITLE', payload: subtitle }),
    
    // Playlist
    setPlaylist: (playlist) => dispatch({ type: 'SET_PLAYLIST', payload: playlist }),
    playNext,
    playPrevious,
    playAtIndex,
    toggleShuffle: () => dispatch({ type: 'TOGGLE_SHUFFLE' }),
    setRepeat: (mode) => dispatch({ type: 'SET_REPEAT', payload: mode }),
    
    // Display Modes
    toggleFullscreen: () => dispatch({ type: 'TOGGLE_FULLSCREEN' }),
    togglePiP: () => dispatch({ type: 'TOGGLE_PIP' }),
    toggleMinimize: () => dispatch({ type: 'TOGGLE_MINIMIZE' }),
    toggleTheater: () => dispatch({ type: 'TOGGLE_THEATER' }),
    
    // Event Handlers
    onTimeUpdate: (time) => {
      dispatch({ type: 'SET_TIME', payload: time });
      dispatch({ type: 'SET_PROGRESS', payload: (time / state.duration) * 100 });
    },
    onDurationChange: (duration) => dispatch({ type: 'SET_DURATION', payload: duration }),
    onBuffered: (buffered) => dispatch({ type: 'SET_BUFFERED', payload: buffered }),
    onEnded: () => {
      if (state.repeat === 'one') {
        seek(0);
        play();
      } else {
        playNext();
      }
    },
    onError: (error) => dispatch({ type: 'SET_ERROR', payload: error }),
    onBuffering: (isBuffering) => dispatch({ type: 'SET_BUFFERING', payload: isBuffering }),
    
    // Reset
    reset: () => dispatch({ type: 'RESET' }),
  };

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
};

export default PlayerContext;