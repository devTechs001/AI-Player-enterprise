import api from './api.service';

class AuthService {
  // Login
  async login(credentials) {
    const response = await api.post('/auth/login', credentials);
    const { accessToken, refreshToken, user } = response.data;
    
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    
    return { success: true, user };
  }

  // Register
  async register(userData) {
    const response = await api.post('/auth/register', userData);
    return response.data;
  }

  // Logout
  async logout() {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  }

  // Get user profile
  async getProfile() {
    const response = await api.get('/auth/profile');
    return response.data;
  }

  // Update user profile
  async updateProfile(profileData) {
    const response = await api.put('/auth/profile', profileData);
    return response.data;
  }

  // Change password
  async changePassword(passwordData) {
    const response = await api.post('/auth/change-password', passwordData);
    return response.data;
  }

  // Forgot password
  async forgotPassword(email) {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
  }

  // Reset password
  async resetPassword(resetData) {
    const response = await api.post('/auth/reset-password', resetData);
    return response.data;
  }

  // Verify email
  async verifyEmail(token) {
    const response = await api.post('/auth/verify-email', { token });
    return response.data;
  }

  // Resend verification
  async resendVerification(email) {
    const response = await api.post('/auth/resend-verification', { email });
    return response.data;
  }

  // Social login
  async socialLogin(provider, token) {
    const response = await api.post(`/auth/social/${provider}`, { token });
    const { accessToken, refreshToken, user } = response.data;
    
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    
    return { success: true, user };
  }

  // Refresh token
  async refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await api.post('/auth/refresh', { refreshToken });
    const { accessToken } = response.data;

    localStorage.setItem('accessToken', accessToken);
    return response.data;
  }

  // Get user subscriptions
  async getUserSubscriptions() {
    const response = await api.get('/auth/subscriptions');
    return response.data;
  }

  // Update user preferences
  async updateUserPreferences(preferences) {
    const response = await api.put('/auth/preferences', preferences);
    return response.data;
  }

  // Get user preferences
  async getUserPreferences() {
    const response = await api.get('/auth/preferences');
    return response.data;
  }

  // Check if user is authenticated
  isAuthenticated() {
    const token = localStorage.getItem('accessToken');
    return !!token;
  }

  // Get current user
  getCurrentUser() {
    const token = localStorage.getItem('accessToken');
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.user;
    } catch (error) {
      console.error('Error parsing token:', error);
      return null;
    }
  }
}

export const authService = new AuthService();
export default authService;