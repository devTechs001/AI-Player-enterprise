import { motion } from 'framer-motion';
import { FiUser } from 'react-icons/fi';
import '../Music.scss';

const Artists = () => {
  return (
    <div className="music-page">
      <div className="page-header">
        <h1>Artists</h1>
        <p>Browse your favorite artists</p>
      </div>
      <motion.div
        className="empty-state"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="empty-icon">
          <FiUser />
        </div>
        <h2>Artists</h2>
        <p>No artists yet</p>
      </motion.div>
    </div>
  );
};

export default Artists;
