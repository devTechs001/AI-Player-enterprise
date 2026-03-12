import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiLock, FiKey, FiShield } from 'react-icons/fi';
import Button from '@components/common/Button';
import Input from '@components/common/Input';
import Switch from '@components/common/Switch';
import '../Profile.scss';

const Security = () => {
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>Security Settings</h1>
        <p>Manage your password and security preferences</p>
      </div>

      <div className="profile-content">
        <motion.div
          className="profile-card form-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2>Change Password</h2>
          <form className="settings-form">
            <div className="form-group">
              <label><FiLock /> Current Password</label>
              <input type="password" placeholder="Enter current password" />
            </div>
            <div className="form-group">
              <label><FiKey /> New Password</label>
              <input type="password" placeholder="Enter new password" />
            </div>
            <div className="form-group">
              <label><FiKey /> Confirm New Password</label>
              <input type="password" placeholder="Confirm new password" />
            </div>
            <div className="form-actions">
              <Button variant="primary">Update Password</Button>
            </div>
          </form>
        </motion.div>

        <motion.div
          className="profile-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2>Two-Factor Authentication</h2>
          <p>Add an extra layer of security to your account</p>
          <div className="toggle-setting">
            <div className="toggle-info">
              <FiShield />
              <div>
                <span className="toggle-title">Enable 2FA</span>
                <span className="toggle-description">Require a code when signing in</span>
              </div>
            </div>
            <Switch checked={twoFactor} onChange={setTwoFactor} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Security;
