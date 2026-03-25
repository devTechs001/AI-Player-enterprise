import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiZap, FiVideo, FiMusic, FiDownload, FiShield, FiGlobe } from 'react-icons/fi';
import Logo from '@components/common/Logo';
import { useTheme } from '@hooks/useTheme';
import styles from './Splash.module.scss';

const Splash = () => {
  const [progress, setProgress] = useState(0);
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const { theme } = useTheme();

  const features = [
    { icon: FiZap, text: 'AI-Powered Enhancement', color: '#6366f1' },
    { icon: FiVideo, text: '4K Ultra HD Quality', color: '#8b5cf6' },
    { icon: FiDownload, text: 'Lightning Fast Downloads', color: '#0ea5e9' },
    { icon: FiMusic, text: 'Audio Extraction', color: '#ec4899' },
    { icon: FiShield, text: 'Secure & Private', color: '#22c55e' },
    { icon: FiGlobe, text: '1000+ Platforms Supported', color: '#f97316' },
  ];

  useEffect(() => {
    // Minimum display time of 4 seconds (4000ms)
    const minDisplayTime = 4000;
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const targetProgress = Math.min((elapsed / minDisplayTime) * 100, 100);
      
      setProgress((prev) => {
        const newProgress = Math.min(prev + 2, targetProgress);
        if (newProgress >= 100) {
          clearInterval(interval);
          // Show complete state for additional 1 second before exiting
          setTimeout(() => setIsComplete(true), 1000);
          return 100;
        }
        return newProgress;
      });
    }, 30);

    // Rotate features
    const featureInterval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 600);

    return () => {
      clearInterval(interval);
      clearInterval(featureInterval);
    };
  }, []);

  return (
    <div className={`${styles.splash} ${styles[theme]}`}>
      {/* Animated Background Mesh */}
      <div className={styles.background}>
        <div className={styles.meshGradient}>
          <motion.div
            className={`${styles.meshBlob} ${styles.blob1}`}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className={`${styles.meshBlob} ${styles.blob2}`}
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className={`${styles.meshBlob} ${styles.blob3}`}
            animate={{
              scale: [1, 1.3, 1],
              x: [0, 100, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        {/* Grid Pattern */}
        <div className={styles.gridPattern} />

        {/* Floating Particles */}
        <div className={styles.particles}>
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className={styles.particle}
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                scale: Math.random() * 0.5 + 0.5,
                opacity: 0,
              }}
              animate={{
                y: [null, Math.random() * -200 - 100],
                opacity: [0, 0.8, 0],
                scale: [null, Math.random() * 1.5 + 0.5],
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                repeatType: 'loop',
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.content}>
        {/* Logo Section */}
        <motion.div
          className={styles.logoSection}
          initial={{ scale: 0.5, opacity: 0, rotateY: 180 }}
          animate={{ scale: 1, opacity: 1, rotateY: 0 }}
          transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
        >
          <div className={styles.logoContainer}>
            <motion.div
              className={styles.logoRing}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className={styles.logoRing2}
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            />
            <Logo size="large" animated />
            <div className={styles.logoPulse} />
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          className={styles.titleSection}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <h1 className={styles.title}>
            <span className={styles.ai}>AI</span> Video Player
          </h1>
          <p className={styles.tagline}>Experience the Future of Media</p>
        </motion.div>

        {/* Feature Carousel */}
        <motion.div
          className={styles.featureCarousel}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentFeature}
              className={styles.featureItem}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.8 }}
              transition={{ duration: 0.4 }}
            >
              <div className={styles.featureIcon}>
                {(() => {
                  const FeatureIcon = features[currentFeature].icon;
                  return <FeatureIcon />;
                })()}
              </div>
              <span className={styles.featureText}>
                {features[currentFeature].text}
              </span>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Progress Section */}
        <motion.div
          className={styles.progressSection}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className={styles.progressContainer}>
            <div className={styles.progressTrack}>
              <motion.div
                className={styles.progressBar}
                style={{
                  width: `${Math.min(progress, 100)}%`,
                  background: `linear-gradient(90deg, ${features[currentFeature].color}, ${features[(currentFeature + 1) % features.length].color})`,
                }}
              >
                <div className={styles.progressGlow} />
              </motion.div>
            </div>
            <motion.span
              className={styles.progressText}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              {isComplete ? 'Launching...' : progress < 100 ? 'Initializing...' : 'Ready!'}
            </motion.span>
          </div>

          {/* Progress Dots */}
          <div className={styles.progressDots}>
            {[25, 50, 75, 100].map((threshold, index) => (
              <motion.div
                key={threshold}
                className={`${styles.dot} ${progress >= threshold ? styles.active : ''}`}
                initial={{ scale: 0 }}
                animate={{ scale: progress >= threshold ? 1 : 0.5 }}
                transition={{ delay: 1.3 + index * 0.1 }}
              />
            ))}
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          className={styles.stats}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <div className={styles.statItem}>
            <span className={styles.statValue}>99.9%</span>
            <span className={styles.statLabel}>Uptime</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statValue}>10M+</span>
            <span className={styles.statLabel}>Downloads</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statValue}>4K</span>
            <span className={styles.statLabel}>Quality</span>
          </div>
        </motion.div>
      </div>

      {/* Version Badge */}
      <motion.div
        className={styles.versionBadge}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.5 }}
      >
        <span className={styles.version}>v2.0.0</span>
        <span className={styles.build}>Enterprise Edition</span>
      </motion.div>

      {/* Loading Complete Indicator */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            className={styles.completeIndicator}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', bounce: 0.5 }}
          >
            <motion.div
              className={styles.checkmark}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
            >
              ✓
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Splash;
