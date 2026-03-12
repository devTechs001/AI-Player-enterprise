import { motion } from 'framer-motion';
import { FiVideo } from 'react-icons/fi';
import '../Admin.scss';

const Content = () => {
  return (
    <div className="admin-page">
      <div className="page-header">
        <h1>Content Management</h1>
        <p>Manage uploaded videos and media</p>
      </div>
      <motion.div
        className="empty-state"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="empty-icon">
          <FiVideo />
        </div>
        <h2>Content management interface</h2>
        <p>View and manage all uploaded content</p>
      </motion.div>
    </div>
  );
};

export default Content;
