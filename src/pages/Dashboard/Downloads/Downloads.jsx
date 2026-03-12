import { motion } from 'framer-motion';
import { FiDownload } from 'react-icons/fi';
import '../Dashboard.scss';

const Downloads = () => {
  return (
    <div className="dashboard-page downloads-page">
      <div className="page-header">
        <h1>Downloads</h1>
        <p>View and manage your downloaded content</p>
      </div>
      <motion.div
        className="empty-state"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="empty-icon">
          <FiDownload />
        </div>
        <h2>No downloads yet</h2>
        <p>Download videos to watch offline</p>
      </motion.div>
    </div>
  );
};

export default Downloads;
