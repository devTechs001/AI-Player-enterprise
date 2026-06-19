import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiHome, FiVideo, FiDownload, FiMusic, FiClock, FiHeart,
  FiList, FiFolder, FiBarChart2, FiUser, FiSettings, FiLogOut,
  FiMenu, FiX, FiShield, FiCreditCard, FiChevronDown, FiStar,
} from 'react-icons/fi';
import { useAuth } from '@hooks/useAuth';
import Logo from '@components/common/Logo';
import './Sidebar.scss';

const mainNav = [
  { name: 'Overview', href: '/dashboard', icon: FiHome },
  { name: 'Videos', href: '/dashboard/videos', icon: FiVideo },
  { name: 'Downloads', href: '/dashboard/downloads', icon: FiDownload },
  { name: 'Music', href: '/dashboard/music', icon: FiMusic },
  { name: 'History', href: '/dashboard/history', icon: FiClock },
  { name: 'Favorites', href: '/dashboard/favorites', icon: FiHeart },
  { name: 'Playlists', href: '/dashboard/playlists', icon: FiList },
  { name: 'Library', href: '/dashboard/library', icon: FiFolder },
  { name: 'Analytics', href: '/dashboard/analytics', icon: FiBarChart2 },
];

const accountNav = [
  { name: 'Profile', href: '/profile', icon: FiUser },
  { name: 'Settings', href: '/profile/settings', icon: FiSettings },
  { name: 'Subscription', href: '/subscription/billing', icon: FiCreditCard },
];

const Sidebar = ({ isOpen, onClose, collapsed, onToggle }) => {
  const location = useLocation();
  const { user, hasRole, logout } = useAuth();

  const isActive = (path) => {
    if (path === '/dashboard') return location.pathname === '/dashboard';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="sidebar-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <aside className={`sidebar ${collapsed ? 'sidebar-collapsed' : ''} ${isOpen ? 'sidebar-visible' : ''}`}>
        <div className="sidebar-header">
          <Link to="/" className="sidebar-logo">
            {!collapsed && <Logo size="medium" />}
            {collapsed && <span className="sidebar-logo-icon">AV</span>}
          </Link>
          <button className="sidebar-close" onClick={onClose} aria-label="Close sidebar">
            <FiX />
          </button>
          <button className="sidebar-collapse-btn" onClick={onToggle} aria-label="Toggle sidebar">
            <FiMenu />
          </button>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            {!collapsed && <span className="nav-section-title">Main</span>}
            {mainNav.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`nav-item ${isActive(item.href) ? 'active' : ''}`}
                onClick={onClose}
              >
                <item.icon className="nav-icon" />
                {!collapsed && <span className="nav-label">{item.name}</span>}
              </Link>
            ))}
          </div>

          <div className="nav-section">
            {!collapsed && <span className="nav-section-title">Account</span>}
            {accountNav.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`nav-item ${isActive(item.href) ? 'active' : ''}`}
                onClick={onClose}
              >
                <item.icon className="nav-icon" />
                {!collapsed && <span className="nav-label">{item.name}</span>}
              </Link>
            ))}
            {hasRole(['admin', 'superadmin']) && (
              <Link
                to="/admin"
                className={`nav-item admin-nav ${isActive('/admin') ? 'active' : ''}`}
                onClick={onClose}
              >
                <FiShield className="nav-icon" />
                {!collapsed && <span className="nav-label">Admin</span>}
              </Link>
            )}
          </div>
        </nav>

        <div className="sidebar-footer">
          {!collapsed && user && (
            <div className="sidebar-user">
              <div className="sidebar-user-avatar">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name || 'User'} />
                ) : (
                  <span>{user.name?.charAt(0) || 'U'}</span>
                )}
              </div>
              <div className="sidebar-user-info">
                <span className="sidebar-user-name">{user.name || 'User'}</span>
                <span className="sidebar-user-plan">{user.subscription?.plan || 'Free'}</span>
              </div>
            </div>
          )}
          <button className="nav-item logout" onClick={logout}>
            <FiLogOut className="nav-icon" />
            {!collapsed && <span className="nav-label">Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
