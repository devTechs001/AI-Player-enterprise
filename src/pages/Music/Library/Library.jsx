import { motion } from 'framer-motion';
import { FiMusic } from 'react-icons/fi';
import '../Music.scss';

const Library = () => {
  return (
    <div className="music-page">
      <div className="page-header">
        <h1>Music Library</h1>
        <p>Your complete music collection</p>
      </div>
      <motion.div
        className="empty-state"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="empty-icon">
          <FiMusic />
        </div>
        <h2>Music Library</h2>
        <p>Add music to your library</p>
      </motion.div>
    </div>
  );
};

export default Library;
