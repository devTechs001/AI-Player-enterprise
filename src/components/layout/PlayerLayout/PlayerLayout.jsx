import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiHome, FiSearch, FiDownload, FiHeart, FiList, FiClock,
  FiMenu, FiX, FiCast, FiSettings, FiVolume2
} from 'react-icons/fi';
import { useAuth } from '@hooks/useAuth';
import Logo from '@components/common/Logo';
import './PlayerLayout.scss';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Library', href: '/dashboard/library' },
  { name: 'Playlists', href: '/dashboard/playlists' },
  { name: 'History', href: '/dashboard/history' },
];

const PlayerLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="player-layout">
      {/* Mini Sidebar */}
      <aside className="player-sidebar">
        <div className="player-sidebar-header">
          <Link to="/">
            <Logo size="small" />
          </Link>
        </div>

        <nav className="player-sidebar-nav">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`player-nav-item ${isActive(item.href) ? 'active' : ''}`}
              title={item.name}
            >
              {item.name === 'Home' && <FiHome />}
              {item.name === 'Dashboard' && <FiHome />}
              {item.name === 'Library' && <FiList />}
              {item.name === 'Playlists' && <FiList />}
              {item.name === 'History' && <FiClock />}
            </Link>
          ))}
        </nav>

        <div className="player-sidebar-footer">
          <button className="player-nav-item" title="Settings">
            <FiSettings />
          </button>
        </div>
      </aside>

      {/* Main Player Area */}
      <main className="player-main">
        <Outlet />
      </main>

      {/* Mobile Navigation */}
      <nav className="player-mobile-nav">
        {navigation.slice(0, 4).map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={`mobile-nav-item ${isActive(item.href) ? 'active' : ''}`}
          >
            {item.name === 'Home' && <FiHome />}
            {item.name === 'Dashboard' && <FiHome />}
            {item.name === 'Library' && <FiList />}
            {item.name === 'Playlists' && <FiList />}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default PlayerLayout;
