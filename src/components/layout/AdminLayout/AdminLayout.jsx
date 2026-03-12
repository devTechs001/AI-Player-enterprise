import { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiHome, FiUsers, FiVideo, FiBarChart2, FiSettings, FiFileText,
  FiAlertTriangle, FiShield, FiCode, FiMenu, FiX, FiLogOut
} from 'react-icons/fi';
import { useAuth } from '@hooks/useAuth';
import Logo from '@components/common/Logo';
import './AdminLayout.scss';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: FiHome },
  { name: 'Users', href: '/admin/users', icon: FiUsers },
  { name: 'Content', href: '/admin/content', icon: FiVideo },
  { name: 'Analytics', href: '/admin/analytics', icon: FiBarChart2 },
  { name: 'Settings', href: '/admin/settings', icon: FiSettings },
  { name: 'Logs', href: '/admin/logs', icon: FiFileText },
  { name: 'Reports', href: '/admin/reports', icon: FiAlertTriangle },
  { name: 'Moderation', href: '/admin/moderation', icon: FiShield },
  { name: 'API', href: '/admin/api', icon: FiCode },
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isActive = (path) => location.pathname.startsWith(path);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="admin-layout">
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
            <Logo size="medium" variant="admin" />
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
          <span className="nav-section-title">Admin Panel</span>
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
        </nav>

        <div className="sidebar-footer">
          <Link to="/dashboard" className="nav-item">
            <FiHome className="nav-icon" />
            <span>User View</span>
          </Link>
          <button className="nav-item logout" onClick={handleLogout}>
            <FiLogOut className="nav-icon" />
            <span>Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="admin-wrapper">
        {/* Header */}
        <header className="admin-header">
          <div className="header-left">
            <button
              className="menu-toggle"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open menu"
            >
              <FiMenu />
            </button>
            <h1 className="header-title">
              {navigation.find((item) => isActive(item.href))?.name || 'Admin'}
            </h1>
          </div>

          <div className="header-right">
            <div className="admin-user">
              <span className="admin-user-name">{user?.name}</span>
              <span className="admin-user-role">{user?.role}</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
