import { motion } from 'framer-motion';
import { FiBook } from 'react-icons/fi';
import '../Devs.scss';

const Documentation = () => {
  return (
    <div className="devs-page">
      <div className="page-header">
        <h1>Documentation</h1>
        <p>Complete API and integration documentation</p>
      </div>
      <motion.div
        className="empty-state"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="empty-icon">
          <FiBook />
        </div>
        <h2>Documentation Hub</h2>
        <p>Browse our comprehensive documentation</p>
      </motion.div>
    </div>
  );
};

export default Documentation;
