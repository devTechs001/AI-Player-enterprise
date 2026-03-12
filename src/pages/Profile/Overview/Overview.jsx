import { motion } from 'framer-motion';
import { FiUser, FiMail, FiCalendar, FiMapPin } from 'react-icons/fi';
import Avatar from '@components/common/Avatar';
import Button from '@components/common/Button';
import '../Profile.scss';

const Overview = () => {
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Pro Member',
    joined: 'January 2024',
    location: 'San Francisco, CA',
  };

  const stats = [
    { label: 'Videos Watched', value: '234' },
    { label: 'Downloads', value: '89' },
    { label: 'Playlists', value: '12' },
    { label: 'Watch Time', value: '156h' },
  ];

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>Profile Overview</h1>
        <p>Manage your account information</p>
      </div>

      <div className="profile-content">
        <motion.div
          className="profile-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="profile-avatar-section">
            <Avatar size="xl" name={user.name} />
            <Button variant="outline" size="small">Change Photo</Button>
          </div>

          <div className="profile-info">
            <h2>{user.name}</h2>
            <span className="member-badge">{user.role}</span>
          </div>

          <div className="profile-details">
            <div className="detail-item">
              <FiMail />
              <span>{user.email}</span>
            </div>
            <div className="detail-item">
              <FiCalendar />
              <span>Joined {user.joined}</span>
            </div>
            <div className="detail-item">
              <FiMapPin />
              <span>{user.location}</span>
            </div>
          </div>

          <div className="profile-actions">
            <Button variant="primary">Edit Profile</Button>
          </div>
        </motion.div>

        <motion.div
          className="stats-grid"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Overview;
