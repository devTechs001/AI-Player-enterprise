import { motion } from 'framer-motion';
import { FiCode } from 'react-icons/fi';
import '../Devs.scss';

const API = () => {
  return (
    <div className="devs-page">
      <div className="page-header">
        <h1>API Reference</h1>
        <p>Complete API reference and endpoint documentation</p>
      </div>
      <motion.div
        className="empty-state"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="empty-icon">
          <FiCode />
        </div>
        <h2>API Reference</h2>
        <p>Browse all available API endpoints</p>
      </motion.div>
    </div>
  );
};

export default API;
