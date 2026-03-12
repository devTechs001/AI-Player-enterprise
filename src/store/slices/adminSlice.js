import { createSlice } from '@reduxjs/toolkit';

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    users: [],
    currentUser: null,
    loading: false,
    error: null,
    stats: {
      totalUsers: 0,
      activeUsers: 0,
      totalDownloads: 0,
      storageUsed: 0,
      revenue: 0,
    },
    auditLogs: [],
    systemHealth: {
      status: 'operational', // operational, degraded, down
      cpu: 0,
      memory: 0,
      disk: 0,
      uptime: 0,
    },
    content: {
      videos: [],
      reports: [],
      flaggedContent: [],
    },
    settings: {
      maintenanceMode: false,
      maxFileSize: 1024, // MB
      allowedFileTypes: ['mp4', 'avi', 'mov', 'mkv', 'webm'],
      maxConcurrentDownloads: 5,
    },
    apiKeys: [],
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...action.payload };
      }
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setStats: (state, action) => {
      state.stats = { ...state.stats, ...action.payload };
    },
    setAuditLogs: (state, action) => {
      state.auditLogs = action.payload;
    },
    addAuditLog: (state, action) => {
      state.auditLogs.unshift(action.payload);
    },
    setSystemHealth: (state, action) => {
      state.systemHealth = { ...state.systemHealth, ...action.payload };
    },
    setContent: (state, action) => {
      state.content = { ...state.content, ...action.payload };
    },
    addReport: (state, action) => {
      state.content.reports.push(action.payload);
    },
    flagContent: (state, action) => {
      state.content.flaggedContent.push(action.payload);
    },
    updateSettings: (state, action) => {
      state.settings = { ...state.settings, ...action.payload };
    },
    setMaintenanceMode: (state, action) => {
      state.settings.maintenanceMode = action.payload;
    },
    setApiKeys: (state, action) => {
      state.apiKeys = action.payload;
    },
    addApiKey: (state, action) => {
      state.apiKeys.push(action.payload);
    },
    removeApiKey: (state, action) => {
      state.apiKeys = state.apiKeys.filter(key => key.id !== action.payload);
    },
    updateUserRole: (state, action) => {
      const { userId, role } = action.payload;
      const user = state.users.find(u => u.id === userId);
      if (user) {
        user.role = role;
      }
    },
    updateUserStatus: (state, action) => {
      const { userId, status } = action.payload;
      const user = state.users.find(u => u.id === userId);
      if (user) {
        user.status = status;
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { 
  setLoading,
  setError,
  setUsers,
  addUser,
  updateUser,
  deleteUser,
  setCurrentUser,
  setStats,
  setAuditLogs,
  addAuditLog,
  setSystemHealth,
  setContent,
  addReport,
  flagContent,
  updateSettings,
  setMaintenanceMode,
  setApiKeys,
  addApiKey,
  removeApiKey,
  updateUserRole,
  updateUserStatus,
  clearError
} = adminSlice.actions;

export default adminSlice.reducer;