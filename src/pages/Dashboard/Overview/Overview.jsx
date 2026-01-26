import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiPlay,
  FiDownload,
  FiClock,
  FiHeart,
  FiTrendingUp,
  FiMusic,
  FiVideo,
  FiFolder,
  FiArrowRight,
  FiZap,
  FiUsers,
  FiCalendar,
} from 'react-icons/fi';
import { useAuth } from '@hooks/useAuth';
import { useQuery } from 'react-query';
import { videoService } from '@services/video.service';
import StatCard from '@components/dashboard/StatCard';
import RecentActivity from '@components/dashboard/RecentActivity';
import QuickActions from '@components/dashboard/QuickActions';
import UsageStats from '@components/dashboard/UsageStats';
import WelcomeBanner from '@components/dashboard/WelcomeBanner';
import VideoCard from '@components/common/Card/VideoCard';
import Chart from '@components/dashboard/Chart';
import styles from './Overview.module.scss';

const Overview = () => {
  const { user, subscription } = useAuth();

  const { data: stats, isLoading: statsLoading } = useQuery(
    'dashboardStats',
    videoService.getDashboardStats
  );

  const { data: recentVideos, isLoading: videosLoading } = useQuery(
    'recentVideos',
    () => videoService.getRecentVideos(6)
  );

  const { data: activity, isLoading: activityLoading } = useQuery(
    'recentActivity',
    videoService.getRecentActivity
  );

  const { data: recommendations } = useQuery(
    'recommendations',
    videoService.getRecommendations
  );

  const quickActions = [
    { icon: FiDownload, label: 'Download Video', path: '/download', color: '#3b82f6' },
    { icon: FiPlay, label: 'Watch History', path: '/dashboard/history', color: '#10b981' },
    { icon: FiHeart, label: 'Favorites', path: '/dashboard/favorites', color: '#ef4444' },
    { icon: FiMusic, label: 'Music Library', path: '/music', color: '#8b5cf6' },
    { icon: FiUsers, label: 'Watch Party', path: '/collaboration/rooms', color: '#f59e0b' },
    { icon: FiFolder, label: 'My Library', path: '/dashboard/library', color: '#06b6d4' },
  ];

  return (
    <div className={styles.overview}>
      {/* Welcome Banner */}
      <WelcomeBanner user={user} subscription={subscription} />

      {/* Stats Grid */}
      <div className={styles.statsGrid}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <StatCard
            icon={FiVideo}
            label="Total Videos"
            value={stats?.totalVideos || 0}
            change={stats?.videoChange}
            color="#3b82f6"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <StatCard
            icon={FiDownload}
            label="Downloads"
            value={stats?.totalDownloads || 0}
            change={stats?.downloadChange}
            color="#10b981"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <StatCard
            icon={FiClock}
            label="Watch Time"
            value={`${stats?.watchTimeHours || 0}h`}
            change={stats?.watchTimeChange}
            color="#f59e0b"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <StatCard
            icon={FiZap}
            label="AI Enhancements"
            value={stats?.aiEnhancements || 0}
            change={stats?.aiChange}
            color="#8b5cf6"
          />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Left Column */}
        <div className={styles.leftColumn}>
          {/* Quick Actions */}
          <motion.section
            className={styles.section}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className={styles.sectionTitle}>Quick Actions</h2>
            <div className={styles.quickActions}>
              {quickActions.map((action, index) => (
                <Link
                  key={action.path}
                  to={action.path}
                  className={styles.quickAction}
                  style={{ '--action-color': action.color }}
                >
                  <div className={styles.actionIcon}>
                    <action.icon />
                  </div>
                  <span>{action.label}</span>
                </Link>
              ))}
            </div>
          </motion.section>

          {/* Recent Videos */}
          <motion.section
            className={styles.section}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Continue Watching</h2>
              <Link to="/dashboard/history" className={styles.viewAll}>
                View All <FiArrowRight />
              </Link>
            </div>

            <div className={styles.videosGrid}>
              {videosLoading ? (
                [...Array(6)].map((_, i) => (
                  <div key={i} className={styles.videoSkeleton} />
                ))
              ) : (
                recentVideos?.map((video) => (
                  <VideoCard key={video.id} video={video} showProgress />
                ))
              )}
            </div>
          </motion.section>

          {/* Usage Chart */}
          <motion.section
            className={styles.section}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h2 className={styles.sectionTitle}>Usage Overview</h2>
            <div className={styles.chartWrapper}>
              <Chart
                data={stats?.usageData || []}
                type="area"
                xKey="date"
                yKey="value"
                color="#3b82f6"
              />
            </div>
          </motion.section>

          {/* AI Recommendations */}
          {recommendations?.length > 0 && (
            <motion.section
              className={styles.section}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>
                  <FiZap className={styles.aiIcon} />
                  AI Recommendations
                </h2>
                <Link to="/dashboard/discover" className={styles.viewAll}>
                  Discover More <FiArrowRight />
                </Link>
              </div>

              <div className={styles.videosGrid}>
                {recommendations.slice(0, 4).map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </motion.section>
          )}
        </div>

        {/* Right Column */}
        <div className={styles.rightColumn}>
          {/* Storage Usage */}
          <motion.section
            className={styles.widget}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className={styles.widgetTitle}>Storage</h3>
            <UsageStats
              used={stats?.storageUsed || 0}
              total={subscription?.storageLimit || 10 * 1024 * 1024 * 1024}
            />
          </motion.section>

          {/* Recent Activity */}
          <motion.section
            className={styles.widget}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className={styles.widgetTitle}>Recent Activity</h3>
            <RecentActivity
              activities={activity || []}
              isLoading={activityLoading}
            />
          </motion.section>

          {/* Subscription Info */}
          <motion.section
            className={styles.widget}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h3 className={styles.widgetTitle}>Your Plan</h3>
            <div className={styles.planInfo}>
              <div className={styles.planBadge}>
                {subscription?.plan || 'Free'}
              </div>
              <p className={styles.planDetails}>
                {subscription?.plan === 'free' ? (
                  <>
                    Upgrade to Pro for unlimited downloads and 4K quality.
                  </>
                ) : (
                  <>
                    Next billing: {new Date(subscription?.nextBilling).toLocaleDateString()}
                  </>
                )}
              </p>
              {subscription?.plan === 'free' && (
                <Link to="/subscription/plans">
                  <button className={styles.upgradeBtn}>
                    Upgrade Now
                  </button>
                </Link>
              )}
            </div>
          </motion.section>

          {/* Download Queue */}
          <motion.section
            className={styles.widget}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className={styles.widgetHeader}>
              <h3 className={styles.widgetTitle}>Download Queue</h3>
              <Link to="/dashboard/downloads" className={styles.widgetLink}>
                View All
              </Link>
            </div>
            <div className={styles.downloadQueue}>
              {stats?.activeDownloads?.length > 0 ? (
                stats.activeDownloads.map((download) => (
                  <div key={download.id} className={styles.downloadItem}>
                    <img src={download.thumbnail} alt={download.title} />
                    <div className={styles.downloadInfo}>
                      <span className={styles.downloadTitle}>{download.title}</span>
                      <div className={styles.downloadProgress}>
                        <div
                          className={styles.progressBar}
                          style={{ width: `${download.progress}%` }}
                        />
                      </div>
                    </div>
                    <span className={styles.downloadPercent}>
                      {Math.round(download.progress)}%
                    </span>
                  </div>
                ))
              ) : (
                <p className={styles.emptyQueue}>No active downloads</p>
              )}
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default Overview;