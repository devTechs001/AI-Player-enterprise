import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiShield, FiCheck, FiX, FiAlertTriangle, FiUser, FiSearch, FiFilter } from 'react-icons/fi';
import Button from '@components/common/Button';
import Badge from '@components/common/Badge';
import './Moderation.scss';

const reports = [
  { id: 1, type: 'content', reason: 'Inappropriate content', user: 'john_doe', status: 'pending', priority: 'high', date: '2024-01-15' },
  { id: 2, type: 'comment', reason: 'Spam', user: 'jane_smith', status: 'pending', priority: 'medium', date: '2024-01-15' },
  { id: 3, type: 'user', reason: 'Harassment', user: 'user123', status: 'reviewing', priority: 'high', date: '2024-01-14' },
  { id: 4, type: 'content', reason: 'Copyright violation', user: 'content_creator', status: 'pending', priority: 'critical', date: '2024-01-14' },
  { id: 5, type: 'comment', reason: 'Hate speech', user: 'anon_user', status: 'resolved', priority: 'high', date: '2024-01-13' },
];

const stats = [
  { label: 'Pending', value: 24, color: '#f59e0b' },
  { label: 'Reviewing', value: 8, color: '#3b82f6' },
  { label: 'Resolved', value: 156, color: '#10b981' },
  { label: 'Critical', value: 3, color: '#ef4444' },
];

const Moderation = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getPriorityColor = (priority) => {
    const colors = {
      low: '#64748b',
      medium: '#3b82f6',
      high: '#f59e0b',
      critical: '#ef4444',
    };
    return colors[priority] || colors.low;
  };

  const getStatusBadge = (status) => {
    const variants = {
      pending: 'warning',
      reviewing: 'info',
      resolved: 'success',
    };
    return variants[status] || 'default';
  };

  return (
    <div className="moderation-page">
      <div className="moderation-header">
        <div>
          <h1>Content Moderation</h1>
          <p>Review and manage reported content</p>
        </div>
        <div className="moderation-actions">
          <div className="search-box">
            <FiSearch />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="primary" icon={<FiFilter />}>
            Filters
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="moderation-stats">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card">
            <span className="stat-value" style={{ color: stat.color }}>{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Reports Table */}
      <motion.div
        className="reports-table"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="table-header">
          <div className="filter-tabs">
            {['all', 'pending', 'reviewing', 'resolved'].map((tab) => (
              <button
                key={tab}
                className={filter === tab ? 'active' : ''}
                onClick={() => setFilter(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="table-body">
          {reports.map((report) => (
            <div key={report.id} className="report-row">
              <div className="report-info">
                <div className="report-type">
                  <FiAlertTriangle />
                  <span>{report.type}</span>
                </div>
                <div className="report-details">
                  <span className="report-reason">{report.reason}</span>
                  <span className="report-user">
                    <FiUser />
                    {report.user}
                  </span>
                  <span className="report-date">{report.date}</span>
                </div>
              </div>
              <div className="report-meta">
                <Badge
                  variant="outline"
                  style={{ borderColor: getPriorityColor(report.priority), color: getPriorityColor(report.priority) }}
                >
                  {report.priority}
                </Badge>
                <Badge variant={getStatusBadge(report.status)}>
                  {report.status}
                </Badge>
              </div>
              <div className="report-actions">
                <Button variant="ghost" size="small" icon={<FiCheck />} />
                <Button variant="ghost" size="small" icon={<FiX />} />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Moderation;
