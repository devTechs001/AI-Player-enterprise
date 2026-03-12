import { motion } from 'framer-motion';
import './Loader.scss';

const Loader = ({ size = 'md', variant = 'default' }) => {
  return (
    <div className={`loader ${size} ${variant}`}>
      <motion.div
        className="loader-ring"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <div className="loader-ring-inner" />
      </motion.div>
      {variant === 'dots' && (
        <div className="loader-dots">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="loader-dot"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Loader;
