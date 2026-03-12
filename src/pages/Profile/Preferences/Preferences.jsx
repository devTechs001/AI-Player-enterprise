import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMoon, FiSun, FiMonitor } from 'react-icons/fi';
import Button from '@components/common/Button';
import '../Profile.scss';

const Preferences = () => {
  const [theme, setTheme] = useState('dark');
  const [quality, setQuality] = useState('auto');
  const [autoplay, setAutoplay] = useState(true);

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>Preferences</h1>
        <p>Customize your experience</p>
      </div>

      <div className="profile-content">
        <motion.div
          className="profile-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2>Theme</h2>
          <div className="theme-selector">
            <button
              className={theme === 'dark' ? 'active' : ''}
              onClick={() => setTheme('dark')}
            >
              <FiMoon />
              <span>Dark</span>
            </button>
            <button
              className={theme === 'light' ? 'active' : ''}
              onClick={() => setTheme('light')}
            >
              <FiSun />
              <span>Light</span>
            </button>
            <button
              className={theme === 'system' ? 'active' : ''}
              onClick={() => setTheme('system')}
            >
              <FiMonitor />
              <span>System</span>
            </button>
          </div>
        </motion.div>

        <motion.div
          className="profile-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2>Playback</h2>
          <div className="setting-group">
            <label>Default Quality</label>
            <select value={quality} onChange={(e) => setQuality(e.target.value)}>
              <option value="auto">Auto</option>
              <option value="2160">4K (2160p)</option>
              <option value="1080">Full HD (1080p)</option>
              <option value="720">HD (720p)</option>
              <option value="480">SD (480p)</option>
            </select>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Preferences;
