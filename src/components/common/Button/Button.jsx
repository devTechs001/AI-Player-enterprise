import { forwardRef } from 'react';
import './Button.scss';

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  className = '',
  ...props
}, ref) => {
  return (
    <button
      ref={ref}
      className={`btn ${variant} ${size} ${loading ? 'loading' : ''} ${disabled ? 'disabled' : ''} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="btn-loader">
          <svg className="spinner" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="3" />
          </svg>
        </span>
      )}
      {icon && iconPosition === 'left' && !loading && (
        <span className="btn-icon">{icon}</span>
      )}
      {children && <span className="btn-content">{children}</span>}
      {icon && iconPosition === 'right' && !loading && (
        <span className="btn-icon btn-icon-right">{icon}</span>
      )}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
