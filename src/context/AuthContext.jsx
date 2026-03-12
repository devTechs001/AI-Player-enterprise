import { createContext, useReducer, useCallback } from 'react';
import { authService } from '@services/auth.service';
import { storageService } from '@services/storage.service';

export const AuthContext = createContext(null);

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  isGuest: false,
  subscription: null,
  permissions: [],
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'AUTH_INIT':
      return { ...state, isLoading: true, error: null };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isGuest: false,
        subscription: action.payload.subscription,
        permissions: action.payload.permissions || [],
        isLoading: false,
        error: null,
      };
    case 'AUTH_GUEST':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isGuest: true,
        subscription: { plan: 'free', limits: { downloads: 3, quality: '720p' } },
        permissions: ['view', 'download_limited'],
        isLoading: false,
        error: null,
      };
    case 'AUTH_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isGuest: false,
        isLoading: false,
        error: action.payload,
      };
    case 'AUTH_LOGOUT':
      return { ...initialState, isLoading: false };
    case 'UPDATE_USER':
      return { ...state, user: { ...state.user, ...action.payload } };
    case 'UPDATE_SUBSCRIPTION':
      return { ...state, subscription: action.payload };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const initAuth = useCallback(async () => {
    dispatch({ type: 'AUTH_INIT' });
    try {
      const token = storageService.get('accessToken');
      if (token) {
        const userData = await authService.getProfile();
        dispatch({ type: 'AUTH_SUCCESS', payload: userData });
      } else {
        // Check for guest session
        const guestSession = storageService.get('guestSession');
        if (guestSession) {
          dispatch({ type: 'AUTH_GUEST' });
        } else {
          dispatch({ type: 'AUTH_FAILURE', payload: null });
        }
      }
    } catch (error) {
      storageService.remove('accessToken');
      dispatch({ type: 'AUTH_FAILURE', payload: error.message });
    }
  }, []);

  const login = useCallback(async (credentials) => {
    dispatch({ type: 'AUTH_INIT' });
    try {
      const data = await authService.login(credentials);
      storageService.set('accessToken', data.accessToken);
      storageService.set('refreshToken', data.refreshToken);
      dispatch({ type: 'AUTH_SUCCESS', payload: data });
      return { success: true };
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE', payload: error.message });
      return { success: false, error: error.message };
    }
  }, []);

  const register = useCallback(async (userData) => {
    dispatch({ type: 'AUTH_INIT' });
    try {
      const data = await authService.register(userData);
      return { success: true, data };
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE', payload: error.message });
      return { success: false, error: error.message };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      storageService.remove('accessToken');
      storageService.remove('refreshToken');
      dispatch({ type: 'AUTH_LOGOUT' });
    }
  }, []);

  const startGuestSession = useCallback(() => {
    storageService.set('guestSession', { startedAt: new Date().toISOString() });
    dispatch({ type: 'AUTH_GUEST' });
  }, []);

  const socialLogin = useCallback(async (provider, token) => {
    dispatch({ type: 'AUTH_INIT' });
    try {
      const data = await authService.socialLogin(provider, token);
      storageService.set('accessToken', data.accessToken);
      storageService.set('refreshToken', data.refreshToken);
      dispatch({ type: 'AUTH_SUCCESS', payload: data });
      return { success: true };
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE', payload: error.message });
      return { success: false, error: error.message };
    }
  }, []);

  const updateProfile = useCallback(async (updates) => {
    try {
      const updatedUser = await authService.updateProfile(updates);
      dispatch({ type: 'UPDATE_USER', payload: updatedUser });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }, []);

  const hasPermission = useCallback((permission) => {
    return state.permissions.includes(permission) || state.permissions.includes('all');
  }, [state.permissions]);

  const hasRole = useCallback((roles) => {
    if (!state.user) return false;
    const userRoles = Array.isArray(roles) ? roles : [roles];
    return userRoles.includes(state.user.role);
  }, [state.user]);

  const value = {
    ...state,
    initAuth,
    login,
    register,
    logout,
    startGuestSession,
    socialLogin,
    updateProfile,
    hasPermission,
    hasRole,
    clearError: () => dispatch({ type: 'CLEAR_ERROR' }),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;