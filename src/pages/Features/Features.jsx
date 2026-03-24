import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FiPlay, FiDownload, FiZap, FiUsers, FiGlobe, FiShield,
  FiMonitor, FiHeadphones, FiType, FiRepeat, FiShuffle,
  FiBarChart2, FiSettings, FiStar, FiCheck, FiArrowRight
} from 'react-icons/fi';
import Button from '@components/common/Button';
import styles from './Features.module.scss';

const Features = () => {
  const features = [
    {
      icon: FiZap,
      title: 'AI-Powered Video Player',
      description: 'Advanced AI features including smart recommendations, auto-subtitles, and content analysis for the ultimate viewing experience.',
      highlights: ['Smart Recommendations', 'Auto-Generated Subtitles', 'Content Analysis'],
      color: 'var(--color-primary)'
    },
    {
      icon: FiDownload,
      title: 'Universal Download Manager',
      description: 'Download videos from 1000+ platforms in any format. Support for batch downloads and pause/resume functionality.',
      highlights: ['50+ Formats Supported', 'Batch Downloads', 'Pause & Resume'],
      color: 'var(--color-success)'
    },
    {
      icon: FiUsers,
      title: 'Real-Time Collaboration',
      description: 'Watch videos together with friends. Sync playback, chat, and share reactions in real-time.',
      highlights: ['Sync Playback', 'Live Chat', 'Share Reactions'],
      color: 'var(--color-secondary)'
    },
    {
      icon: FiGlobe,
      title: 'Cross-Platform Sync',
      description: 'Seamlessly continue watching where you left off on any device. Your progress follows you everywhere.',
      highlights: ['Multi-Device Support', 'Progress Sync', 'Cloud Storage'],
      color: 'var(--color-info)'
    },
    {
      icon: FiShield,
      title: 'Privacy & Security',
      description: 'End-to-end encryption and zero data logging. Your privacy and security are our top priorities.',
      highlights: ['End-to-End Encryption', 'Zero Data Logging', 'Secure Storage'],
      color: 'var(--color-warning)'
    },
    {
      icon: FiMonitor,
      title: 'Advanced Player Controls',
      description: 'Professional-grade video controls with customizable shortcuts, picture-in-picture, and theater mode.',
      highlights: ['Custom Shortcuts', 'Picture-in-Picture', 'Theater Mode'],
      color: 'var(--color-accent)'
    }
  ];

  return (
    <div className={styles.featuresPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <div className={styles.gradientOrb1} />
          <div className={styles.gradientOrb2} />
          <div className={styles.gridPattern} />
        </div>
        
        <motion.div
          className={styles.heroContent}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className={styles.badge}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <FiZap />
            <span>Next-Gen Features</span>
          </motion.div>

          <h1 className={styles.title}>
            Powerful Features for
            <span className={styles.gradient}> Ultimate Video Experience</span>
          </h1>

          <p className={styles.subtitle}>
            Discover cutting-edge features that transform how you watch, 
            download, and interact with videos. Built with AI at the core.
          </p>

          <div className={styles.heroActions}>
            <Link to="/register">
              <Button variant="primary" size="large" icon={<FiArrowRight />}>
                Get Started Free
              </Button>
            </Link>
            <Link to="/demo">
              <Button variant="outline" size="large">
                Watch Demo
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className={styles.featuresSection}>
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Everything You Need for Video Excellence</h2>
            <p>Professional-grade features designed for power users and casual viewers alike</p>
          </motion.div>

          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className={styles.featureCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <div className={styles.featureIcon} style={{ color: feature.color }}>
                  <feature.icon />
                </div>
                
                <div className={styles.featureContent}>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                  
                  <div className={styles.featureHighlights}>
                    {feature.highlights.map((highlight, idx) => (
                      <div key={idx} className={styles.highlight}>
                        <FiCheck className={styles.checkIcon} />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specs */}
      <section className={styles.specsSection}>
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Technical Excellence</h2>
            <p>Built with cutting-edge technology for unmatched performance</p>
          </motion.div>

          <div className={styles.specsGrid}>
            <div className={styles.specCard}>
              <div className={styles.specIcon}>
                <FiBarChart2 />
              </div>
              <div className={styles.specContent}>
                <h4>Performance Optimized</h4>
                <p>Hardware acceleration and adaptive streaming for smooth playback</p>
              </div>
            </div>

            <div className={styles.specCard}>
              <div className={styles.specIcon}>
                <FiSettings />
              </div>
              <div className={styles.specContent}>
                <h4>Highly Customizable</h4>
                <p>Extensive settings and personalization options</p>
              </div>
            </div>

            <div className={styles.specCard}>
              <div className={styles.specIcon}>
                <FiStar />
              </div>
              <div className={styles.specContent}>
                <h4>Industry Leading</h4>
                <p>Trusted by millions of users worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <motion.div
            className={styles.ctaContent}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Ready to Experience the Future?</h2>
            <p>Join millions of users enjoying the most advanced video platform</p>
            
            <div className={styles.ctaActions}>
              <Link to="/register">
                <Button variant="primary" size="large" icon={<FiPlay />}>
                  Start Free Trial
                </Button>
              </Link>
              <Link to="/features#all">
                <Button variant="outline" size="large">
                  Explore All Features
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Features;