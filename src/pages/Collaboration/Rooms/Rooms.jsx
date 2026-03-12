import { motion } from 'framer-motion';
import { FiUsers } from 'react-icons/fi';
import Button from '@components/common/Button';
import '../Collaboration.scss';

const Rooms = () => {
  return (
    <div className="collaboration-page">
      <div className="page-header">
        <h1>Collaboration Rooms</h1>
        <p>Create or join rooms to watch together</p>
      </div>
      <motion.div
        className="rooms-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Button variant="primary" size="large">Create New Room</Button>
        <div className="empty-state">
          <div className="empty-icon">
            <FiUsers />
          </div>
          <h2>No active rooms</h2>
          <p>Create a room to start watching with friends</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Rooms;
