import { motion } from 'framer-motion';
import './Switch.scss';

const Switch = ({ checked, onChange, disabled = false, size = 'md' }) => {
  const handleClick = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  const handleKeyDown = (e) => {
    if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onChange(!checked);
    }
  };

  return (
    <motion.button
      className={`switch ${size} ${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      whileTap={!disabled ? { scale: 0.95 } : {}}
    >
      <motion.span
        className="switch-thumb"
        layout
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      />
    </motion.button>
  );
};

export default Switch;
