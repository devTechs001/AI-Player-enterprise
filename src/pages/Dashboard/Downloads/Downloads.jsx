import { motion } from 'framer-motion';
import { FiDownload, FiClock, FiCheck, FiX } from 'react-icons/fi';
import './Downloads.scss';

const Downloads = () => {
  const downloads = [
    { id: 1, title: 'Introduction to AI', progress: 100, status: 'completed', size: '245 MB' },
    { id: 2, title: 'Advanced Machine Learning', progress: 75, status: 'downloading', size: '1.2 GB' },
    { id: 3, title: 'Deep Learning Fundamentals', progress: 0, status: 'queued', size: '890 MB' },
  ];

  return (
    <div className="downloads-page">
      <div className="page-header">
        <h1><FiDownload /> Downloads</h1>
        <p>Manage your video downloads</p>
      </div>

      {/* Active Downloads */}
      <section className="section">
        <h2>Active Downloads</h2>
        <div className="downloads-list">
          {downloads.filter(d => d.status === 'downloading').map((download) => (
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
                <span className="progress-text">{download.progress}% complete</span>
              </div>
              <button className="cancel-btn"><FiX /></button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Queued */}
      <section className="section">
        <h2>Queued</h2>
        <div className="downloads-list">
          {downloads.filter(d => d.status === 'queued').map((download) => (
            <div key={download.id} className="download-item queued">
              <div className="download-info">
                <h3>{download.title}</h3>
                <span className="size">{download.size}</span>
              </div>
              <button className="cancel-btn"><FiX /></button>
            </div>
          ))}
        </div>
      </section>

      {/* Completed */}
      <section className="section">
        <h2>Completed</h2>
        <div className="downloads-list">
          {downloads.filter(d => d.status === 'completed').map((download) => (
            <div key={download.id} className="download-item completed">
              <div className="download-info">
                <h3>{download.title}</h3>
                <span className="size">{download.size}</span>
              </div>
              <div className="actions">
                <button className="action-btn"><FiClock /> Watch Later</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Downloads;
