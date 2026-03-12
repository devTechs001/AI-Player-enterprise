import { motion } from 'framer-motion';
import { FiList } from 'react-icons/fi';
import '../Collaboration.scss';

const SharedPlaylists = () => {
  return (
    <div className="collaboration-page">
      <div className="page-header">
        <h1>Shared Playlists</h1>
        <p>Collaborate on playlists with friends</p>
      </div>
      <motion.div
        className="empty-state"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="empty-icon">
          <FiList />
        </div>
        <h2>Shared Playlists</h2>
        <p>Create and share playlists together</p>
      </motion.div>
    </div>
  );
};

export default SharedPlaylists;
