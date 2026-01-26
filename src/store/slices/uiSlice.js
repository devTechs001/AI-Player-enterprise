import { createSlice } from ' @reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    theme: 'dark', // dark, light, neon
    sidebarCollapsed: false,
    drawerOpen: false,
    modal: {
      open: false,
      type: null,
      props: {},
    },
    snackbar: {
      open: false,
      message: '',
      severity: 'info', // info, success, warning, error
      autoHideDuration: 6000,
    },
    loading: false,
    notifications: [],
    unreadCount: 0,
    breakpoints: {
      xs: false,
      sm: false,
      md: false,
      lg: false,
      xl: false,
    },
    tooltips: {
      enabled: true,
    },
    animations: {
      enabled: true,
      duration: 'normal',
    },
  },
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
    setSidebarCollapsed: (state, action) => {
      state.sidebarCollapsed = action.payload;
    },
    openDrawer: (state) => {
      state.drawerOpen = true;
    },
    closeDrawer: (state) => {
      state.drawerOpen = false;
    },
    toggleDrawer: (state) => {
      state.drawerOpen = !state.drawerOpen;
    },
    openModal: (state, action) => {
      state.modal = {
        open: true,
        type: action.payload.type,
        props: action.payload.props || {},
      };
    },
    closeModal: (state) => {
      state.modal = {
        open: false,
        type: null,
        props: {},
      };
    },
    showSnackbar: (state, action) => {
      state.snackbar = {
        open: true,
        message: action.payload.message,
        severity: action.payload.severity || 'info',
        autoHideDuration: action.payload.autoHideDuration || 6000,
      };
    },
    hideSnackbar: (state) => {
      state.snackbar.open = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    addNotification: (state, action) => {
      const notification = {
        id: Date.now(),
        ...action.payload,
        timestamp: new Date().toISOString(),
      };
      state.notifications.unshift(notification);
      state.unreadCount += 1;
    },
    removeNotification: (state, action) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification && !notification.read) {
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
    },
    markAsRead: (state, action) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.read = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    updateBreakpoints: (state, action) => {
      state.breakpoints = { ...state.breakpoints, ...action.payload };
    },
    toggleTooltips: (state) => {
      state.tooltips.enabled = !state.tooltips.enabled;
    },
    setTooltipsEnabled: (state, action) => {
      state.tooltips.enabled = action.payload;
    },
    toggleAnimations: (state) => {
      state.animations.enabled = !state.animations.enabled;
    },
    setAnimationDuration: (state, action) => {
      state.animations.duration = action.payload;
    },
  },
});

export const { 
  setTheme,
  toggleSidebar,
  setSidebarCollapsed,
  openDrawer,
  closeDrawer,
  toggleDrawer,
  openModal,
  closeModal,
  showSnackbar,
  hideSnackbar,
  setLoading,
  addNotification,
  removeNotification,
  clearNotifications,
  markAsRead,
  updateBreakpoints,
  toggleTooltips,
  setTooltipsEnabled,
  toggleAnimations,
  setAnimationDuration
} = uiSlice.actions;

export default uiSlice.reducer;