import React, { createContext, useContext, useReducer } from 'react';
import toast from 'react-hot-toast';

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(notification => notification.id !== action.payload),
      };
    case 'CLEAR_ALL_NOTIFICATIONS':
      return {
        ...state,
        notifications: [],
      };
    default:
      return state;
  }
};

const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, {
    notifications: [],
  });

  const showNotification = (message, type = 'info', options = {}) => {
    const id = Date.now().toString();
    const notification = {
      id,
      message,
      type,
      timestamp: new Date().toISOString(),
      ...options,
    };

    // Show toast based on type
    switch (type) {
      case 'success':
        toast.success(message, { id });
        break;
      case 'error':
        toast.error(message, { id });
        break;
      case 'warning':
        toast(message, { id }); // Warning toast
        break;
      case 'loading':
        toast.loading(message, { id });
        break;
      default:
        toast(message, { id });
    }

    dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
    return id;
  };

  const removeNotification = (id) => {
    toast.dismiss(id); // Dismiss the specific toast
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
  };

  const clearAllNotifications = () => {
    toast.dismiss(); // Dismiss all toasts
    dispatch({ type: 'CLEAR_ALL_NOTIFICATIONS' });
  };

  const showError = (message) => showNotification(message, 'error');
  const showSuccess = (message) => showNotification(message, 'success');
  const showWarning = (message) => showNotification(message, 'warning');
  const showInfo = (message) => showNotification(message, 'info');
  const showLoading = (message) => showNotification(message, 'loading');

  const value = {
    ...state,
    showNotification,
    removeNotification,
    clearAllNotifications,
    showError,
    showSuccess,
    showWarning,
    showInfo,
    showLoading,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export { NotificationProvider, useNotification };