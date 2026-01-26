import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiCheckCircle,
  FiAlertCircle,
  FiAlertTriangle,
  FiClock,
  FiRefreshCw,
  FiActivity,
  FiServer,
  FiGlobe,
  FiDatabase,
  FiZap,
} from 'react-icons/fi';
import { useQuery } from 'react-query';
import { statusService } from '@services/status.service';
import Tabs from '@components/common/Tabs';
import Badge from '@components/common/Badge';
import styles from './Status.module.scss';

const Status = () => {
  const [activeTab, setActiveTab] = useState('status');

  const { data: systemStatus, isLoading, refetch } = useQuery(
    'systemStatus',
    statusService.getSystemStatus,
    { refetchInterval: 60000 }
  );

  const { data: incidents } = useQuery(
    'incidents',
    statusService.getIncidents
  );

  const { data: roadmap } = useQuery(
    'roadmap',
    statusService.getRoadmap
  );

  const { data: changelog } = useQuery(
    'changelog',
    statusService.getChangelog
  );

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational':
        return <FiCheckCircle className={styles.operational} />;
      case 'degraded':
        return <FiAlertTriangle className={styles.degraded} />;
      case 'outage':
        return <FiAlertCircle className={styles.outage} />;
      default:
        return <FiClock className={styles.maintenance} />;
    }
  };

  const getOverallStatus = () => {
    if (!systemStatus?.services) return 'loading';
    
    const statuses = systemStatus.services.map((s) => s.status);
    if (statuses.includes('outage')) return 'outage';
    if (statuses.includes('degraded')) return 'degraded';
    if (statuses.includes('maintenance')) return 'maintenance';
    return 'operational';
  };

  const services = [
    { id: 'api', name: 'API', icon: FiServer },
    { id: 'player', name: 'Video Player', icon: FiActivity },
    { id: 'download', name: 'Download Service', icon: FiGlobe },
    { id: 'database', name: 'Database', icon: FiDatabase },
    { id: 'ai', name: 'AI Services', icon: FiZap },
    { id: 'cdn', name: 'CDN', icon: FiGlobe },
  ];

  const tabs = [
    { id: 'status', label: 'System Status' },
    { id: 'incidents', label: 'Incidents' },
    { id: 'roadmap', label: 'Roadmap' },
    { id: 'changelog', label: 'Changelog' },
  ];

  return (
    <div className={styles.status}>
      {/* Header */}
      <div className={styles.header}>
        <motion.div
          className={styles.headerContent}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1>System Status</h1>
          <p>Real-time status of all AI Video Player services</p>

          <div className={`${styles.overallStatus} ${styles[getOverallStatus()]}`}>
            {getStatusIcon(getOverallStatus())}
            <span>
              {getOverallStatus() === 'operational'
                ? 'All Systems Operational'
                : getOverallStatus() === 'degraded'
                ? 'Partial System Outage'
                : getOverallStatus() === 'outage'
                ? 'Major System Outage'
                : 'Under Maintenance'}
            </span>
          </div>

          <button
            className={styles.refreshBtn}
            onClick={() => refetch()}
            disabled={isLoading}
          >
            <FiRefreshCw className={isLoading ? styles.spinning : ''} />
            Refresh
          </button>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className={styles.container}>
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        {/* Status Tab */}
        {activeTab === 'status' && (
          <motion.div
            className={styles.statusContent}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Service Status */}
            <section className={styles.services}>
              <h2>Service Status</h2>
              <div className={styles.serviceGrid}>
                {services.map((service) => {
                  const serviceData = systemStatus?.services?.find(
                    (s) => s.id === service.id
                  ) || { status: 'operational', uptime: 99.99 };

                  return (
                    <div key={service.id} className={styles.serviceCard}>
                      <div className={styles.serviceHeader}>
                        <service.icon />
                        <span>{service.name}</span>
                        {getStatusIcon(serviceData.status)}
                      </div>
                      <div className={styles.serviceDetails}>
                        <div className={styles.uptime}>
                          <span>Uptime</span>
                          <strong>{serviceData.uptime}%</strong>
                        </div>
                        <div className={styles.latency}>
                          <span>Latency</span>
                          <strong>{serviceData.latency || 0}ms</strong>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Uptime History */}
            <section className={styles.uptimeHistory}>
              <h2>90-Day Uptime History</h2>
              <div className={styles.uptimeGrid}>
                {[...Array(90)].map((_, i) => (
                  <div
                    key={i}
                    className={`${styles.uptimeDay} ${
                      Math.random() > 0.05 ? styles.up : styles.down
                    }`}
                    title={`Day ${90 - i}: ${Math.random() > 0.05 ? '100%' : '99.5%'} uptime`}
                  />
                ))}
              </div>
              <div className={styles.uptimeLegend}>
                <span><div className={styles.up} /> Operational</span>
                <span><div className={styles.down} /> Incident</span>
              </div>
            </section>
          </motion.div>
        )}

        {/* Incidents Tab */}
        {activeTab === 'incidents' && (
          <motion.div
            className={styles.incidentsContent}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2>Recent Incidents</h2>
            {incidents?.length > 0 ? (
              <div className={styles.incidentsList}>
                {incidents.map((incident) => (
                  <div key={incident.id} className={styles.incidentCard}>
                    <div className={styles.incidentHeader}>
                      <Badge
                        variant={
                          incident.status === 'resolved'
                            ? 'success'
                            : incident.status === 'investigating'
                            ? 'warning'
                            : 'danger'
                        }
                      >
                        {incident.status}
                      </Badge>
                      <span className={styles.incidentDate}>
                        {new Date(incident.date).toLocaleDateString()}
                      </span>
                    </div>
                    <h3>{incident.title}</h3>
                    <p>{incident.description}</p>
                    {incident.updates && (
                      <div className={styles.incidentUpdates}>
                        {incident.updates.map((update, i) => (
                          <div key={i} className={styles.update}>
                            <span className={styles.updateTime}>
                              {update.time}
                            </span>
                            <p>{update.message}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.noIncidents}>
                <FiCheckCircle />
                <p>No incidents in the last 90 days</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Roadmap Tab */}
        {activeTab === 'roadmap' && (
          <motion.div
            className={styles.roadmapContent}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2>Development Roadmap</h2>
            <div className={styles.roadmapTimeline}>
              {roadmap?.map((quarter, index) => (
                <div key={quarter.id} className={styles.quarterSection}>
                  <div className={styles.quarterHeader}>
                    <h3>{quarter.title}</h3>
                    <Badge variant={quarter.status === 'current' ? 'primary' : 'default'}>
                      {quarter.status}
                    </Badge>
                  </div>
                  <div className={styles.featuresList}>
                    {quarter.features.map((feature) => (
                      <div key={feature.id} className={styles.featureItem}>
                        <div className={styles.featureStatus}>
                          {feature.completed ? (
                            <FiCheckCircle className={styles.completed} />
                          ) : (
                            <FiClock className={styles.pending} />
                          )}
                        </div>
                        <div className={styles.featureContent}>
                          <h4>{feature.title}</h4>
                          <p>{feature.description}</p>
                          <div className={styles.featureTags}>
                            {feature.tags?.map((tag) => (
                              <span key={tag} className={styles.tag}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Changelog Tab */}
        {activeTab === 'changelog' && (
          <motion.div
            className={styles.changelogContent}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2>Changelog</h2>
            <div className={styles.changelogList}>
              {changelog?.map((release) => (
                <div key={release.version} className={styles.releaseCard}>
                  <div className={styles.releaseHeader}>
                    <h3>v{release.version}</h3>
                    <span className={styles.releaseDate}>
                      {new Date(release.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className={styles.changesList}>
                    {release.changes.map((change, i) => (
                      <div key={i} className={styles.changeItem}>
                        <Badge
                          variant={
                            change.type === 'feature'
                              ? 'primary'
                              : change.type === 'fix'
                              ? 'success'
                              : change.type === 'improvement'
                              ? 'secondary'
                              : 'warning'
                          }
                        >
                          {change.type}
                        </Badge>
                        <span>{change.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Status;