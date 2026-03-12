import { motion } from 'framer-motion';
import { FiAlertTriangle } from 'react-icons/fi';
import '../Admin.scss';

const Reports = () => {
  return (
    <div className="admin-page">
      <div className="page-header">
        <h1>Reports</h1>
        <p>View and manage user reports</p>
      </div>
      <motion.div
        className="empty-state"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="empty-icon">
          <FiAlertTriangle />
        </div>
        <h2>Reports management</h2>
        <p>View and handle user reports</p>
      </motion.div>
    </div>
  );
};

export default Reports;
