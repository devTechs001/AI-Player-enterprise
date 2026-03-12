import { motion } from 'framer-motion';
import { FiBox } from 'react-icons/fi';
import '../Devs.scss';

const Sandbox = () => {
  return (
    <div className="devs-page">
      <div className="page-header">
        <h1>API Sandbox</h1>
        <p>Test API endpoints interactively</p>
      </div>
      <motion.div
        className="empty-state"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="empty-icon">
          <FiBox />
        </div>
        <h2>API Sandbox</h2>
        <p>Test and experiment with API endpoints</p>
      </motion.div>
    </div>
  );
};

export default Sandbox;
