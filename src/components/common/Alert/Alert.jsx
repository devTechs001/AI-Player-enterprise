import { forwardRef } from 'react';
import { FiX } from 'react-icons/fi';
import './Alert.scss';

const Alert = forwardRef(({
  children,
  variant = 'info',
  size = 'md',
  icon,
  dismissible = false,
  onDismiss,
  className = '',
  ...props
}, ref) => {
  const getIcon = () => {
    if (icon) return icon;
    
    switch (variant) {
      case 'success':
        return <svg className="alert-icon" viewBox="0 0 24 24" fill="none">
          <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>;
      case 'warning':
        return <svg className="alert-icon" viewBox="0 0 24 24" fill="none">
          <path d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>;
      case 'error':
        return <svg className="alert-icon" viewBox="0 0 24 24" fill="none">
          <path d="M10 14L12 12M12 12L14 10M12 12L10 10M12 12L14 14M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>;
      case 'info':
      default:
        return <svg className="alert-icon" viewBox="0 0 24 24" fill="none">
          <path d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>;
    }
  };

  return (
    <div
      ref={ref}
      className={`alert alert-${variant} alert-${size} ${className}`}
      role="alert"
      {...props}
    >
      <div className="alert-content">
        <div className="alert-icon-wrapper">
          {getIcon()}
        </div>
        <div className="alert-message">
          {children}
        </div>
      </div>
      {dismissible && (
        <button
          type="button"
          className="alert-dismiss"
          onClick={onDismiss}
          aria-label="Dismiss alert"
        >
          <FiX className="alert-dismiss-icon" />
        </button>
      )}
    </div>
  );
});

Alert.displayName = 'Alert';

export default Alert;
