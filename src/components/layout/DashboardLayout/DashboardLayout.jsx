import { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiBell, FiMenu, FiX } from 'react-icons/fi';
import { useAuth } from '@hooks/useAuth';
import Sidebar from '../Sidebar/Sidebar';
import './DashboardLayout.scss';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSearchQuery, setMobileSearchQuery] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="dashboard-layout">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div className={`dashboard-wrapper ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
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
                placeholder="Search videos, music, and more..."
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

        {/* Mobile Search */}
        <div className="mobile-search">
          <div className="mobile-search-inner">
            <FiSearch />
            <input
              type="text"
              placeholder="Search..."
              value={mobileSearchQuery}
              onChange={(e) => setMobileSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  navigate(`/search?q=${e.target.value}`);
                  setMobileSearchQuery('');
                }
              }}
            />
            {mobileSearchQuery && (
              <button onClick={() => setMobileSearchQuery('')}>
                <FiX />
              </button>
            )}
          </div>
        </div>

        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
