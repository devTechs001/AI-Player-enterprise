import { motion } from 'framer-motion';
import { FiUsers } from 'react-icons/fi';
import '../Admin.scss';

const Users = () => {
  return (
    <div className="admin-page">
      <div className="page-header">
        <h1>User Management</h1>
        <p>Manage user accounts and permissions</p>
      </div>
      <motion.div
        className="empty-state"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="empty-icon">
          <FiUsers />
        </div>
        <h2>User management interface</h2>
        <p>View and manage all user accounts</p>
      </motion.div>
    </div>
  );
};

export default Users;
