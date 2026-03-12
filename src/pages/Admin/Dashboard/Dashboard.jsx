import { motion } from 'framer-motion';
import { FiUsers, FiVideo, FiDollarSign, FiActivity } from 'react-icons/fi';
import '../Admin.scss';

const AdminDashboard = () => {
  const stats = [
    { label: 'Total Users', value: '12,458', change: '+12%', icon: FiUsers },
    { label: 'Total Videos', value: '8,234', change: '+8%', icon: FiVideo },
    { label: 'Revenue', value: '$45,678', change: '+23%', icon: FiDollarSign },
    { label: 'Active Now', value: '1,234', change: '+5%', icon: FiActivity },
  ];

  return (
    <div className="admin-page">
      <div className="page-header">
        <h1>Admin Dashboard</h1>
        <p>Overview of system statistics</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="stat-icon">
              <stat.icon />
            </div>
            <div className="stat-info">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
            <span className="stat-change">{stat.change}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
