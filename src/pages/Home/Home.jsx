import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FiPlay,
  FiDownload,
  FiZap,
  FiGlobe,
  FiShield,
  FiUsers,
  FiStar,
  FiArrowRight,
  FiCheck,
} from 'react-icons/fi';
import { useAuth } from '@hooks/useAuth';
import Button from '@components/common/Button';
import VideoCard from '@components/common/Card/VideoCard';
import Testimonials from './components/Testimonials';
import FeaturedVideos from './components/FeaturedVideos';
import styles from './Home.module.scss';

const features = [
  {
    icon: FiZap,
    title: 'AI-Powered',
    description: 'Smart recommendations, auto-subtitles, and content analysis powered by advanced AI.',
  },
  {
    icon: FiDownload,
    title: 'Universal Download',
    description: 'Download videos in any format - MP4, MKV, AVI, WebM, and 50+ more formats.',
  },
  {
    icon: FiGlobe,
    title: 'Multi-Platform',
    description: 'Support for YouTube, Vimeo, Dailymotion, and 1000+ video platforms.',
  },
  {
    icon: FiShield,
    title: 'Privacy First',
    description: 'End-to-end encryption and zero data logging. Your privacy is our priority.',
  },
  {
    icon: FiUsers,
    title: 'Watch Together',
    description: 'Real-time collaboration with friends. Sync playback across devices.',
  },
  {
    icon: FiStar,
    title: 'Premium Quality',
    description: 'Up to 8K video quality with HDR support and lossless audio.',
  },
];

const stats = [
  { value: '10M+', label: 'Active Users' },
  { value: '500M+', label: 'Downloads' },
  { value: '1000+', label: 'Platforms' },
  { value: '99.9%', label: 'Uptime' },
];

const Home = () => {
  const { isAuthenticated, startGuestSession } = useAuth();
  const [downloadUrl, setDownloadUrl] = useState('');

  const handleQuickDownload = () => {
    if (downloadUrl) {
      // Navigate to download page with URL
      window.location.href = `/download?url=${encodeURIComponent(downloadUrl)}`;
    }
  };

  return (
    <div className={styles.home}>
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
            <span>AI-Powered Video Platform</span>
          </motion.div>

          <h1 className={styles.title}>
            The Ultimate
            <span className={styles.gradient}> AI Video Player </span>
            & Downloader
          </h1>

          <p className={styles.subtitle}>
            Experience next-gen video streaming with AI enhancements, 
            universal downloads, and seamless collaboration. 
            Download any video, anywhere, in any format.
          </p>

          {/* Quick Download Bar */}
          <div className={styles.downloadBar}>
            <input
              type="text"
              placeholder="Paste video URL here..."
              value={downloadUrl}
              onChange={(e) => setDownloadUrl(e.target.value)}
              className={styles.urlInput}
            />
            <Button 
              variant="primary" 
              size="large" 
              onClick={handleQuickDownload}
              icon={<FiDownload />}
            >
              Download
            </Button>
          </div>

          <div className={styles.supportedPlatforms}>
            <span>Supports:</span>
            <div className={styles.platforms}>
              <img src="/assets/icons/youtube.svg" alt="YouTube" />
              <img src="/assets/icons/vimeo.svg" alt="Vimeo" />
              <img src="/assets/icons/dailymotion.svg" alt="Dailymotion" />
              <img src="/assets/icons/twitch.svg" alt="Twitch" />
              <span>+1000 more</span>
            </div>
          </div>

          <div className={styles.heroButtons}>
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button variant="primary" size="large" icon={<FiPlay />}>
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/register">
                  <Button variant="primary" size="large" icon={<FiArrowRight />}>
                    Get Started Free
                  </Button>
                </Link>
                <Button 
                  variant="secondary" 
                  size="large" 
                  onClick={startGuestSession}
                  icon={<FiPlay />}
                >
                  Try as Guest
                </Button>
              </>
            )}
          </div>
        </motion.div>

        {/* Hero Video Preview */}
        <motion.div
          className={styles.heroPreview}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className={styles.playerPreview}>
            <div className={styles.playerMockup}>
              <div className={styles.playerHeader}>
                <div className={styles.dots}>
                  <span />
                  <span />
                  <span />
                </div>
              </div>
              <div className={styles.playerContent}>
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster="/assets/images/player-preview.jpg"
                >
                  <source src="/assets/videos/demo.mp4" type="video/mp4" />
                </video>
                <div className={styles.playerOverlay}>
                  <div className={styles.aiIndicator}>
                    <FiZap />
                    <span>AI Enhanced</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className={styles.stats}>
        <div className={styles.container}>
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className={styles.statItem}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Powerful Features</h2>
            <p>Everything you need for the ultimate video experience</p>
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
                whileHover={{ y: -5 }}
              >
                <div className={styles.featureIcon}>
                  <feature.icon />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Videos */}
      <FeaturedVideos />

      {/* Download Formats */}
      <section className={styles.formats}>
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeader}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Download in Any Format</h2>
            <p>Support for 50+ video and audio formats</p>
          </motion.div>

          <div className={styles.formatsGrid}>
            {['MP4', 'MKV', 'AVI', 'MOV', 'WebM', 'FLV', 'MP3', 'AAC', 'FLAC', 'WAV'].map((format, index) => (
              <motion.div
                key={format}
                className={styles.formatBadge}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                {format}
              </motion.div>
            ))}
          </div>

          <div className={styles.qualityOptions}>
            <div className={styles.qualityCard}>
              <h4>Video Quality</h4>
              <ul>
                <li><FiCheck /> 8K Ultra HD</li>
                <li><FiCheck /> 4K HDR</li>
                <li><FiCheck /> 1080p Full HD</li>
                <li><FiCheck /> 720p HD</li>
                <li><FiCheck /> 480p SD</li>
              </ul>
            </div>
            <div className={styles.qualityCard}>
              <h4>Audio Quality</h4>
              <ul>
                <li><FiCheck /> Lossless FLAC</li>
                <li><FiCheck /> 320kbps MP3</li>
                <li><FiCheck /> AAC High Quality</li>
                <li><FiCheck /> Dolby Atmos</li>
                <li><FiCheck /> Spatial Audio</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <motion.div
            className={styles.ctaContent}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Ready to Get Started?</h2>
            <p>Join millions of users enjoying the best video experience</p>
            <div className={styles.ctaButtons}>
              <Link to="/register">
                <Button variant="primary" size="large">
                  Create Free Account
                </Button>
              </Link>
              <Link to="/subscription/plans">
                <Button variant="outline" size="large">
                  View Plans
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;