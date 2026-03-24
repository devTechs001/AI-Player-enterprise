import api from '@services/api.service';

// Authentication API endpoints
export const authAPI = {
  // Login
  login: (credentials) => api.post('/auth/login', credentials),
  
  // Register
  register: (userData) => api.post('/auth/register', userData),
  
  // Logout
  logout: () => api.post('/auth/logout'),
  
  // Get user profile
  getProfile: () => api.get('/auth/profile'),
  
  // Update user profile
  updateProfile: (profileData) => api.put('/auth/profile', profileData),
  
  // Change password
  changePassword: (passwordData) => api.post('/auth/change-password', passwordData),
  
  // Forgot password
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  
  // Reset password
  resetPassword: (resetData) => api.post('/auth/reset-password', resetData),
  
  // Verify email
  verifyEmail: (token) => api.post('/auth/verify-email', { token }),
  
  // Resend verification
  resendVerification: (email) => api.post('/auth/resend-verification', { email }),
  
  // Social login
  socialLogin: (provider, token) => api.post(`/auth/social/${provider}`, { token }),
  
  // Refresh token
  refreshToken: (refreshToken) => api.post('/auth/refresh', { refreshToken }),
  
  // Get user subscriptions
  getUserSubscriptions: () => api.get('/auth/subscriptions'),
  
  // Update user preferences
  updateUserPreferences: (preferences) => api.put('/auth/preferences', preferences),
  
  // Get user preferences
  getUserPreferences: () => api.get('/auth/preferences'),
  
  // Two-factor authentication
  enable2FA: () => api.post('/auth/2fa/enable'),
  disable2FA: () => api.post('/auth/2fa/disable'),
  verify2FA: (code) => api.post('/auth/2fa/verify', { code }),
  
  // Session management
  getSessions: () => api.get('/auth/sessions'),
  revokeSession: (sessionId) => api.delete(`/auth/sessions/${sessionId}`),
  revokeAllSessions: () => api.delete('/auth/sessions'),
  
  // Account deletion
  requestAccountDeletion: () => api.post('/auth/account/delete-request'),
  confirmAccountDeletion: (token) => api.post('/auth/account/delete-confirm', { token }),
  
  // Security settings
  getSecuritySettings: () => api.get('/auth/security'),
  updateSecuritySettings: (settings) => api.put('/auth/security', settings),
};

export default authAPI;
