import { createSlice } from '@reduxjs/toolkit';

const collaborationSlice = createSlice({
  name: 'collaboration',
  initialState: {
    rooms: [],
    currentRoom: null,
    participants: [],
    isHost: false,
    syncState: {
      currentTime: 0,
      isPlaying: false,
      playbackRate: 1,
    },
    chatMessages: [],
    reactions: [],
    polls: [],
    screenShare: null,
    isConnected: false,
    connectionStatus: 'disconnected', // disconnected, connecting, connected
  },
  reducers: {
    addRoom: (state, action) => {
      state.rooms.push(action.payload);
    },
    setCurrentRoom: (state, action) => {
      state.currentRoom = action.payload;
    },
    setParticipants: (state, action) => {
      state.participants = action.payload;
    },
    addParticipant: (state, action) => {
      state.participants.push(action.payload);
    },
    removeParticipant: (state, action) => {
      state.participants = state.participants.filter(p => p.id !== action.payload);
    },
    setIsHost: (state, action) => {
      state.isHost = action.payload;
    },
    updateSyncState: (state, action) => {
      state.syncState = { ...state.syncState, ...action.payload };
    },
    setChatMessages: (state, action) => {
      state.chatMessages = action.payload;
    },
    addChatMessage: (state, action) => {
      state.chatMessages.push(action.payload);
    },
    addReaction: (state, action) => {
      state.reactions.push(action.payload);
    },
    addPoll: (state, action) => {
      state.polls.push(action.payload);
    },
    updatePoll: (state, action) => {
      const { id, updates } = action.payload;
      const poll = state.polls.find(p => p.id === id);
      if (poll) {
        Object.assign(poll, updates);
      }
    },
    setScreenShare: (state, action) => {
      state.screenShare = action.payload;
    },
    setIsConnected: (state, action) => {
      state.isConnected = action.payload;
    },
    setConnectionStatus: (state, action) => {
      state.connectionStatus = action.payload;
    },
    joinRoom: (state, action) => {
      state.currentRoom = action.payload.roomId;
      state.participants = action.payload.participants || [];
      state.isHost = action.payload.isHost || false;
      state.isConnected = true;
      state.connectionStatus = 'connected';
    },
    leaveRoom: (state) => {
      state.currentRoom = null;
      state.participants = [];
      state.isHost = false;
      state.syncState = {
        currentTime: 0,
        isPlaying: false,
        playbackRate: 1,
      };
      state.chatMessages = [];
      state.reactions = [];
      state.polls = [];
      state.screenShare = null;
      state.isConnected = false;
      state.connectionStatus = 'disconnected';
    },
    clearReactions: (state) => {
      state.reactions = [];
    },
    clearPolls: (state) => {
      state.polls = [];
    },
  },
});

export const { 
  addRoom,
  setCurrentRoom,
  setParticipants,
  addParticipant,
  removeParticipant,
  setIsHost,
  updateSyncState,
  setChatMessages,
  addChatMessage,
  addReaction,
  addPoll,
  updatePoll,
  setScreenShare,
  setIsConnected,
  setConnectionStatus,
  joinRoom,
  leaveRoom,
  clearReactions,
  clearPolls
} = collaborationSlice.actions;

export default collaborationSlice.reducer;