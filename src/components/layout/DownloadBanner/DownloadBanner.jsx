import { motion, AnimatePresence } from 'framer-motion';
import { FiDownload, FiXCircle } from 'react-icons/fi';
import { useDownload } from '@hooks/useDownload';
import styles from './DownloadBanner.module.scss';

const formatBytes = (bytes) => {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

const DownloadBanner = () => {
  const { downloads, cancelDownload, activeDownloads } = useDownload();

  const active = downloads.find(d => d.status === 'downloading' || d.status === 'paused');
  if (!active) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={styles.banner}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      >
        <div className={styles.bannerContent}>
          <div className={styles.bannerLeft}>
            <FiDownload className={styles.icon} />
            <div className={styles.fileInfo}>
              <span className={styles.filename}>{active.title || active.filename || 'Downloading...'}</span>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${active.progress || 0}%` }} />
              </div>
            </div>
          </div>
          <div className={styles.stats}>
            <span className={styles.percent}>{Math.round(active.progress || 0)}%</span>
            <span className={styles.speed}>{active.speed > 0 ? `${active.speed} Mbps` : '...'}</span>
            <span className={styles.size}>
              {formatBytes(active.downloaded || 0)}
              {active.total > 0 && <> / {formatBytes(active.total)}</>}
            </span>
          </div>
          <button className={styles.cancelBtn} onClick={() => cancelDownload(active.id)} title="Cancel">
            <FiXCircle />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DownloadBanner;
