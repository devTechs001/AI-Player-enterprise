import { motion } from 'framer-motion';
import { FiMusic } from 'react-icons/fi';
import '../Dashboard.scss';

const Music = () => {
  return (
    <div className="dashboard-page music-page">
      <div className="page-header">
        <h1>Music</h1>
        <p>Your music library and playlists</p>
      </div>
      <motion.div
        className="empty-state"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="empty-icon">
          <FiMusic />
        </div>
        <h2>No music yet</h2>
        <p>Start building your music collection</p>
      </motion.div>
    </div>
  );
};

export default Music;
