import { motion } from 'framer-motion';
import { FiHeart } from 'react-icons/fi';
import '../Dashboard.scss';

const Favorites = () => {
  return (
    <div className="dashboard-page favorites-page">
      <div className="page-header">
        <h1>Favorites</h1>
        <p>Your favorited content</p>
      </div>
      <motion.div
        className="empty-state"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="empty-icon">
          <FiHeart />
        </div>
        <h2>No favorites yet</h2>
        <p>Save your favorite videos here</p>
      </motion.div>
    </div>
  );
};

export default Favorites;
