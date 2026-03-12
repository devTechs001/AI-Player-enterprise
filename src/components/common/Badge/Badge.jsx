import './Badge.scss';

const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}) => {
  return (
    <span
      className={`badge ${variant} ${size} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
