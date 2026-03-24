import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiUser, 
  FiMail, 
  FiCalendar, 
  FiMapPin, 
  FiCamera, 
  FiVideo, 
  FiDownload, 
  FiHeart,
  FiPlay,
  FiClock
} from 'react-icons/fi';
import Avatar from '@components/common/Avatar';
import Button from '@components/common/Button';
import styles from './Overview.module.scss';

const Overview = () => {
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Pro Member',
    joined: 'January 2024',
    location: 'San Francisco, CA',
    avatar: 'https://i.pravatar.cc/150?u=john'
  };

  const stats = [
    { label: 'Videos Watched', value: '234', icon: <FiVideo /> },
    { label: 'Downloads', value: '89', icon: <FiDownload /> },
    { label: 'Favorites', value: '156', icon: <FiHeart /> },
    { label: 'Watch Time', value: '156h', icon: <FiClock /> },
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'watched',
      title: 'Watched "Enterprise AI Architecture"',
      meta: 'Video • 45 minutes',
      time: '2 hours ago',
      icon: <FiPlay />
    },
    {
      id: 2,
      type: 'downloaded',
      title: 'Downloaded "React Performance Guide"',
      meta: 'PDF • 2.4 MB',
      time: '5 hours ago',
      icon: <FiDownload />
    },
    {
      id: 3,
      type: 'favorited',
      title: 'Added "Modern CSS Techniques" to favorites',
      meta: 'Playlist • 12 videos',
      time: '1 day ago',
      icon: <FiHeart />
    },
    {
      id: 4,
      type: 'uploaded',
      title: 'Uploaded "Team Meeting Recording"',
      meta: 'Video • 1.2 GB',
      time: '2 days ago',
      icon: <FiCamera />
    }
  ];

  return (
    <div className={styles.overviewPage}>
      <header className={styles.header}>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Profile Overview
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Manage your account and track your activity
        </motion.p>
      </header>

      <div className={styles.profileGrid}>
        <motion.div
          className={styles.profileCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className={styles.avatarSection}>
            <img src={user.avatar} alt={user.name} className={styles.avatar} />
            <button className={styles.changePhotoBtn}>
              <FiCamera />
            </button>
          </div>

          <div className={styles.userInfo}>
            <h2>{user.name}</h2>
            <span className={styles.memberBadge}>{user.role}</span>
          </div>

          <div className={styles.detailsList}>
            <div className={styles.detailItem}>
              <FiMail className={styles.icon} />
              <span className={styles.text}>{user.email}</span>
            </div>
            <div className={styles.detailItem}>
              <FiCalendar className={styles.icon} />
              <span className={styles.text}>Joined {user.joined}</span>
            </div>
            <div className={styles.detailItem}>
              <FiMapPin className={styles.icon} />
              <span className={styles.text}>{user.location}</span>
            </div>
          </div>

          <Button variant="primary" size="lg">Edit Profile</Button>
        </motion.div>

        <motion.div
          className={styles.statsCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3>Your Statistics</h3>
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className={styles.statItem}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.05 }}
              >
                <div className={styles.value}>{stat.value}</div>
                <div className={styles.label}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.section
        className={styles.activitySection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3>Recent Activity</h3>
        <div className={styles.activityList}>
          {recentActivity.map((activity, index) => (
            <motion.div
              key={activity.id}
              className={styles.activityItem}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
            >
              <div className={styles.icon}>{activity.icon}</div>
              <div className={styles.content}>
                <div className={styles.title}>{activity.title}</div>
                <div className={styles.meta}>{activity.meta}</div>
              </div>
              <div className={styles.time}>{activity.time}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default Overview;
