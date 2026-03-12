import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiHome, FiVideo, FiDownload, FiMusic, FiClock, FiHeart,
  FiList, FiLibrary, FiBarChart2, FiUser, FiSettings, FiLogOut,
  FiMenu, FiX, FiBell, FiSearch, FiShield, FiCreditCard
} from 'react-icons/fi';
import { useAuth } from '@hooks/useAuth';
import Logo from '@components/common/Logo';
import Button from '@components/common/Button';
import './DashboardLayout.scss';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: FiHome },
  { name: 'Videos', href: '/dashboard/videos', icon: FiVideo },
  { name: 'Downloads', href: '/dashboard/downloads', icon: FiDownload },
  { name: 'Music', href: '/dashboard/music', icon: FiMusic },
  { name: 'History', href: '/dashboard/history', icon: FiClock },
  { name: 'Favorites', href: '/dashboard/favorites', icon: FiHeart },
  { name: 'Playlists', href: '/dashboard/playlists', icon: FiList },
  { name: 'Library', href: '/dashboard/library', icon: FiLibrary },
  { name: 'Analytics', href: '/dashboard/analytics', icon: FiBarChart2 },
];

const secondaryNav = [
  { name: 'Profile', href: '/profile', icon: FiUser },
  { name: 'Settings', href: '/profile/settings', icon: FiSettings },
  { name: 'Subscription', href: '/subscription/billing', icon: FiCreditCard },
];

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="dashboard-layout">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="sidebar-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}
        initial={false}
        animate={{ x: sidebarOpen ? 0 : '-100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      >
        <div className="sidebar-header">
          <Link to="/" className="sidebar-logo">
            <Logo size="medium" />
          </Link>
          <button
            className="sidebar-close"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <FiX />
          </button>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            <span className="nav-section-title">Main</span>
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`nav-item ${isActive(item.href) ? 'active' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="nav-icon" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          <div className="nav-section">
            <span className="nav-section-title">Account</span>
            {secondaryNav.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`nav-item ${isActive(item.href) ? 'active' : ''}`}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="nav-icon" />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item logout" onClick={handleLogout}>
            <FiLogOut className="nav-icon" />
            <span>Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="dashboard-wrapper">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-left">
            <button
              className="menu-toggle"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <FiMenu />
            </button>
            <div className="header-search">
              <FiSearch />
              <input
                type="text"
                placeholder="Search..."
                onKeyDown={(e) => e.key === 'Enter' && navigate(`/search?q=${e.target.value}`)}
              />
            </div>
          </div>

          <div className="header-right">
            <button className="header-btn" aria-label="Notifications">
              <FiBell />
              <span className="notification-badge">3</span>
            </button>
            <Link to="/profile" className="user-avatar">
              {user?.avatar ? (
                <img src={user.avatar} alt={user?.name || 'User'} />
              ) : (
                <span>{user?.name?.charAt(0) || 'U'}</span>
              )}
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
