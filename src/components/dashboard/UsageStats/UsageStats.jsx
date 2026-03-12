import { motion } from 'framer-motion';
import './UsageStats.scss';

const UsageStats = ({ used = 0, total = 0 }) => {
  const percentage = Math.min((used / total) * 100, 100);
  const usedGB = (used / (1024 * 1024 * 1024)).toFixed(2);
  const totalGB = (total / (1024 * 1024 * 1024)).toFixed(2);

  return (
    <div className="usage-stats">
      <div className="usage-info">
        <span className="usage-text">{usedGB} GB of {totalGB} GB used</span>
        <span className="usage-percentage">{percentage.toFixed(0)}%</span>
      </div>
      <div className="usage-bar">
        <motion.div
          className="usage-progress"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            backgroundColor: percentage > 80 ? '#ef4444' : percentage > 60 ? '#f59e0b' : '#10b981',
          }}
        />
      </div>
      {percentage > 80 && (
        <p className="usage-warning">
          You're running low on storage. Consider upgrading your plan.
        </p>
      )}
    </div>
  );
};

export default UsageStats;
