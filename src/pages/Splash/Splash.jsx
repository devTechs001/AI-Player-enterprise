import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Logo from '@components/common/Logo';
import styles from './Splash.module.scss';

const Splash = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.splash}>
      {/* Animated Background */}
      <div className={styles.background}>
        <div className={styles.gradient1} />
        <div className={styles.gradient2} />
        <div className={styles.particles}>
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className={styles.particle}
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: Math.random() * 0.5 + 0.5,
                opacity: Math.random() * 0.5 + 0.25,
              }}
              animate={{
                y: [null, Math.random() * -100 - 50],
                opacity: [null, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                repeatType: 'loop',
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Logo Animation */}
        <motion.div
          className={styles.logoWrapper}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
        >
          <div className={styles.logoGlow} />
          <Logo size="large" animated />
        </motion.div>

        {/* Title */}
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          AI Video Player
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className={styles.tagline}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Experience the future of video
        </motion.p>

        {/* Progress Bar */}
        <motion.div
          className={styles.progressWrapper}
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 200 }}
          transition={{ delay: 0.7, duration: 0.4 }}
        >
          <div className={styles.progressTrack}>
            <motion.div
              className={styles.progressBar}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <span className={styles.progressText}>Loading...</span>
        </motion.div>

        {/* Features Preview */}
        <motion.div
          className={styles.features}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          {['AI Enhanced', '4K Quality', 'Fast Downloads'].map((feature, index) => (
            <motion.span
              key={feature}
              className={styles.feature}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 + index * 0.1 }}
            >
              {feature}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Version */}
      <motion.div
        className={styles.version}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        Version 1.0.0
      </motion.div>
    </div>
  );
};

export default Splash;