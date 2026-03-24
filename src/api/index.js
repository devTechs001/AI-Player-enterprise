// API exports
import authAPI from './auth.api';
import videoAPI from './video.api';
import downloadAPI from './download.api';
import subscriptionAPI from './subscription.api';
import adminAPI from './admin.api';
import collaborationAPI from './collaboration.api';
import musicAPI from './music.api';
import aiAPI from './ai.api';
import analyticsAPI from './analytics.api';
import storageAPI from './storage.api';
import notificationAPI from './notification.api';
import mediaAPI from './media.api';
import websocketAPI from './websocket.api';

export {
  authAPI,
  videoAPI,
  downloadAPI,
  subscriptionAPI,
  adminAPI,
  collaborationAPI,
  musicAPI,
  aiAPI,
  analyticsAPI,
  storageAPI,
  notificationAPI,
  mediaAPI,
  websocketAPI,
};

// Combined API object for easy access
const API = {
  auth: authAPI,
  video: videoAPI,
  download: downloadAPI,
  subscription: subscriptionAPI,
  admin: adminAPI,
  collaboration: collaborationAPI,
  music: musicAPI,
  ai: aiAPI,
  analytics: analyticsAPI,
  storage: storageAPI,
  notification: notificationAPI,
  media: mediaAPI,
  websocket: websocketAPI,
};

export default API;
