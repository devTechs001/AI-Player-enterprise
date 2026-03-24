import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiCompass, 
  FiMusic, 
  FiStar, 
  FiTrendingUp, 
  FiHeart, 
  FiPlay, 
  FiArrowRight,
  FiZap,
  FiActivity,
  FiMic
} from 'react-icons/fi';
import styles from './Discover.module.scss';
import Button from '@components/common/Button';

const Discover = () => {
  const categories = [
    { name: 'Pop', icon: <FiStar />, color: 'var(--color-primary)' },
    { name: 'Rock', icon: <FiZap />, color: 'var(--color-accent)' },
    { name: 'Electronic', icon: <FiActivity />, color: 'var(--color-secondary)' },
    { name: 'Hip Hop', icon: <FiMic />, color: 'var(--color-success)' },
    { name: 'Jazz', icon: <FiMusic />, color: 'var(--color-info)' },
    { name: 'Ambient', icon: <FiCompass />, color: 'var(--color-warning)' },
  ];

  const featured = [
    {
      id: 1,
      title: 'Neon Nights',
      description: 'The best electronic beats for your night drive',
      tag: 'Trending',
      image: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 2,
      title: 'Acoustic Soul',
      description: 'Relaxing unplugged sessions for a peaceful afternoon',
      tag: 'New Release',
      image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <div className={styles.discoverPage}>
      <header className={styles.header}>
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          Discover
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          Find your new favorite sound from our global collection
        </motion.p>
      </header>

      <section className={styles.categorySection}>
        <div className={styles.sectionHeader}>
          <h2>Featured Playlists</h2>
          <div className={styles.viewAll}>
            View All <FiArrowRight />
          </div>
        </div>
        <div className={styles.featuredGrid}>
          {featured.map((item, index) => (
            <motion.div
              key={item.id}
              className={styles.featuredCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <img src={item.image} alt={item.title} />
              <div className={styles.cardOverlay}>
                <span className={styles.tag}>{item.tag}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="mt-4 flex gap-2">
                  <Button variant="primary" size="sm" icon={<FiPlay />}>
                    Play Now
                  </Button>
                  <Button variant="secondary" size="sm" icon={<FiHeart />} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className={styles.categorySection}>
        <div className={styles.sectionHeader}>
          <h2>Browse Categories</h2>
        </div>
        <div className={styles.categoryGrid}>
          {categories.map((cat, index) => (
            <motion.div
              key={cat.name}
              className={styles.categoryCard}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
            >
              <div className={styles.icon} style={{ color: cat.color }}>
                {cat.icon}
              </div>
              <span>{cat.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      <section className={styles.categorySection}>
        <div className={styles.sectionHeader}>
          <h2>Personalized for You</h2>
          <div className={styles.viewAll}>
            Refresh <FiTrendingUp />
          </div>
        </div>
        <div className={styles.recommendationsGrid}>
          {/* Placeholder for dynamic recommendations */}
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-square bg-dark-800 rounded-xl animate-pulse" />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Discover;
