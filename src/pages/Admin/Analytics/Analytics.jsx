import { motion } from 'framer-motion';
import { FiBarChart2 } from 'react-icons/fi';
import '../Admin.scss';

const Analytics = () => {
  return (
    <div className="admin-page">
      <div className="page-header">
        <h1>Analytics</h1>
        <p>View platform-wide analytics</p>
      </div>
      <motion.div
        className="empty-state"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="empty-icon">
          <FiBarChart2 />
        </div>
        <h2>Analytics dashboard</h2>
        <p>View detailed platform analytics</p>
      </motion.div>
    </div>
  );
};

export default Analytics;
