import { motion } from 'framer-motion';
import './StatCard.scss';

const StatCard = ({ icon: Icon, label, value, change }) => {
  return (
    <motion.div
      className="stat-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="stat-icon">
        <Icon />
      </div>
      <div className="stat-content">
        <span className="stat-value">{value}</span>
        <span className="stat-label">{label}</span>
      </div>
      {change && (
        <span className={`stat-change ${change.startsWith('+') ? 'positive' : 'negative'}`}>
          {change}
        </span>
      )}
    </motion.div>
  );
};

export default StatCard;
