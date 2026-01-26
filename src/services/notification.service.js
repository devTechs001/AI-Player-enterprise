import { toast } from 'react-hot-toast';

class NotificationService {
  // Show success notification
  success(message, options = {}) {
    return toast.success(message, {
      id: options.id,
      duration: options.duration || 4000,
      position: options.position || 'top-right',
      style: {
        background: 'var(--bg-card, #16161f)',
        color: 'var(--text-primary, #ffffff)',
        border: '1px solid var(--border-primary, #27272a)',
        ...options.style,
      },
      ...options,
    });
  }

  // Show error notification
  error(message, options = {}) {
    return toast.error(message, {
      id: options.id,
      duration: options.duration || 5000,
      position: options.position || 'top-right',
      style: {
        background: 'var(--bg-card, #16161f)',
        color: 'var(--text-primary, #ffffff)',
        border: '1px solid var(--border-primary, #27272a)',
        ...options.style,
      },
      ...options,
    });
  }

  // Show info notification
  info(message, options = {}) {
    return toast(message, {
      id: options.id,
      duration: options.duration || 4000,
      position: options.position || 'top-right',
      style: {
        background: 'var(--bg-card, #16161f)',
        color: 'var(--text-primary, #ffffff)',
        border: '1px solid var(--border-primary, #27272a)',
        ...options.style,
      },
      ...options,
    });
  }

  // Show warning notification
  warning(message, options = {}) {
    return toast(message, {
      id: options.id,
      duration: options.duration || 4000,
      position: options.position || 'top-right',
      style: {
        background: 'var(--bg-card, #16161f)',
        color: 'var(--text-primary, #ffffff)',
        border: '1px solid var(--border-primary, #27272a)',
        ...options.style,
      },
      ...options,
    });
  }

  // Show loading notification
  loading(message, options = {}) {
    return toast.loading(message, {
      id: options.id,
      position: options.position || 'top-right',
      style: {
        background: 'var(--bg-card, #16161f)',
        color: 'var(--text-primary, #ffffff)',
        border: '1px solid var(--border-primary, #27272a)',
        ...options.style,
      },
      ...options,
    });
  }

  // Custom notification with action
  custom(message, action, options = {}) {
    return toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } bg-gray-800 text-white p-4 rounded-lg shadow-lg flex justify-between items-center`}
        >
          <span>{message}</span>
          <button
            onClick={action.onClick}
            className="ml-4 px-3 py-1 bg-blue-600 rounded hover:bg-blue-700"
          >
            {action.label}
          </button>
        </div>
      ),
      options
    );
  }

  // Dismiss specific notification
  dismiss(id) {
    toast.dismiss(id);
  }

  // Dismiss all notifications
  dismissAll() {
    toast.dismiss();
  }

  // Update notification
  update(id, options) {
    toast(id, options);
  }

  // Show notification with custom component
  customComponent(component, options = {}) {
    return toast(component, options);
  }

  // Show download progress notification
  downloadProgress(filename, progress, options = {}) {
    return toast.loading(
      <div className="flex items-center space-x-2">
        <div className="flex-1">
          <div className="text-sm font-medium">{filename}</div>
          <div className="w-full bg-gray-700 rounded-full h-1.5 mt-1">
            <div
              className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-xs text-gray-400 mt-1">{Math.round(progress)}% complete</div>
        </div>
      </div>,
      {
        id: `download-${Date.now()}`,
        duration: Infinity,
        ...options,
      }
    );
  }

  // Show AI processing notification
  aiProcessing(message, options = {}) {
    return toast.loading(
      <div className="flex items-center space-x-2">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
        <span>{message}</span>
      </div>,
      {
        id: `ai-processing-${Date.now()}`,
        ...options,
      }
    );
  }
}

export const notificationService = new NotificationService();
export default notificationService;