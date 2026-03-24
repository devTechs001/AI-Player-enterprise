import api from '@services/api.service';

// Collaboration API endpoints
export const collaborationAPI = {
  // Room management
  createRoom: (roomData) => api.post('/collaboration/rooms', roomData),
  getRooms: (params = {}) => api.get('/collaboration/rooms', { params }),
  getRoom: (roomId) => api.get(`/collaboration/rooms/${roomId}`),
  updateRoom: (roomId, data) => api.put(`/collaboration/rooms/${roomId}`, data),
  deleteRoom: (roomId) => api.delete(`/collaboration/rooms/${roomId}`),
  
  // Room participation
  joinRoom: (roomId, password = null) => api.post(`/collaboration/rooms/${roomId}/join`, { password }),
  leaveRoom: (roomId) => api.post(`/collaboration/rooms/${roomId}/leave`),
  getRoomParticipants: (roomId) => api.get(`/collaboration/rooms/${roomId}/participants`),
  
  // Room invitations
  inviteToRoom: (roomId, inviteData) => api.post(`/collaboration/rooms/${roomId}/invite`, inviteData),
  acceptInvitation: (inviteId) => api.post(`/collaboration/invitations/${inviteId}/accept`),
  declineInvitation: (inviteId) => api.post(`/collaboration/invitations/${inviteId}/decline`),
  getPendingInvitations: () => api.get('/collaboration/invitations/pending'),
  
  // Real-time synchronization
  syncPlayback: (roomId, playbackData) => api.post(`/collaboration/rooms/${roomId}/sync`, playbackData),
  getPlaybackState: (roomId) => api.get(`/collaboration/rooms/${roomId}/playback`),
  
  // Chat functionality
  getRoomMessages: (roomId, params = {}) => api.get(`/collaboration/rooms/${roomId}/messages`, { params }),
  sendMessage: (roomId, messageData) => api.post(`/collaboration/rooms/${roomId}/messages`, messageData),
  deleteMessage: (roomId, messageId) => api.delete(`/collaboration/rooms/${roomId}/messages/${messageId}`),
  editMessage: (roomId, messageId, messageData) => api.put(`/collaboration/rooms/${roomId}/messages/${messageId}`, messageData),
  
  // Reactions and emojis
  addReaction: (roomId, messageId, reaction) => api.post(`/collaboration/rooms/${roomId}/messages/${messageId}/reactions`, { reaction }),
  removeReaction: (roomId, messageId, reaction) => api.delete(`/collaboration/rooms/${roomId}/messages/${messageId}/reactions/${reaction}`),
  
  // Screen sharing
  startScreenShare: (roomId) => api.post(`/collaboration/rooms/${roomId}/screen-share/start`),
  stopScreenShare: (roomId) => api.post(`/collaboration/rooms/${roomId}/screen-share/stop`),
  getScreenShareStatus: (roomId) => api.get(`/collaboration/rooms/${roomId}/screen-share`),
  
  // Polls and voting
  createPoll: (roomId, pollData) => api.post(`/collaboration/rooms/${roomId}/polls`, pollData),
  getPolls: (roomId) => api.get(`/collaboration/rooms/${roomId}/polls`),
  voteInPoll: (roomId, pollId, optionId) => api.post(`/collaboration/rooms/${roomId}/polls/${pollId}/vote`, { optionId }),
  endPoll: (roomId, pollId) => api.post(`/collaboration/rooms/${roomId}/polls/${pollId}/end`),
  
  // Shared playlists
  getSharedPlaylists: (roomId) => api.get(`/collaboration/rooms/${roomId}/playlists`),
  createSharedPlaylist: (roomId, playlistData) => api.post(`/collaboration/rooms/${roomId}/playlists`, playlistData),
  addToSharedPlaylist: (roomId, playlistId, videoId) => api.post(`/collaboration/rooms/${roomId}/playlists/${playlistId}/add`, { videoId }),
  removeFromSharedPlaylist: (roomId, playlistId, videoId) => api.delete(`/collaboration/rooms/${roomId}/playlists/${playlistId}/${videoId}`),
  
  // Room settings
  getRoomSettings: (roomId) => api.get(`/collaboration/rooms/${roomId}/settings`),
  updateRoomSettings: (roomId, settings) => api.put(`/collaboration/rooms/${roomId}/settings`, settings),
  
  // Participant management
  kickParticipant: (roomId, participantId, reason) => api.post(`/collaboration/rooms/${roomId}/participants/${participantId}/kick`, { reason }),
  muteParticipant: (roomId, participantId) => api.post(`/collaboration/rooms/${roomId}/participants/${participantId}/mute`),
  unmuteParticipant: (roomId, participantId) => api.post(`/collaboration/rooms/${roomId}/participants/${participantId}/unmute`),
  promoteToHost: (roomId, participantId) => api.post(`/collaboration/rooms/${roomId}/participants/${participantId}/promote`),
  demoteFromHost: (roomId, participantId) => api.post(`/collaboration/rooms/${roomId}/participants/${participantId}/demote`),
  
  // Room history and analytics
  getRoomHistory: (roomId, params = {}) => api.get(`/collaboration/rooms/${roomId}/history`, { params }),
  getRoomAnalytics: (roomId, period) => api.get(`/collaboration/rooms/${roomId}/analytics/${period}`),
  
  // Recording sessions
  startRecording: (roomId) => api.post(`/collaboration/rooms/${roomId}/recording/start`),
  stopRecording: (roomId) => api.post(`/collaboration/rooms/${roomId}/recording/stop`),
  getRecordings: (roomId) => api.get(`/collaboration/rooms/${roomId}/recordings`),
  downloadRecording: (roomId, recordingId) => api.get(`/collaboration/rooms/${roomId}/recordings/${recordingId}/download`),
  
  // Watch parties
  createWatchParty: (partyData) => api.post('/collaboration/watch-parties', partyData),
  getWatchParties: (params = {}) => api.get('/collaboration/watch-parties', { params }),
  getWatchParty: (partyId) => api.get(`/collaboration/watch-parties/${partyId}`),
  joinWatchParty: (partyId) => api.post(`/collaboration/watch-parties/${partyId}/join`),
  leaveWatchParty: (partyId) => api.post(`/collaboration/watch-parties/${partyId}/leave`),
  
  // Live sessions
  createLiveSession: (sessionData) => api.post('/collaboration/live-sessions', sessionData),
  getLiveSessions: (params = {}) => api.get('/collaboration/live-sessions', { params }),
  getLiveSession: (sessionId) => api.get(`/collaboration/live-sessions/${sessionId}`),
  startLiveSession: (sessionId) => api.post(`/collaboration/live-sessions/${sessionId}/start`),
  endLiveSession: (sessionId) => api.post(`/collaboration/live-sessions/${sessionId}/end`),
  
  // Collaboration tools
  getWhiteboard: (roomId) => api.get(`/collaboration/rooms/${roomId}/whiteboard`),
  updateWhiteboard: (roomId, whiteboardData) => api.put(`/collaboration/rooms/${roomId}/whiteboard`, whiteboardData),
  clearWhiteboard: (roomId) => api.delete(`/collaboration/rooms/${roomId}/whiteboard`),
  
  // File sharing
  getSharedFiles: (roomId) => api.get(`/collaboration/rooms/${roomId}/files`),
  uploadFile: (roomId, formData) => api.post(`/collaboration/rooms/${roomId}/files`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteFile: (roomId, fileId) => api.delete(`/collaboration/rooms/${roomId}/files/${fileId}`),
  downloadFile: (roomId, fileId) => api.get(`/collaboration/rooms/${roomId}/files/${fileId}/download`),
  
  // Breakout rooms
  createBreakoutRoom: (roomId, breakoutData) => api.post(`/collaboration/rooms/${roomId}/breakout`, breakoutData),
  getBreakoutRooms: (roomId) => api.get(`/collaboration/rooms/${roomId}/breakout`),
  joinBreakoutRoom: (roomId, breakoutId) => api.post(`/collaboration/rooms/${roomId}/breakout/${breakoutId}/join`),
  leaveBreakoutRoom: (roomId, breakoutId) => api.post(`/collaboration/rooms/${roomId}/breakout/${breakoutId}/leave`),
  
  // Collaboration notifications
  getNotifications: (params = {}) => api.get('/collaboration/notifications', { params }),
  markNotificationRead: (notificationId) => api.put(`/collaboration/notifications/${notificationId}/read`),
  updateNotificationSettings: (settings) => api.put('/collaboration/notifications/settings', settings),
  
  // Collaboration statistics
  getUserCollaborationStats: () => api.get('/collaboration/stats/user'),
  getRoomStats: (roomId) => api.get(`/collaboration/rooms/${roomId}/stats`),
};

export default collaborationAPI;
