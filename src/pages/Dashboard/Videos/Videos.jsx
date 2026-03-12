import { motion } from 'framer-motion';
import { FiVideo } from 'react-icons/fi';
import '../Dashboard.scss';

const Videos = () => {
  return (
    <div className="dashboard-page videos-page">
      <div className="page-header">
        <h1>My Videos</h1>
        <p>Manage your uploaded and saved videos</p>
      </div>
      <motion.div
        className="empty-state"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="empty-icon">
          <FiVideo />
        </div>
        <h2>No videos yet</h2>
        <p>Upload your first video to get started</p>
      </motion.div>
    </div>
  );
};

export default Videos;
