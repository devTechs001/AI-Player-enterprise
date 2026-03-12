import { motion } from 'framer-motion';
import { FiCheck, FiAlertTriangle, FiX } from 'react-icons/fi';
import './Status.scss';

const services = [
  { name: 'Video Streaming', status: 'operational', uptime: '99.99%' },
  { name: 'Download Service', status: 'operational', uptime: '99.95%' },
  { name: 'AI Processing', status: 'operational', uptime: '99.90%' },
  { name: 'Authentication', status: 'operational', uptime: '100%' },
  { name: 'API Services', status: 'degraded', uptime: '98.50%' },
  { name: 'Storage', status: 'operational', uptime: '99.99%' },
];

const Status = () => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational':
        return <FiCheck />;
      case 'degraded':
        return <FiAlertTriangle />;
      case 'outage':
        return <FiX />;
      default:
        return <FiCheck />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational':
        return '#10b981';
      case 'degraded':
        return '#f59e0b';
      case 'outage':
        return '#ef4444';
      default:
        return '#10b981';
    }
  };

  return (
    <div className="status-page">
      <div className="status-header">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>System Status</h1>
          <p>Real-time status of all AI Video Player services</p>
        </motion.div>
        <div className="overall-status">
          <span className="status-indicator" style={{ background: '#10b981' }} />
          <span>All Systems Operational</span>
        </div>
      </div>

      <div className="services-list">
        {services.map((service, index) => (
          <motion.div
            key={service.name}
            className="service-card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="service-info">
              <span className="service-name">{service.name}</span>
              <span className="service-uptime">{service.uptime} uptime</span>
            </div>
            <div
              className="service-status"
              style={{ color: getStatusColor(service.status) }}
            >
              {getStatusIcon(service.status)}
              <span>{service.status}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="incidents-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2>Recent Incidents</h2>
        <div className="incidents-list">
          <div className="incident-card">
            <div className="incident-header">
              <span className="incident-title">API Response Time Degradation</span>
              <span className="incident-date">January 10, 2024</span>
            </div>
            <p>Resolved - API response times were elevated for approximately 30 minutes.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Status;
