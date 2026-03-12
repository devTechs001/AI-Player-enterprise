import { motion } from 'framer-motion';
import { FiZap, FiTrendingUp, FiClock, FiStar } from 'react-icons/fi';
import VideoCard from '@components/common/Card/VideoCard';
import './Discover.scss';

const Discover = () => {
  const recommendations = [
    { id: 1, title: 'AI Basics', thumbnail: '/thumbnails/ai1.jpg', duration: '12:30' },
    { id: 2, title: 'Machine Learning Intro', thumbnail: '/thumbnails/ml1.jpg', duration: '18:45' },
    { id: 3, title: 'Deep Learning', thumbnail: '/thumbnails/dl1.jpg', duration: '25:00' },
    { id: 4, title: 'Neural Networks', thumbnail: '/thumbnails/nn1.jpg', duration: '20:15' },
  ];

  const categories = [
    { name: 'Trending', icon: FiTrendingUp },
    { name: 'Recommended', icon: FiStar },
    { name: 'New Releases', icon: FiZap },
    { name: 'Continue Watching', icon: FiClock },
  ];

  return (
    <div className="discover-page">
      <div className="page-header">
        <h1><FiZap /> Discover</h1>
        <p>AI-powered recommendations just for you</p>
      </div>

      {/* Categories */}
      <div className="categories">
        {categories.map((cat) => (
          <button key={cat.name} className="category-btn">
            <cat.icon />
            {cat.name}
          </button>
        ))}
      </div>

      {/* Recommendations */}
      <section className="section">
        <h2>Recommended for You</h2>
        <div className="videos-grid">
          {recommendations.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <VideoCard video={video} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="section">
        <h2><FiTrendingUp /> Trending Now</h2>
        <div className="videos-grid">
          {recommendations.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              <VideoCard video={video} />
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Discover;
