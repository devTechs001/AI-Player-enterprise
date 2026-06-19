import { motion } from 'framer-motion';
import { FiDownload, FiClock, FiCheck, FiX, FiRefreshCw } from 'react-icons/fi';
import { useDownload } from '@hooks/useDownload';
import './Downloads.scss';

const formatSize = (bytes) => {
  if (!bytes) return '';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

const Downloads = () => {
  const { downloads, queue, history, cancelDownload, retryDownload } = useDownload();

  const activeDownloads = downloads.filter(
    (d) => d.status === 'downloading' || d.status === 'paused'
  );
  const queuedDownloads = [...queue, ...downloads.filter((d) => d.status === 'queued')];
  const completedDownloads = history.filter((d) => d.status === 'completed');

  return (
    <div className="downloads-page">
      <div className="page-header">
        <h1><FiDownload /> Downloads</h1>
        <p>Manage your video downloads</p>
      </div>

      <section className="section">
        <h2>Active Downloads ({activeDownloads.length})</h2>
        <div className="downloads-list">
          {activeDownloads.map((download) => (
            <motion.div
              key={download.id}
              className="download-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="download-info">
                <h3>{download.title}</h3>
                <div className="progress-bar">
                  <div className="progress" style={{ width: `${download.progress}%` }} />
                </div>
                <span className="progress-text">
                  {download.progress}% complete
                  {download.speed ? ` - ${formatSize(download.speed)}/s` : ''}
                </span>
              </div>
              <button className="cancel-btn" onClick={() => cancelDownload(download.id)}>
                <FiX />
              </button>
            </motion.div>
          ))}
          {activeDownloads.length === 0 && (
            <p className="empty-state">No active downloads</p>
          )}
        </div>
      </section>

      <section className="section">
        <h2>Queued ({queuedDownloads.length})</h2>
        <div className="downloads-list">
          {queuedDownloads.map((download) => (
            <div key={download.id} className="download-item queued">
              <div className="download-info">
                <h3>{download.title}</h3>
                <span className="size">
                  {formatSize(download.total || download.fileSize)}
                </span>
              </div>
              <button className="cancel-btn" onClick={() => cancelDownload(download.id)}>
                <FiX />
              </button>
            </div>
          ))}
          {queuedDownloads.length === 0 && (
            <p className="empty-state">No queued downloads</p>
          )}
        </div>
      </section>

      <section className="section">
        <h2>Completed ({completedDownloads.length})</h2>
        <div className="downloads-list">
          {completedDownloads.map((download) => (
            <div key={download.id} className="download-item completed">
              <div className="download-info">
                <h3>{download.title}</h3>
                <span className="size">{formatSize(download.fileSize)}</span>
              </div>
              <div className="actions">
                {download.status === 'failed' && (
                  <button
                    className="action-btn"
                    onClick={() => retryDownload(download.id)}
                  >
                    <FiRefreshCw /> Retry
                  </button>
                )}
              </div>
            </div>
          ))}
          {completedDownloads.length === 0 && (
            <p className="empty-state">No completed downloads</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Downloads;
