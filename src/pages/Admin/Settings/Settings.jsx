import { motion } from 'framer-motion';
import { FiSettings } from 'react-icons/fi';
import '../Admin.scss';

const Settings = () => {
  return (
    <div className="admin-page">
      <div className="page-header">
        <h1>Admin Settings</h1>
        <p>Configure platform settings</p>
      </div>
      <motion.div
        className="empty-state"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="empty-icon">
          <FiSettings />
        </div>
        <h2>Settings panel</h2>
        <p>Configure platform-wide settings</p>
      </motion.div>
    </div>
  );
};

export default Settings;
