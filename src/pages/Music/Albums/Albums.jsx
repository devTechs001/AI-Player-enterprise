import { motion } from 'framer-motion';
import { FiDisc } from 'react-icons/fi';
import '../Music.scss';

const Albums = () => {
  return (
    <div className="music-page">
      <div className="page-header">
        <h1>Albums</h1>
        <p>Browse your album collection</p>
      </div>
      <motion.div
        className="empty-state"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="empty-icon">
          <FiDisc />
        </div>
        <h2>Albums</h2>
        <p>No albums yet</p>
      </motion.div>
    </div>
  );
};

export default Albums;
