import { forwardRef } from 'react';
import styles from './Avatar.module.scss';

const Avatar = forwardRef(({ src, name, size = 'md', initials, className = '', ...props }, ref) => {
  const sizeClasses = {
    xs: styles.xs,
    sm: styles.sm,
    md: styles.md,
    lg: styles.lg,
    xl: styles.xl,
  };

  const avatarClass = [
    styles.avatar,
    sizeClasses[size],
    className,
  ].filter(Boolean).join(' ');

  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <div ref={ref} className={avatarClass} {...props}>
      {src ? (
        <img src={src} alt={name} className={styles.image} />
      ) : (
        <div className={styles.initials}>
          {initials || getInitials(name)}
        </div>
      )}
    </div>
  );
});

Avatar.displayName = 'Avatar';

export default Avatar;