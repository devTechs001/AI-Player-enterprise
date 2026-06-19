import { Link, useLocation } from 'react-router-dom';
import {
  FiHome, FiDownload, FiSearch, FiMusic, FiUser,
} from 'react-icons/fi';
import { useAuth } from '@hooks/useAuth';
import './MobileNav.scss';

const navItems = [
  { path: '/', label: 'Home', icon: FiHome },
  { path: '/download', label: 'Download', icon: FiDownload },
  { path: '/search', label: 'Search', icon: FiSearch },
  { path: '/library', label: 'Library', icon: FiMusic },
];

const MobileNav = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  return (
    <nav className="mobile-bottom-nav">
      <div className="mobile-nav-inner">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`mobile-nav-link ${location.pathname === item.path ? 'active' : ''}`}
          >
            <item.icon />
            <span>{item.label}</span>
          </Link>
        ))}
        <Link
          to={isAuthenticated ? '/dashboard' : '/login'}
          className={`mobile-nav-link ${location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/login') || location.pathname.startsWith('/profile') ? 'active' : ''}`}
        >
          <FiUser />
          <span>{isAuthenticated ? 'Account' : 'Login'}</span>
        </Link>
      </div>
    </nav>
  );
};

export default MobileNav;
