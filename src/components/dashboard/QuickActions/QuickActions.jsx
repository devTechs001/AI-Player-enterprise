import { motion } from 'framer-motion';
import './QuickActions.scss';

const QuickActions = ({ actions = [] }) => {
  return (
    <div className="quick-actions">
      {actions.map((action, index) => (
        <motion.button
          key={action.label}
          className="quick-action"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
          onClick={action.onClick}
          style={{ '--action-color': action.color }}
        >
          <div className="quick-action-icon">
            <action.icon />
          </div>
          <span className="quick-action-label">{action.label}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default QuickActions;
