import { motion } from 'framer-motion';
import { FiCompass } from 'react-icons/fi';
import '../Music.scss';

const Discover = () => {
  return (
    <div className="music-page">
      <div className="page-header">
        <h1>Discover</h1>
        <p>Find new music based on your taste</p>
      </div>
      <motion.div
        className="empty-state"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="empty-icon">
          <FiCompass />
        </div>
        <h2>Discover</h2>
        <p>Personalized recommendations coming soon</p>
      </motion.div>
    </div>
  );
};

export default Discover;
