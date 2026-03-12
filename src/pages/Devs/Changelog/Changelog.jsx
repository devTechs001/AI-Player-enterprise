import { motion } from 'framer-motion';
import { FiGitCommit } from 'react-icons/fi';
import '../Devs.scss';

const Changelog = () => {
  const changes = [
    { version: 'v2.1.0', date: 'Jan 10, 2024', type: 'feature', description: 'Added new AI-powered video enhancement' },
    { version: 'v2.0.5', date: 'Jan 5, 2024', type: 'fix', description: 'Fixed playback issues on Safari' },
    { version: 'v2.0.0', date: 'Dec 20, 2023', type: 'major', description: 'Major release with new API endpoints' },
  ];

  return (
    <div className="devs-page">
      <div className="page-header">
        <h1>Changelog</h1>
        <p>Latest updates and improvements</p>
      </div>
      <motion.div
        className="changelog-list"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {changes.map((change, index) => (
          <div key={change.version} className="changelog-item">
            <div className="changelog-header">
              <span className="version">{change.version}</span>
              <span className="date">{change.date}</span>
            </div>
            <p>{change.description}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Changelog;
