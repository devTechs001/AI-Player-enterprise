import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiBell, FiMail, FiMessageSquare } from 'react-icons/fi';
import Switch from '@components/common/Switch';
import '../Profile.scss';

const Notifications = () => {
  const [settings, setSettings] = useState({
    push: true,
    email: true,
    marketing: false,
    newVideos: true,
    comments: true,
  });

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>Notifications</h1>
        <p>Manage your notification preferences</p>
      </div>

      <motion.div
        className="profile-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="notification-group">
          <div className="group-header">
            <FiBell />
            <span>Push Notifications</span>
          </div>
          <div className="toggle-setting">
            <span>Enable push notifications</span>
            <Switch checked={settings.push} onChange={(v) => setSettings({ ...settings, push: v })} />
          </div>
        </div>

        <div className="notification-group">
          <div className="group-header">
            <FiMail />
            <span>Email Notifications</span>
          </div>
          <div className="toggle-setting">
            <span>Enable email notifications</span>
            <Switch checked={settings.email} onChange={(v) => setSettings({ ...settings, email: v })} />
          </div>
        </div>

        <div className="notification-group">
          <div className="group-header">
            <FiMessageSquare />
            <span>Activity</span>
          </div>
          <div className="toggle-setting">
            <span>New video uploads</span>
            <Switch checked={settings.newVideos} onChange={(v) => setSettings({ ...settings, newVideos: v })} />
          </div>
          <div className="toggle-setting">
            <span>Comments and replies</span>
            <Switch checked={settings.comments} onChange={(v) => setSettings({ ...settings, comments: v })} />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Notifications;
