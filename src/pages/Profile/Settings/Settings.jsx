import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiPhone } from 'react-icons/fi';
import Button from '@components/common/Button';
import Input from '@components/common/Input';
import '../Profile.scss';

const Settings = () => {
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '',
    bio: '',
  });

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>Account Settings</h1>
        <p>Update your account information</p>
      </div>

      <motion.div
        className="profile-card form-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <form className="settings-form">
          <div className="form-group">
            <label><FiUser /> Display Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label><FiMail /> Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label><FiPhone /> Phone Number</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="Optional"
            />
          </div>

          <div className="form-group">
            <label>Bio</label>
            <textarea
              rows={4}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Tell us about yourself"
            />
          </div>

          <div className="form-actions">
            <Button variant="outline">Cancel</Button>
            <Button variant="primary">Save Changes</Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Settings;
