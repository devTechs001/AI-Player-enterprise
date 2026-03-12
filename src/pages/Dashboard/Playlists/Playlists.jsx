import { motion } from 'framer-motion';
import { FiList } from 'react-icons/fi';
import '../Dashboard.scss';

const Playlists = () => {
  return (
    <div className="dashboard-page playlists-page">
      <div className="page-header">
        <h1>Playlists</h1>
        <p>Organize your content into playlists</p>
      </div>
      <motion.div
        className="empty-state"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="empty-icon">
          <FiList />
        </div>
        <h2>No playlists yet</h2>
        <p>Create your first playlist</p>
      </motion.div>
    </div>
  );
};

export default Playlists;
