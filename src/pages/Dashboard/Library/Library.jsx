import { motion } from 'framer-motion';
import { FiLibrary } from 'react-icons/fi';
import '../Dashboard.scss';

const Library = () => {
  return (
    <div className="dashboard-page library-page">
      <div className="page-header">
        <h1>Library</h1>
        <p>Your complete content library</p>
      </div>
      <motion.div
        className="empty-state"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="empty-icon">
          <FiLibrary />
        </div>
        <h2>Library is empty</h2>
        <p>Add content to your library</p>
      </motion.div>
    </div>
  );
};

export default Library;
