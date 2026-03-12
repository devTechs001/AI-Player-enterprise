import { motion } from 'framer-motion';
import { FiClock, FiDownload, FiPlay, FiHeart } from 'react-icons/fi';
import './RecentActivity.scss';

const getActivityIcon = (type) => {
  switch (type) {
    case 'watch':
      return FiPlay;
    case 'download':
      return FiDownload;
    case 'favorite':
      return FiHeart;
    default:
      return FiClock;
  }
};

const RecentActivity = ({ activities = [], isLoading }) => {
  if (isLoading) {
    return (
      <div className="recent-activity-loading">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="activity-skeleton" />
        ))}
      </div>
    );
  }

  if (!activities || activities.length === 0) {
    return (
      <div className="recent-activity-empty">
        <FiClock />
        <span>No recent activity</span>
      </div>
    );
  }

  return (
    <div className="recent-activity">
      {activities.slice(0, 5).map((activity, index) => {
        const Icon = getActivityIcon(activity.type);
        return (
          <motion.div
            key={activity.id}
            className="activity-item"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <div className="activity-icon">
              <Icon />
            </div>
            <div className="activity-content">
              <span className="activity-title">{activity.title}</span>
              <span className="activity-time">{activity.time}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default RecentActivity;
