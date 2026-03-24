import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiActivity, 
  FiServer, 
  FiShield, 
  FiGlobe, 
  FiClock, 
  FiAlertCircle,
  FiZap
} from 'react-icons/fi';
import styles from './Status.module.scss';

const Status = () => {
  const systems = [
    { name: 'API Services', status: 'operational', uptime: '99.99%', icon: <FiActivity />, value: '124ms' },
    { name: 'Video Processing', status: 'operational', uptime: '99.95%', icon: <FiZap />, value: '0.8s' },
    { name: 'Content Delivery (CDN)', status: 'operational', uptime: '100%', icon: <FiGlobe />, value: 'Global' },
    { name: 'Database Clusters', status: 'operational', uptime: '99.99%', icon: <FiServer />, value: 'Active' },
    { name: 'Security Gateway', status: 'operational', uptime: '100%', icon: <FiShield />, value: 'Secure' },
    { name: 'Authentication', status: 'operational', uptime: '99.98%', icon: <FiClock />, value: 'Verified' },
  ];

  const incidents = [
    { date: 'Oct 24, 2023', title: 'Scheduled Maintenance', content: 'Database optimization and security patches applied successfully.' },
    { date: 'Oct 12, 2023', title: 'API Latency', content: 'Resolved an issue causing increased response times in European regions.' },
    { date: 'Sep 28, 2023', title: 'New CDN Node Deployment', content: 'Added 5 new edge locations to improve delivery speeds in Asia-Pacific.' }
  ];

  return (
    <div className={styles.statusPage}>
      <header className={styles.header}>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          System Status
        </motion.h1>
        <motion.div 
          className={styles.overallStatus}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span className={styles.dot} />
          All Systems Operational
        </motion.div>
      </header>

      <div className={styles.metricsGrid}>
        {systems.map((system, index) => (
          <motion.div
            key={system.name}
            className={styles.metricCard}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className={styles.cardHeader}>
              <div className={styles.icon}>{system.icon}</div>
              <span className={`${styles.status} ${styles[system.status]}`}>
                {system.status}
              </span>
            </div>
            <div className={styles.value}>{system.value}</div>
            <div className={styles.label}>{system.name}</div>
            <div className={styles.chartPlaceholder} />
            <div className="mt-4 flex justify-between text-xs text-tertiary">
              <span>Uptime</span>
              <span>{system.uptime}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <section className={styles.incidentsSection}>
        <div className={styles.sectionHeader}>
          <h2><FiAlertCircle className="inline mr-2" /> Recent Incidents</h2>
        </div>
        <div className={styles.incidentList}>
          {incidents.map((incident, index) => (
            <motion.div
              key={index}
              className={styles.incidentItem}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <div className={styles.date}>{incident.date}</div>
              <div className={styles.content}>
                <h3>{incident.title}</h3>
                <p>{incident.content}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="mt-12 text-center text-sm text-tertiary">
        <p>System status is updated every 60 seconds. Last updated: {new Date().toLocaleTimeString()}</p>
      </footer>
    </div>
  );
};

export default Status;
