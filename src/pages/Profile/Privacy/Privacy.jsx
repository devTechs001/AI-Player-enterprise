import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiLock, FiEye, FiEyeOff, FiShield, FiDownload, FiUsers, FiBell } from 'react-icons/fi';
import Button from '@components/common/Button';
import Switch from '@components/common/Switch';
import './Privacy.scss';

const Privacy = () => {
  const [settings, setSettings] = useState({
    profileVisibility: 'public',
    watchHistory: true,
    downloadHistory: false,
    activityStatus: true,
    personalizedAds: false,
    dataSharing: false,
    analytics: true,
  });

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="privacy-page">
      <div className="privacy-header">
        <h1>Privacy Settings</h1>
        <p>Control your data and privacy preferences</p>
      </div>

      <div className="privacy-sections">
        {/* Profile Privacy */}
        <motion.section
          className="privacy-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="section-icon">
            <FiUsers />
          </div>
          <div className="section-content">
            <h2>Profile Privacy</h2>
            <p>Control who can see your profile information</p>
            <div className="option-group">
              {['public', 'friends', 'private'].map((option) => (
                <label key={option} className="radio-option">
                  <input
                    type="radio"
                    name="profileVisibility"
                    checked={settings.profileVisibility === option}
                    onChange={() => updateSetting('profileVisibility', option)}
                  />
                  <span className="radio-label">{option.charAt(0).toUpperCase() + option.slice(1)}</span>
                </label>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Activity Privacy */}
        <motion.section
          className="privacy-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="section-icon">
            <FiEye />
          </div>
          <div className="section-content">
            <h2>Activity Privacy</h2>
            <p>Manage your activity visibility and history</p>
            <div className="toggle-group">
              <div className="toggle-item">
                <div className="toggle-info">
                  <span className="toggle-title">Watch History</span>
                  <span className="toggle-description">Track videos you watch</span>
                </div>
                <Switch
                  checked={settings.watchHistory}
                  onChange={(value) => updateSetting('watchHistory', value)}
                />
              </div>
              <div className="toggle-item">
                <div className="toggle-info">
                  <span className="toggle-title">Download History</span>
                  <span className="toggle-description">Track your downloads</span>
                </div>
                <Switch
                  checked={settings.downloadHistory}
                  onChange={(value) => updateSetting('downloadHistory', value)}
                />
              </div>
              <div className="toggle-item">
                <div className="toggle-info">
                  <span className="toggle-title">Activity Status</span>
                  <span className="toggle-description">Show when you're active</span>
                </div>
                <Switch
                  checked={settings.activityStatus}
                  onChange={(value) => updateSetting('activityStatus', value)}
                />
              </div>
            </div>
          </div>
        </motion.section>

        {/* Data & Permissions */}
        <motion.section
          className="privacy-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="section-icon">
            <FiShield />
          </div>
          <div className="section-content">
            <h2>Data & Permissions</h2>
            <p>Manage how your data is used</p>
            <div className="toggle-group">
              <div className="toggle-item">
                <div className="toggle-info">
                  <span className="toggle-title">Personalized Ads</span>
                  <span className="toggle-description">See ads based on your activity</span>
                </div>
                <Switch
                  checked={settings.personalizedAds}
                  onChange={(value) => updateSetting('personalizedAds', value)}
                />
              </div>
              <div className="toggle-item">
                <div className="toggle-info">
                  <span className="toggle-title">Data Sharing</span>
                  <span className="toggle-description">Share data with third parties</span>
                </div>
                <Switch
                  checked={settings.dataSharing}
                  onChange={(value) => updateSetting('dataSharing', value)}
                />
              </div>
              <div className="toggle-item">
                <div className="toggle-info">
                  <span className="toggle-title">Analytics</span>
                  <span className="toggle-description">Help improve our service</span>
                </div>
                <Switch
                  checked={settings.analytics}
                  onChange={(value) => updateSetting('analytics', value)}
                />
              </div>
            </div>
          </div>
        </motion.section>

        {/* Download Privacy */}
        <motion.section
          className="privacy-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="section-icon">
            <FiDownload />
          </div>
          <div className="section-content">
            <h2>Download Privacy</h2>
            <p>Control download visibility and access</p>
            <div className="download-options">
              <label className="checkbox-option">
                <input type="checkbox" defaultChecked />
                <span>Make downloads private by default</span>
              </label>
              <label className="checkbox-option">
                <input type="checkbox" />
                <span>Allow others to see my public downloads</span>
              </label>
              <label className="checkbox-option">
                <input type="checkbox" defaultChecked />
                <span>Encrypt downloaded content</span>
              </label>
            </div>
          </div>
        </motion.section>
      </div>

      <div className="privacy-actions">
        <Button variant="secondary">Reset to Defaults</Button>
        <Button variant="primary">Save Changes</Button>
      </div>
    </div>
  );
};

export default Privacy;
