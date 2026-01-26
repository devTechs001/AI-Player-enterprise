import { configureStore } from ' @reduxjs/toolkit';
import authReducer from './slices/authSlice';
import playerReducer from './slices/playerSlice';
import downloadReducer from './slices/downloadSlice';
import uiReducer from './slices/uiSlice';
import musicReducer from './slices/musicSlice';
import notificationReducer from './slices/notificationSlice';
import collaborationReducer from './slices/collaborationSlice';
import adminReducer from './slices/adminSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    player: playerReducer,
    download: downloadReducer,
    ui: uiReducer,
    music: musicReducer,
    notifications: notificationReducer,
    collaboration: collaborationReducer,
    admin: adminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['player/setMediaElement'],
        ignoredPaths: ['player.mediaElement'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;