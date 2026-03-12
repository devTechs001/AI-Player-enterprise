import { motion } from 'framer-motion';
import { FiMonitor, FiSmartphone, FiTablet, FiTrash2 } from 'react-icons/fi';
import Button from '@components/common/Button';
import '../Profile.scss';

const Devices = () => {
  const devices = [
    { name: 'MacBook Pro', type: 'Desktop', lastActive: 'Now', current: true },
    { name: 'iPhone 15 Pro', type: 'Mobile', lastActive: '2 hours ago', current: false },
    { name: 'iPad Pro', type: 'Tablet', lastActive: '1 day ago', current: false },
  ];

  const getIcon = (type) => {
    switch (type) {
      case 'Desktop': return <FiMonitor />;
      case 'Mobile': return <FiSmartphone />;
      case 'Tablet': return <FiTablet />;
      default: return <FiMonitor />;
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>Connected Devices</h1>
        <p>Manage your logged-in devices</p>
      </div>

      <motion.div
        className="profile-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="devices-list">
          {devices.map((device, index) => (
            <div key={index} className="device-item">
              <div className="device-icon">
                {getIcon(device.type)}
              </div>
              <div className="device-info">
                <div className="device-header">
                  <span className="device-name">{device.name}</span>
                  {device.current && <span className="current-badge">Current</span>}
                </div>
                <span className="device-type">{device.type}</span>
                <span className="device-active">Last active: {device.lastActive}</span>
              </div>
              {!device.current && (
                <Button variant="ghost" size="small" icon={<FiTrash2 />} />
              )}
            </div>
          ))}
        </div>
        <div className="devices-actions">
          <Button variant="danger">Sign Out All Devices</Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Devices;
