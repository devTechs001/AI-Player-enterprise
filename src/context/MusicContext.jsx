import React, { createContext, useContext, useReducer } from 'react';

const MusicContext = createContext();

const musicReducer = (state, action) => {
  switch (action.type) {
    case 'SET_QUEUE':
      return {
        ...state,
        queue: action.payload,
        currentIndex: 0,
      };
    case 'SET_CURRENT_INDEX':
      return {
        ...state,
        currentIndex: action.payload,
      };
    case 'SET_IS_PLAYING':
      return {
        ...state,
        isPlaying: action.payload,
      };
    case 'SET_CURRENT_TRACK':
      return {
        ...state,
        currentTrack: action.payload,
      };
    case 'SET_VOLUME':
      return {
        ...state,
        volume: action.payload,
      };
    case 'SET_REPEAT_MODE':
      return {
        ...state,
        repeatMode: action.payload,
      };
    case 'SET_SHUFFLE':
      return {
        ...state,
        shuffle: action.payload,
      };
    case 'SET_LYRICS':
      return {
        ...state,
        lyrics: action.payload,
      };
    case 'SET_EQUALIZER':
      return {
        ...state,
        equalizer: {
          ...state.equalizer,
          ...action.payload,
        },
      };
    case 'SET_VISUALIZATION_TYPE':
      return {
        ...state,
        visualizationType: action.payload,
      };
    default:
      return state;
  }
};

const MusicProvider = ({ children }) => {
  const [state, dispatch] = useReducer(musicReducer, {
    queue: [],
    currentIndex: 0,
    isPlaying: false,
    currentTrack: null,
    volume: 0.8,
    repeatMode: 'off', // 'off', 'one', 'all'
    shuffle: false,
    lyrics: null,
    equalizer: {
      enabled: false,
      bass: 0,
      mid: 0,
      treble: 0,
    },
    visualizationType: 'bars', // 'bars', 'wave', 'particles'
  });

  const setQueue = (tracks) => {
    dispatch({ type: 'SET_QUEUE', payload: tracks });
  };

  const setCurrentIndex = (index) => {
    dispatch({ type: 'SET_CURRENT_INDEX', payload: index });
  };

  const setIsPlaying = (isPlaying) => {
    dispatch({ type: 'SET_IS_PLAYING', payload: isPlaying });
  };

  const setCurrentTrack = (track) => {
    dispatch({ type: 'SET_CURRENT_TRACK', payload: track });
  };

  const setVolume = (volume) => {
    dispatch({ type: 'SET_VOLUME', payload: volume });
  };

  const setRepeatMode = (mode) => {
    dispatch({ type: 'SET_REPEAT_MODE', payload: mode });
  };

  const toggleShuffle = () => {
    dispatch({ type: 'SET_SHUFFLE', payload: !state.shuffle });
  };

  const setLyrics = (lyrics) => {
    dispatch({ type: 'SET_LYRICS', payload: lyrics });
  };

  const setEqualizer = (settings) => {
    dispatch({ type: 'SET_EQUALIZER', payload: settings });
  };

  const setVisualizationType = (type) => {
    dispatch({ type: 'SET_VISUALIZATION_TYPE', payload: type });
  };

  // Helper methods
  const getCurrentTrack = () => {
    return state.queue[state.currentIndex] || null;
  };

  const hasNextTrack = () => {
    return state.currentIndex < state.queue.length - 1;
  };

  const hasPrevTrack = () => {
    return state.currentIndex > 0;
  };

  const nextTrack = () => {
    if (hasNextTrack()) {
      const nextIndex = state.currentIndex + 1;
      setCurrentIndex(nextIndex);
      setCurrentTrack(state.queue[nextIndex]);
    } else if (state.repeatMode === 'all') {
      setCurrentIndex(0);
      setCurrentTrack(state.queue[0]);
    }
  };

  const prevTrack = () => {
    if (hasPrevTrack()) {
      const prevIndex = state.currentIndex - 1;
      setCurrentIndex(prevIndex);
      setCurrentTrack(state.queue[prevIndex]);
    } else if (state.currentIndex === 0 && state.queue.length > 0) {
      setCurrentTrack(state.queue[0]);
    }
  };

  const playTrack = (trackIndex) => {
    setCurrentIndex(trackIndex);
    setCurrentTrack(state.queue[trackIndex]);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying(!state.isPlaying);
  };

  const value = {
    ...state,
    setQueue,
    setCurrentIndex,
    setIsPlaying,
    setCurrentTrack,
    setVolume,
    setRepeatMode,
    toggleShuffle,
    setLyrics,
    setEqualizer,
    setVisualizationType,
    getCurrentTrack,
    hasNextTrack,
    hasPrevTrack,
    nextTrack,
    prevTrack,
    playTrack,
    togglePlayPause,
  };

  return (
    <MusicContext.Provider value={value}>
      {children}
    </MusicContext.Provider>
  );
};

const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};

export { MusicProvider, useMusic };