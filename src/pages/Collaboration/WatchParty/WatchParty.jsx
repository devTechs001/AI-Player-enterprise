import { motion } from 'framer-motion';
import { FiTv } from 'react-icons/fi';
import '../Collaboration.scss';

const WatchParty = () => {
  return (
    <div className="collaboration-page">
      <div className="page-header">
        <h1>Watch Party</h1>
        <p>Watch together with friends</p>
      </div>
      <motion.div
        className="empty-state"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="empty-icon">
          <FiTv />
        </div>
        <h2>Watch Party Room</h2>
        <p>Synchronized viewing experience</p>
      </motion.div>
    </div>
  );
};

export default WatchParty;
