import { io } from 'socket.io-client';
import { storageService } from './storage.service';

class WebSocketService {
  constructor() {
    this.socket = null;
    this.listeners = new Map();
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
  }

  connect(url = import.meta.env.VITE_WS_URL) {
    if (this.socket?.connected) return;

    const token = storageService.get('accessToken');

    this.socket = io(url, {
      auth: { token },
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: this.maxReconnectAttempts,
      reconnectionDelay: 1000,
    });

    this.setupEventListeners();
  }

  setupEventListeners() {
    this.socket.on('connect', () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
      this.emit('connected');
    });

    this.socket.on('disconnect', (reason) => {
      console.log('WebSocket disconnected:', reason);
      this.emit('disconnected', reason);
    });

    this.socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
      this.reconnectAttempts++;
      
      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        this.emit('connection_failed');
      }
    });

    this.socket.on('error', (error) => {
      console.error('WebSocket error:', error);
      this.emit('error', error);
    });

    // Handle custom events
    this.socket.onAny((event, ...args) => {
      this.emit(event, ...args);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // Send message to server
  send(event, data) {
    if (this.socket?.connected) {
      this.socket.emit(event, data);
    } else {
      console.warn('WebSocket not connected');
    }
  }

  // Subscribe to events
  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(callback);

    return () => this.off(event, callback);
  }

  // Unsubscribe from events
  off(event, callback) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).delete(callback);
    }
  }

  // Emit event to listeners
  emit(event, ...args) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach((callback) => {
        try {
          callback(...args);
        } catch (error) {
          console.error('WebSocket listener error:', error);
        }
      });
    }
  }

  // Collaboration-specific methods
  joinRoom(roomId) {
    this.send('room:join', { roomId });
  }

  leaveRoom(roomId) {
    this.send('room:leave', { roomId });
  }

  sendChatMessage(roomId, message) {
    this.send('chat:message', { roomId, message });
  }

  sendReaction(roomId, reaction) {
    this.send('room:reaction', { roomId, reaction });
  }

  // Video synchronization
  syncPlayback(roomId, currentTime, isPlaying) {
    this.send('playback:sync', { roomId, currentTime, isPlaying });
  }

  sendTimeUpdate(roomId, currentTime) {
    this.send('player:time-update', { roomId, currentTime });
  }

  sendPlayPause(roomId, isPlaying) {
    this.send('player:play-pause', { roomId, isPlaying });
  }

  sendVolumeChange(roomId, volume) {
    this.send('player:volume-change', { roomId, volume });
  }

  // Polls
  createPoll(roomId, pollData) {
    this.send('poll:create', { roomId, pollData });
  }

  votePoll(roomId, pollId, optionIndex) {
    this.send('poll:vote', { roomId, pollId, optionIndex });
  }

  // Screen sharing
  startScreenShare(roomId, stream) {
    this.send('screen-share:start', { roomId, stream });
  }

  stopScreenShare(roomId) {
    this.send('screen-share:stop', { roomId });
  }

  // Get connection status
  isConnected() {
    return this.socket?.connected || false;
  }

  // Get socket ID
  getSocketId() {
    return this.socket?.id || null;
  }

  // Get room participants
  getRoomParticipants(roomId) {
    this.send('room:participants', { roomId });
  }

  // Send presence status
  updatePresence(status) {
    this.send('presence:update', { status });
  }

  // Send typing indicator
  sendTyping(roomId, isTyping) {
    this.send('typing:indicator', { roomId, isTyping });
  }

  // Send file
  sendFile(roomId, file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      this.send('file:transfer', {
        roomId,
        file: event.target.result,
        fileName: file.name,
        fileType: file.type,
      });
    };
    reader.readAsArrayBuffer(file);
  }

  // Send emoji reaction
  sendEmojiReaction(roomId, emoji) {
    this.send('emoji:reaction', { roomId, emoji });
  }

  // Sync playlist
  syncPlaylist(roomId, playlist) {
    this.send('playlist:sync', { roomId, playlist });
  }

  // Sync playback rate
  syncPlaybackRate(roomId, rate) {
    this.send('playback:rate', { roomId, rate });
  }

  // Sync subtitle selection
  syncSubtitle(roomId, subtitleIndex) {
    this.send('subtitle:sync', { roomId, subtitleIndex });
  }

  // Sync quality selection
  syncQuality(roomId, quality) {
    this.send('quality:sync', { roomId, quality });
  }

  // Send custom event
  sendCustomEvent(event, data) {
    this.send(`custom:${event}`, data);
  }

  // Listen for custom event
  onCustomEvent(event, callback) {
    return this.on(`custom:${event}`, callback);
  }

  // Error handling
  onError(callback) {
    return this.on('error', callback);
  }

  // Connection status listeners
  onConnect(callback) {
    return this.on('connected', callback);
  }

  onDisconnect(callback) {
    return this.on('disconnected', callback);
  }

  onConnectionFailed(callback) {
    return this.on('connection_failed', callback);
  }
}

export const webSocketService = new WebSocketService();
export default webSocketService;