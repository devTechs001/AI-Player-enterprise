import { forwardRef } from 'react';
import styles from './Badge.module.scss';

const Badge = forwardRef(({ children, variant = 'default', size = 'md', className = '', ...props }, ref) => {
  const variantClasses = {
    default: styles.default,
    primary: styles.primary,
    secondary: styles.secondary,
    success: styles.success,
    warning: styles.warning,
    danger: styles.danger,
    info: styles.info,
    dark: styles.dark,
    light: styles.light,
  };

  const sizeClasses = {
    sm: styles.sm,
    md: styles.md,
    lg: styles.lg,
  };

  const badgeClass = [
    styles.badge,
    variantClasses[variant],
    sizeClasses[size],
    className,
  ].filter(Boolean).join(' ');

  return (
    <span ref={ref} className={badgeClass} {...props}>
      {children}
    </span>
  );
});

Badge.displayName = 'Badge';

export default Badge;