import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiPlay, FiDownload, FiUsers, FiClock, FiTrendingUp,
  FiTrendingDown, FiDollarSign, FiEye, FiHeart, FiShare2
} from 'react-icons/fi';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import './Analytics.scss';

const statsData = [
  { title: 'Total Views', value: '2.4M', change: '+12.5%', icon: FiEye, trend: 'up' },
  { title: 'Watch Time', value: '847K hrs', change: '+8.2%', icon: FiClock, trend: 'up' },
  { title: 'Downloads', value: '156K', change: '+23.1%', icon: FiDownload, trend: 'up' },
  { title: 'Favorites', value: '89.2K', change: '+5.7%', icon: FiHeart, trend: 'up' },
];

const viewsData = [
  { name: 'Mon', views: 4000, downloads: 2400 },
  { name: 'Tue', views: 3000, downloads: 1398 },
  { name: 'Wed', views: 2000, downloads: 9800 },
  { name: 'Thu', views: 2780, downloads: 3908 },
  { name: 'Fri', views: 1890, downloads: 4800 },
  { name: 'Sat', views: 2390, downloads: 3800 },
  { name: 'Sun', views: 3490, downloads: 4300 },
];

const deviceData = [
  { name: 'Desktop', value: 45 },
  { name: 'Mobile', value: 35 },
  { name: 'Tablet', value: 15 },
  { name: 'Smart TV', value: 5 },
];

const COLORS = ['#8b5cf6', '#06b6d4', '#f59e0b', '#ef4444'];

const topContent = [
  { rank: 1, title: 'AI Tutorial Series', views: '458K', downloads: '89K', rating: 4.9 },
  { rank: 2, title: 'Music Collection 2024', views: '392K', downloads: '72K', rating: 4.8 },
  { rank: 3, title: 'Documentary: Tech Future', views: '287K', downloads: '54K', rating: 4.7 },
  { rank: 4, title: 'Live Concert Recording', views: '245K', downloads: '48K', rating: 4.9 },
  { rank: 5, title: 'Educational Content Pack', views: '198K', downloads: '41K', rating: 4.6 },
];

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <div>
          <h1>Analytics Dashboard</h1>
          <p>Track your content performance and user engagement</p>
        </div>
        <div className="time-range-selector">
          {['24h', '7d', '30d', '90d', '1y'].map((range) => (
            <button
              key={range}
              className={timeRange === range ? 'active' : ''}
              onClick={() => setTimeRange(range)}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {statsData.map((stat, index) => (
          <motion.div
            key={stat.title}
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="stat-header">
              <span className="stat-title">{stat.title}</span>
              <div className={`stat-icon ${stat.trend === 'up' ? 'positive' : 'negative'}`}>
                <stat.icon />
              </div>
            </div>
            <div className="stat-value">{stat.value}</div>
            <div className={`stat-change ${stat.trend === 'up' ? 'positive' : 'negative'}`}>
              {stat.trend === 'up' ? <FiTrendingUp /> : <FiTrendingDown />}
              <span>{stat.change}</span>
              <span className="stat-period">vs last period</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="charts-row">
        <motion.div
          className="chart-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3>Views & Downloads</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={viewsData}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorDownloads" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip
                contentStyle={{
                  background: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Area type="monotone" dataKey="views" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorViews)" />
              <Area type="monotone" dataKey="downloads" stroke="#06b6d4" fillOpacity={1} fill="url(#colorDownloads)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="chart-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3>Device Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={deviceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {deviceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Top Content */}
      <motion.div
        className="top-content-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h3>Top Performing Content</h3>
        <div className="content-table">
          <div className="table-header">
            <span>Rank</span>
            <span>Title</span>
            <span>Views</span>
            <span>Downloads</span>
            <span>Rating</span>
          </div>
          {topContent.map((item, index) => (
            <div key={item.rank} className="table-row">
              <span className="rank">{item.rank}</span>
              <span className="title">{item.title}</span>
              <span className="views">{item.views}</span>
              <span className="downloads">{item.downloads}</span>
              <span className="rating">
                <FiHeart className="rating-icon" />
                {item.rating}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;
