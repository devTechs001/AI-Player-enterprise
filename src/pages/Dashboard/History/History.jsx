import { motion } from 'framer-motion';
import { FiClock } from 'react-icons/fi';
import '../Dashboard.scss';

const History = () => {
  return (
    <div className="dashboard-page history-page">
      <div className="page-header">
        <h1>Watch History</h1>
        <p>Track your viewing history</p>
      </div>
      <motion.div
        className="empty-state"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="empty-icon">
          <FiClock />
        </div>
        <h2>No history yet</h2>
        <p>Videos you watch will appear here</p>
      </motion.div>
    </div>
  );
};

export default History;
