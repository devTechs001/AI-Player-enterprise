import { createSlice } from ' @reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    notifications: [],
    unreadCount: 0,
    settings: {
      email: true,
      push: true,
      sound: true,
      inApp: true,
    },
  },
  reducers: {
    addNotification: (state, action) => {
      const notification = {
        id: Date.now(),
        read: false,
        timestamp: new Date().toISOString(),
        ...action.payload,
      };
      
      state.notifications.unshift(notification);
      if (!notification.read) {
        state.unreadCount++;
      }
    },
    markAsRead: (state, action) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification && !notification.read) {
        notification.read = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach(notification => {
        notification.read = true;
      });
      state.unreadCount = 0;
    },
    removeNotification: (state, action) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification && !notification.read) {
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
    clearNotifications: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
    },
    updateNotificationSettings: (state, action) => {
      state.settings = { ...state.settings, ...action.payload };
    },
    setUnreadCount: (state, action) => {
      state.unreadCount = action.payload;
    },
  },
});

export const { 
  addNotification,
  markAsRead,
  markAllAsRead,
  removeNotification,
  clearNotifications,
  updateNotificationSettings,
  setUnreadCount
} = notificationSlice.actions;

export default notificationSlice.reducer;