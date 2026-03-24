import { useEffect, useRef } from 'react';
import { X, Check, AlertCircle, AlertTriangle, Info } from 'react-icons/lu';
import './Toast.scss';

const Toast = ({
  id,
  message,
  type = 'info',
  duration = 5000,
  persistent = false,
  action,
  onClose,
  className = '',
  ...props
}) => {
  const toastRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!persistent && duration > 0) {
      timerRef.current = setTimeout(() => {
        onClose(id);
      }, duration);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [id, duration, persistent, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <Check className="toast-icon" />;
      case 'error':
        return <AlertCircle className="toast-icon" />;
      case 'warning':
        return <AlertTriangle className="toast-icon" />;
      case 'info':
      default:
        return <Info className="toast-icon" />;
    }
  };

  const handleClose = () => {
    onClose(id);
  };

  const handleAction = () => {
    if (action?.onClick) {
      action.onClick();
    }
    if (!action?.persist) {
      handleClose();
    }
  };

  return (
    <div
      ref={toastRef}
      className={`toast toast-${type} ${className}`}
      role="alert"
      {...props}
    >
      <div className="toast-content">
        <div className="toast-icon-wrapper">
          {getIcon()}
        </div>
        <div className="toast-message">
          {message}
        </div>
      </div>
      
      <div className="toast-actions">
        {action && (
          <button
            type="button"
            className="toast-action"
            onClick={handleAction}
          >
            {action.label}
          </button>
        )}
        <button
          type="button"
          className="toast-close"
          onClick={handleClose}
          aria-label="Dismiss notification"
        >
          <X className="toast-close-icon" />
        </button>
      </div>

      {!persistent && (
        <div 
          className="toast-progress"
          style={{ animationDuration: `${duration}ms` }}
        />
      )}
    </div>
  );
};

export default Toast;
