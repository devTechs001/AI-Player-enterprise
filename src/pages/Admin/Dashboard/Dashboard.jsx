import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FiUsers, FiVideo, FiDollarSign, FiActivity, FiTrendingUp,
  FiAlertCircle, FiDownload, FiServer, FiClock, FiEye,
  FiBarChart2, FiPieChart, FiSettings, FiRefreshCw
} from 'react-icons/fi';
import { useQuery } from '@tanstack/react-query';
import { adminService } from '@services/admin.service';
import Button from '@components/common/Button';
import Alert from '@components/common/Alert';
import styles from './Dashboard.module.scss';

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [autoRefresh, setAutoRefresh] = useState(false);

  // Fetch admin stats
  const { data: stats, isLoading, error, refetch } = useQuery(
    ['adminStats', timeRange],
    () => adminService.getDashboardStats(timeRange),
    { 
      refetchInterval: autoRefresh ? 30000 : false,
      staleTime: autoRefresh ? 25000 : 300000 
    }
  );

  // Fetch recent activities
  const { data: activities } = useQuery(
    'adminActivities',
    adminService.getRecentActivities,
    { refetchInterval: 60000 }
  );

  // Fetch system health
  const { data: systemHealth } = useQuery(
    'systemHealth',
    adminService.getSystemHealth,
    { refetchInterval: 15000 }
  );

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        refetch();
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, refetch]);

  const timeRanges = [
    { label: 'Last 24 Hours', value: '24h' },
    { label: 'Last 7 Days', value: '7d' },
    { label: 'Last 30 Days', value: '30d' },
    { label: 'Last 90 Days', value: '90d' },
  ];

  const quickActions = [
    { label: 'Manage Users', icon: FiUsers, link: '/admin/users', color: 'var(--color-primary)' },
    { label: 'Content Moderation', icon: FiAlertCircle, link: '/admin/moderation', color: 'var(--color-warning)' },
    { label: 'System Settings', icon: FiSettings, link: '/admin/settings', color: 'var(--color-info)' },
    { label: 'View Analytics', icon: FiBarChart2, link: '/admin/analytics', color: 'var(--color-success)' },
  ];

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <Alert variant="error" message="Failed to load dashboard data" />
        <Button onClick={() => refetch()} icon={<FiRefreshCw />}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.adminDashboard}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div>
            <h1>Admin Dashboard</h1>
            <p>Real-time system overview and management</p>
          </div>
          
          <div className={styles.headerActions}>
            <div className={styles.timeRangeSelector}>
              {timeRanges.map(range => (
                <button
                  key={range.value}
                  className={`${styles.timeRangeBtn} ${timeRange === range.value ? styles.active : ''}`}
                  onClick={() => setTimeRange(range.value)}
                >
                  {range.label}
                </button>
              ))}
            </div>
            
            <Button
              variant={autoRefresh ? "primary" : "ghost"}
              size="small"
              onClick={() => setAutoRefresh(!autoRefresh)}
              icon={<FiRefreshCw className={autoRefresh ? styles.spinning : ''} />}
            >
              Auto Refresh
            </Button>
          </div>
        </div>
      </div>

      {/* System Health Banner */}
      {systemHealth && (
        <div className={`${styles.systemHealth} ${systemHealth.status === 'healthy' ? styles.healthy : styles.warning}`}>
          <div className={styles.healthIcon}>
            <FiServer />
          </div>
          <div className={styles.healthInfo}>
            <span className={styles.healthStatus}>
              System Status: <strong>{systemHealth.status}</strong>
            </span>
            <span className={styles.healthDetails}>
              CPU: {systemHealth.cpu}% | Memory: {systemHealth.memory}% | 
              Uptime: {systemHealth.uptime}
            </span>
          </div>
          <div className={styles.healthActions}>
            <Button variant="ghost" size="small" icon={<FiSettings />}>
              Configure
            </Button>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        {stats?.map((stat, index) => (
          <motion.div
            key={stat.id}
            className={styles.statCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className={styles.statHeader}>
              <div className={styles.statIcon} style={{ color: stat.color }}>
                {stat.icon}
              </div>
              <div className={styles.statTrend}>
                <FiTrendingUp />
                <span className={stat.trend > 0 ? styles.positive : styles.negative}>
                  {stat.trend > 0 ? '+' : ''}{stat.trend}%
                </span>
              </div>
            </div>
            
            <div className={styles.statContent}>
              <div className={styles.statValue}>
                {stat.value.toLocaleString()}
              </div>
              <div className={styles.statLabel}>{stat.label}</div>
              <div className={styles.statChange}>
                vs last period
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className={styles.contentGrid}>
        {/* Quick Actions */}
        <motion.div
          className={styles.quickActionsSection}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2>Quick Actions</h2>
          <div className={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <Link
                key={action.label}
                to={action.link}
                className={styles.quickAction}
                style={{ '--action-color': action.color }}
              >
                <div className={styles.actionIcon} style={{ color: 'var(--action-color)' }}>
                  <action.icon />
                </div>
                <span>{action.label}</span>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Recent Activities */}
        <motion.div
          className={styles.activitiesSection}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className={styles.sectionHeader}>
            <h2>Recent Activities</h2>
            <Link to="/admin/logs" className={styles.viewAllLink}>
              View All
            </Link>
          </div>
          
          <div className={styles.activitiesList}>
            {activities?.slice(0, 5).map((activity, index) => (
              <div key={activity.id} className={styles.activityItem}>
                <div className={styles.activityIcon} style={{ color: activity.color }}>
                  <activity.icon />
                </div>
                <div className={styles.activityContent}>
                  <div className={styles.activityTitle}>{activity.title}</div>
                  <div className={styles.activityDescription}>{activity.description}</div>
                  <div className={styles.activityTime}>{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Performance Metrics */}
      <motion.div
        className={styles.metricsSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className={styles.sectionHeader}>
          <h2>Performance Metrics</h2>
          <div className={styles.metricsPeriod}>
            Last {timeRange === '24h' ? '24 hours' : 
                 timeRange === '7d' ? '7 days' : 
                 timeRange === '30d' ? '30 days' : '90 days'}
          </div>
        </div>
        
        <div className={styles.metricsGrid}>
          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <FiEye className={styles.metricIcon} />
              <span>Total Views</span>
            </div>
            <div className={styles.metricValue}>
              {stats?.totalViews?.toLocaleString() || '0'}
            </div>
            <div className={`${styles.metricChange} positive`}>
              +{stats?.viewsChange || '0'}%
            </div>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <FiDownload className={styles.metricIcon} />
              <span>Downloads</span>
            </div>
            <div className={styles.metricValue}>
              {stats?.totalDownloads?.toLocaleString() || '0'}
            </div>
            <div className={`${styles.metricChange} positive`}>
              +{stats?.downloadsChange || '0'}%
            </div>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <FiClock className={styles.metricIcon} />
              <span>Avg. Session</span>
            </div>
            <div className={styles.metricValue}>
              {stats?.avgSession || '0m'}
            </div>
            <div className={`${styles.metricChange} negative`}>
              -{stats?.sessionChange || '0'}%
            </div>
          </div>

          <div className={styles.metricCard}>
            <div className={styles.metricHeader}>
              <FiBarChart2 className={styles.metricIcon} />
              <span>Conversion</span>
            </div>
            <div className={styles.metricValue}>
              {stats?.conversionRate || '0'}%
            </div>
            <div className={`${styles.metricChange} positive`}>
              +{stats?.conversionChange || '0'}%
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
