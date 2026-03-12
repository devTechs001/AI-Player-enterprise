import React, { createContext, useContext, useReducer, useCallback } from 'react';
import io from 'socket.io-client';

export const CollaborationContext = createContext();

const collaborationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SOCKET_CONNECTED':
      return {
        ...state,
        socketConnected: action.payload,
      };
    case 'SET_ROOM_ID':
      return {
        ...state,
        roomId: action.payload,
      };
    case 'SET_PARTICIPANTS':
      return {
        ...state,
        participants: action.payload,
      };
    case 'ADD_PARTICIPANT':
      return {
        ...state,
        participants: [...state.participants, action.payload],
      };
    case 'REMOVE_PARTICIPANT':
      return {
        ...state,
        participants: state.participants.filter(p => p.id !== action.payload),
      };
    case 'SET_SYNC_STATE':
      return {
        ...state,
        syncState: {
          ...state.syncState,
          ...action.payload,
        },
      };
    case 'SET_CHAT_MESSAGES':
      return {
        ...state,
        chatMessages: action.payload,
      };
    case 'ADD_CHAT_MESSAGE':
      return {
        ...state,
        chatMessages: [...state.chatMessages, action.payload],
      };
    case 'SET_IS_HOST':
      return {
        ...state,
        isHost: action.payload,
      };
    case 'SET_SCREEN_SHARE':
      return {
        ...state,
        screenShare: action.payload,
      };
    case 'SET_REACTIONS':
      return {
        ...state,
        reactions: action.payload,
      };
    case 'ADD_REACTION':
      return {
        ...state,
        reactions: [...state.reactions, action.payload],
      };
    case 'SET_POLLS':
      return {
        ...state,
        polls: action.payload,
      };
    case 'ADD_POLL':
      return {
        ...state,
        polls: [...state.polls, action.payload],
      };
    case 'UPDATE_POLL':
      return {
        ...state,
        polls: state.polls.map(poll => 
          poll.id === action.payload.id ? { ...poll, ...action.payload.updates } : poll
        ),
      };
    default:
      return state;
  }
};

const CollaborationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(collaborationReducer, {
    socket: null,
    socketConnected: false,
    roomId: null,
    participants: [],
    syncState: {
      currentTime: 0,
      isPlaying: false,
      playbackRate: 1,
    },
    chatMessages: [],
    isHost: false,
    screenShare: null,
    reactions: [],
    polls: [],
  });

  // Initialize socket connection
  const initializeSocket = useCallback((userId, roomId) => {
    const socket = io(import.meta.env.VITE_REACT_APP_WEBSOCKET_URL || 'ws://localhost:3001', {
      auth: {
        userId,
        roomId,
      },
    });

    socket.on('connect', () => {
      dispatch({ type: 'SET_SOCKET_CONNECTED', payload: true });
    });

    socket.on('disconnect', () => {
      dispatch({ type: 'SET_SOCKET_CONNECTED', payload: false });
    });

    // Listen for participant updates
    socket.on('participants-update', (participants) => {
      dispatch({ type: 'SET_PARTICIPANTS', payload: participants });
    });

    // Listen for sync updates
    socket.on('sync-update', (syncData) => {
      dispatch({ type: 'SET_SYNC_STATE', payload: syncData });
    });

    // Listen for chat messages
    socket.on('chat-message', (message) => {
      dispatch({ type: 'ADD_CHAT_MESSAGE', payload: message });
    });

    // Listen for reactions
    socket.on('reaction', (reaction) => {
      dispatch({ type: 'ADD_REACTION', payload: reaction });
    });

    // Listen for polls
    socket.on('poll-created', (poll) => {
      dispatch({ type: 'ADD_POLL', payload: poll });
    });

    socket.on('poll-updated', (update) => {
      dispatch({ type: 'UPDATE_POLL', payload: update });
    });

    dispatch({ type: 'SET_SOCKET', payload: socket });
  }, []);

  const joinRoom = useCallback((userId, roomId) => {
    initializeSocket(userId, roomId);
    dispatch({ type: 'SET_ROOM_ID', payload: roomId });
  }, [initializeSocket]);

  const leaveRoom = useCallback(() => {
    if (state.socket) {
      state.socket.disconnect();
    }
    dispatch({ type: 'SET_SOCKET_CONNECTED', payload: false });
    dispatch({ type: 'SET_ROOM_ID', payload: null });
    dispatch({ type: 'SET_PARTICIPANTS', payload: [] });
    dispatch({ type: 'SET_CHAT_MESSAGES', payload: [] });
  }, [state.socket]);

  const sendSyncUpdate = useCallback((syncData) => {
    if (state.socket) {
      state.socket.emit('sync-update', syncData);
    }
  }, [state.socket]);

  const sendMessage = useCallback((message) => {
    if (state.socket) {
      state.socket.emit('chat-message', message);
    }
  }, [state.socket]);

  const sendReaction = useCallback((reaction) => {
    if (state.socket) {
      state.socket.emit('reaction', reaction);
    }
  }, [state.socket]);

  const createPoll = useCallback((poll) => {
    if (state.socket) {
      state.socket.emit('create-poll', poll);
    }
  }, [state.socket]);

  const votePoll = useCallback((pollId, optionIndex) => {
    if (state.socket) {
      state.socket.emit('vote-poll', { pollId, optionIndex });
    }
  }, [state.socket]);

  const startScreenShare = useCallback((stream) => {
    dispatch({ type: 'SET_SCREEN_SHARE', payload: stream });
  }, []);

  const stopScreenShare = useCallback(() => {
    dispatch({ type: 'SET_SCREEN_SHARE', payload: null });
  }, []);

  const value = {
    ...state,
    joinRoom,
    leaveRoom,
    sendSyncUpdate,
    sendMessage,
    sendReaction,
    createPoll,
    votePoll,
    startScreenShare,
    stopScreenShare,
  };

  return (
    <CollaborationContext.Provider value={value}>
      {children}
    </CollaborationContext.Provider>
  );
};

const useCollaboration = () => {
  const context = useContext(CollaborationContext);
  if (!context) {
    throw new Error('useCollaboration must be used within a CollaborationProvider');
  }
  return context;
};

export { CollaborationProvider, useCollaboration };