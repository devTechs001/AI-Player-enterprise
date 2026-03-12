import { motion } from 'framer-motion';
import { FiRadio } from 'react-icons/fi';
import '../Music.scss';

const Radio = () => {
  return (
    <div className="music-page">
      <div className="page-header">
        <h1>Radio</h1>
        <p>Discover new music with radio stations</p>
      </div>
      <motion.div
        className="empty-state"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="empty-icon">
          <FiRadio />
        </div>
        <h2>Radio Stations</h2>
        <p>Discover new music</p>
      </motion.div>
    </div>
  );
};

export default Radio;
