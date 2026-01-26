import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiUsers,
  FiVideo,
  FiDownload,
  FiDollarSign,
  FiTrendingUp,
  FiTrendingDown,
  FiActivity,
  FiServer,
  FiDatabase,
  FiCpu,
  FiAlertTriangle,
  FiCheckCircle,
} from 'react-icons/fi';
import { useQuery } from 'react-query';
import { adminService } from '@services/admin.service';
import StatCard from '@components/dashboard/StatCard';
import Chart from '@components/dashboard/Chart';
import DataTable from '@components/common/DataTable';
import Badge from '@components/common/Badge';
import styles from './Dashboard.module.scss';

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');

  const { data: stats, isLoading } = useQuery(
    ['adminStats', timeRange],
    () => adminService.getStats(timeRange)
  );

  const { data: recentUsers } = useQuery(
    'recentUsers',
    () => adminService.getRecentUsers(10)
  );

  const { data: systemHealth } = useQuery(
    'systemHealth',
    adminService.getSystemHealth,
    { refetchInterval: 30000 }
  );

  const { data: alerts } = useQuery(
    'systemAlerts',
    adminService.getAlerts
  );

  const userColumns = [
    {
      key: 'user',
      label: 'User',
      render: (row) => (
        <div className={styles.userCell}>
          <img src={row.avatar} alt={row.name} />
          <div>
            <span className={styles.userName}>{row.name}</span>
            <span className={styles.userEmail}>{row.email}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'plan',
      label: 'Plan',
      render: (row) => (
        <Badge variant={row.plan === 'enterprise' ? 'primary' : row.plan === 'pro' ? 'secondary' : 'default'}>
          {row.plan}
        </Badge>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => (
        <Badge variant={row.status === 'active' ? 'success' : 'warning'}>
          {row.status}
        </Badge>
      ),
    },
    {
      key: 'joined',
      label: 'Joined',
      render: (row) => new Date(row.createdAt).toLocaleDateString(),
    },
  ];

  const getHealthStatus = (value, thresholds) => {
    if (value >= thresholds.critical) return 'critical';
    if (value >= thresholds.warning) return 'warning';
    return 'healthy';
  };

  return (
    <div className={styles.adminDashboard}>
      <div className={styles.header}>
        <div>
          <h1>Admin Dashboard</h1>
          <p>Overview of your platform's performance</p>
        </div>

        <div className={styles.timeRangeSelector}>
          {['24h', '7d', '30d', '90d'].map((range) => (
            <button
              key={range}
              className={timeRange === range ? styles.active : ''}
              onClick={() => setTimeRange(range)}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <StatCard
            icon={FiUsers}
            label="Total Users"
            value={stats?.totalUsers?.toLocaleString() || '0'}
            change={stats?.userGrowth}
            color="#3b82f6"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <StatCard
            icon={FiDollarSign}
            label="Revenue"
            value={`$${stats?.revenue?.toLocaleString() || '0'}`}
            change={stats?.revenueGrowth}
            color="#10b981"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <StatCard
            icon={FiDownload}
            label="Downloads"
            value={stats?.downloads?.toLocaleString() || '0'}
            change={stats?.downloadGrowth}
            color="#f59e0b"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <StatCard
            icon={FiVideo}
            label="Videos Processed"
            value={stats?.videosProcessed?.toLocaleString() || '0'}
            change={stats?.processingGrowth}
            color="#8b5cf6"
          />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Left Column */}
        <div className={styles.leftColumn}>
          {/* Revenue Chart */}
          <motion.section
            className={styles.chartSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2>Revenue Overview</h2>
            <Chart
              data={stats?.revenueData || []}
              type="bar"
              xKey="date"
              yKey="revenue"
              color="#10b981"
              height={300}
            />
          </motion.section>

          {/* User Growth Chart */}
          <motion.section
            className={styles.chartSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2>User Growth</h2>
            <Chart
              data={stats?.userGrowthData || []}
              type="area"
              xKey="date"
              yKey="users"
              color="#3b82f6"
              height={300}
            />
          </motion.section>

          {/* Recent Users */}
          <motion.section
            className={styles.tableSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h2>Recent Users</h2>
            <DataTable
              columns={userColumns}
              data={recentUsers || []}
              isLoading={isLoading}
            />
          </motion.section>
        </div>

        {/* Right Column */}
        <div className={styles.rightColumn}>
          {/* System Health */}
          <motion.section
            className={styles.healthSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2>System Health</h2>
            <div className={styles.healthGrid}>
              <div className={styles.healthItem}>
                <div className={styles.healthIcon}>
                  <FiCpu />
                </div>
                <div className={styles.healthInfo}>
                  <span className={styles.healthLabel}>CPU Usage</span>
                  <span className={styles.healthValue}>
                    {systemHealth?.cpu || 0}%
                  </span>
                </div>
                <div
                  className={`${styles.healthBar} ${
                    styles[getHealthStatus(systemHealth?.cpu || 0, { warning: 70, critical: 90 })]
                  }`}
                >
                  <div style={{ width: `${systemHealth?.cpu || 0}%` }} />
                </div>
              </div>

              <div className={styles.healthItem}>
                <div className={styles.healthIcon}>
                  <FiDatabase />
                </div>
                <div className={styles.healthInfo}>
                  <span className={styles.healthLabel}>Memory Usage</span>
                  <span className={styles.healthValue}>
                    {systemHealth?.memory || 0}%
                  </span>
                </div>
                <div
                  className={`${styles.healthBar} ${
                    styles[getHealthStatus(systemHealth?.memory || 0, { warning: 70, critical: 90 })]
                  }`}
                >
                  <div style={{ width: `${systemHealth?.memory || 0}%` }} />
                </div>
              </div>

              <div className={styles.healthItem}>
                <div className={styles.healthIcon}>
                  <FiServer />
                </div>
                <div className={styles.healthInfo}>
                  <span className={styles.healthLabel}>Disk Usage</span>
                  <span className={styles.healthValue}>
                    {systemHealth?.disk || 0}%
                  </span>
                </div>
                <div
                  className={`${styles.healthBar} ${
                    styles[getHealthStatus(systemHealth?.disk || 0, { warning: 80, critical: 95 })]
                  }`}
                >
                  <div style={{ width: `${systemHealth?.disk || 0}%` }} />
                </div>
              </div>

              <div className={styles.healthItem}>
                <div className={styles.healthIcon}>
                  <FiActivity />
                </div>
                <div className={styles.healthInfo}>
                  <span className={styles.healthLabel}>API Latency</span>
                  <span className={styles.healthValue}>
                    {systemHealth?.latency || 0}ms
                  </span>
                </div>
                <div
                  className={`${styles.healthBar} ${
                    styles[getHealthStatus(systemHealth?.latency || 0, { warning: 200, critical: 500 })]
                  }`}
                >
                  <div style={{ width: `${Math.min((systemHealth?.latency || 0) / 10, 100)}%` }} />
                </div>
              </div>
            </div>
          </motion.section>

          {/* Alerts */}
          <motion.section
            className={styles.alertsSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2>System Alerts</h2>
            <div className={styles.alertsList}>
              {alerts?.length > 0 ? (
                alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`${styles.alertItem} ${styles[alert.severity]}`}
                  >
                    {alert.severity === 'critical' || alert.severity === 'warning' ? (
                      <FiAlertTriangle />
                    ) : (
                      <FiCheckCircle />
                    )}
                    <div className={styles.alertContent}>
                      <span className={styles.alertTitle}>{alert.title}</span>
                      <span className={styles.alertTime}>
                        {new Date(alert.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className={styles.noAlerts}>
                  <FiCheckCircle />
                  <span>All systems operational</span>
                </div>
              )}
            </div>
          </motion.section>

          {/* Quick Stats */}
          <motion.section
            className={styles.quickStats}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h2>Quick Stats</h2>
            <div className={styles.quickStatsGrid}>
              <div className={styles.quickStat}>
                <span className={styles.quickStatLabel}>Active Sessions</span>
                <span className={styles.quickStatValue}>
                  {stats?.activeSessions?.toLocaleString() || 0}
                </span>
              </div>
              <div className={styles.quickStat}>
                <span className={styles.quickStatLabel}>Pro Users</span>
                <span className={styles.quickStatValue}>
                  {stats?.proUsers?.toLocaleString() || 0}
                </span>
              </div>
              <div className={styles.quickStat}>
                <span className={styles.quickStatLabel}>Enterprise</span>
                <span className={styles.quickStatValue}>
                  {stats?.enterpriseUsers?.toLocaleString() || 0}
                </span>
              </div>
              <div className={styles.quickStat}>
                <span className={styles.quickStatLabel}>Churn Rate</span>
                <span className={styles.quickStatValue}>
                  {stats?.churnRate || 0}%
                </span>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;