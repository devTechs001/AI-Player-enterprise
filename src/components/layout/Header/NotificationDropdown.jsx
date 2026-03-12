import { FiBell } from 'react-icons/fi';
import './NotificationDropdown.scss';

const NotificationDropdown = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="notification-dropdown">
      <div className="dropdown-header">
        <FiBell />
        <span>Notifications</span>
      </div>
      <div className="dropdown-content">
        <p className="empty-message">No new notifications</p>
      </div>
    </div>
  );
};

export default NotificationDropdown;
