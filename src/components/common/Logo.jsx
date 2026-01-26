import { forwardRef } from 'react';
import { FiPlay } from 'react-icons/fi';
import styles from './Logo.module.scss';

const Logo = forwardRef(({ size = 'md', animated = false, className = '', ...props }, ref) => {
  const sizeClasses = {
    xs: styles.xs,
    sm: styles.sm,
    md: styles.md,
    lg: styles.lg,
    xl: styles.xl,
  };

  const logoClass = [
    styles.logo,
    sizeClasses[size],
    animated && styles.animated,
    className,
  ].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={logoClass} {...props}>
      <div className={styles.icon}>
        <FiPlay />
      </div>
      <span className={styles.text}>AI Video Player</span>
    </div>
  );
});

Logo.displayName = 'Logo';

export default Logo;