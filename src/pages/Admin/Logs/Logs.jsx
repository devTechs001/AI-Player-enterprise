import { motion } from 'framer-motion';
import { FiFileText } from 'react-icons/fi';
import '../Admin.scss';

const Logs = () => {
  return (
    <div className="admin-page">
      <div className="page-header">
        <h1>System Logs</h1>
        <p>View system logs and activity</p>
      </div>
      <motion.div
        className="empty-state"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="empty-icon">
          <FiFileText />
        </div>
        <h2>Logs viewer</h2>
        <p>View system logs and audit trails</p>
      </motion.div>
    </div>
  );
};

export default Logs;
