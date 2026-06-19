import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiSearch,
  FiMenu,
  FiX,
  FiUser,
  FiSettings,
  FiLogOut,
  FiMoon,
  FiSun,
  FiBell,
  FiDownload,
  FiHeart,
  FiGrid,
  FiMusic,
  FiPlay,
  FiChevronDown,
  FiMonitor,
  FiCode,
  FiUsers,
  FiCreditCard,
  FiShield,
  FiHelpCircle,
  FiFolder,
} from 'react-icons/fi';
import { useAuth } from '@hooks/useAuth';
import { useTheme } from '@hooks/useTheme';
import { useNotification } from '@hooks/useNotification';
import Logo from '@components/common/Logo';
import Avatar from '@components/common/Avatar';
import Badge from '@components/common/Badge';
import SearchBar from '@components/common/SearchBar';
import Button from '@components/common/Button';
import ThemeSwitcher from '@components/common/ThemeSwitcher';
import RefreshButton from '@components/common/RefreshButton/RefreshButton';
import NotificationDropdown from './NotificationDropdown';
import styles from './Header.module.scss';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/features', label: 'Features' },
  { path: '/download', label: 'Download', icon: FiDownload },
  { path: '/library', label: 'Library', icon: FiFolder },
  { path: '/music', label: 'Music', icon: FiMusic },
  { path: '/pricing', label: 'Pricing' },
];

const userMenuItems = [
  { path: '/dashboard', label: 'Dashboard', icon: FiGrid },
  { path: '/profile', label: 'Profile', icon: FiUser },
  { path: '/dashboard/downloads', label: 'My Downloads', icon: FiDownload },
  { path: '/dashboard/favorites', label: 'Favorites', icon: FiHeart },
  { path: '/profile/settings', label: 'Settings', icon: FiSettings },
  { path: '/subscription/billing', label: 'Billing', icon: FiCreditCard },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const location = useLocation();
  const navigate = useNavigate();
  const userMenuRef = useRef(null);

  const { isAuthenticated, isGuest, user, logout, hasRole } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { unreadCount } = useNotification();

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`${styles.navLink} ${location.pathname === item.path ? styles.active : ''}`}
            >
              {item.icon && <item.icon />}              {item.label}
            </Link>
          ))}

          {/* Developer Link */}
          <Link
            to="/devs"
            className={`${styles.navLink} ${location.pathname.startsWith('/devs') ? styles.active : ''}`}
          >
            <FiCode />
            Developers
          </Link>
        </nav>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <div className={styles.searchWrapper}>
            <FiSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search videos, music..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            {searchQuery && (
              <button
                type="button"
                className={styles.clearSearch}
                onClick={() => setSearchQuery('')}
              >
                <FiX />
              </button>
            )}
          </div>
        </form>

        {/* Right Section */}
        <div className={styles.rightSection}>
          {/* Refresh */}
          <RefreshButton size="sm" />

          {/* Theme Switcher */}
          <ThemeSwitcher />

          {isAuthenticated ? (
            <>
              {/* Notifications */}
              <div className={styles.notificationWrapper}>
                <button
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className={styles.iconBtn}
                >
                  <FiBell />
                  {unreadCount > 0 && (
                    <span className={styles.badge}>{unreadCount > 9 ? '9+' : unreadCount}</span>
                  )}
                </button>

                <AnimatePresence>
                  {isNotificationsOpen && (
                    <NotificationDropdown onClose={() => setIsNotificationsOpen(false)} />
                  )}
                </AnimatePresence>
              </div>

              {/* User Menu (Drawer) */}
              <div className={styles.userMenu}>
                <button
                  onClick={() => setIsUserMenuOpen(true)}
                  className={styles.userBtn}
                >
                  <Avatar
                    src={user?.avatar}
                    name={user?.name}
                    size="sm"
                  />
                  <span className={styles.userName}>{user?.name}</span>
                  <FiChevronDown className={`${styles.chevron} ${isUserMenuOpen ? styles.open : ''}`} />
                </button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <>
                      <motion.div
                        className={styles.drawerOverlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsUserMenuOpen(false)}
                      />
                      <motion.div
                        className={styles.drawer}
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                      >
                        {/* Drawer Header */}
                        <div className={styles.drawerHeader}>
                          <h3>Menu</h3>
                          <button
                            className={styles.drawerCloseBtn}
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <FiX />
                          </button>
                        </div>

                        <div className={styles.drawerContent}>
                          {/* User Info */}
                          <div className={styles.userInfo}>
                            <Avatar src={user?.avatar} name={user?.name} size="md" />
                            <div className={styles.userDetails}>
                              <p className={styles.name}>{user?.name}</p>
                              <p className={styles.email}>{user?.email}</p>
                              <Badge variant={user?.subscription?.plan === 'pro' ? 'primary' : 'secondary'}>
                                {user?.subscription?.plan || 'Free'}
                              </Badge>
                            </div>
                          </div>

                          {/* Menu Items */}
                          <div className={styles.menuItems}>
                            {userMenuItems.map((item) => (
                              <Link
                                key={item.path}
                                to={item.path}
                                className={styles.menuItem}
                                onClick={() => setIsUserMenuOpen(false)}
                              >
                                <item.icon />
                                {item.label}
                              </Link>
                            ))}

                            {/* Admin Link */}
                            {hasRole(['admin', 'superadmin']) && (
                              <Link
                                to="/admin"
                                className={`${styles.menuItem} ${styles.admin}`}
                                onClick={() => setIsUserMenuOpen(false)}
                              >
                                <FiShield />
                                Admin Panel
                              </Link>
                            )}
                          </div>

                          {/* Logout */}
                          <button
                            onClick={handleLogout}
                            className={`${styles.menuItem} ${styles.logout}`}
                          >
                            <FiLogOut />
                            Logout
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <div className={styles.authButtons}>
              {isGuest && (
                <Badge variant="warning" className={styles.guestBadge}>
                  Guest Mode
                </Badge>
              )}
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className={styles.mobileMenuBtn}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Drawer) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              className={styles.mobileOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className={styles.mobileDrawer}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className={styles.drawerHeader}>
                <h3>Navigation</h3>
                <button
                  className={styles.drawerCloseBtn}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FiX />
                </button>
              </div>

              <div className={styles.drawerContent}>
                {/* Mobile Search */}
                <form onSubmit={handleSearch} className={styles.mobileSearch}>
                  <FiSearch />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>

                {/* Mobile Nav Items */}
                <nav className={styles.mobileNav}>
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`${styles.mobileNavLink} ${location.pathname === item.path ? styles.active : ''}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.icon && <item.icon />}
                      {item.label}
                    </Link>
                  ))}
                  <Link to="/devs" className={styles.mobileNavLink} onClick={() => setIsMobileMenuOpen(false)}>
                    <FiCode />
                    Developers
                  </Link>
                </nav>

                {/* Mobile Auth */}
                {!isAuthenticated && (
                  <div className={styles.mobileAuth}>
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="secondary" fullWidth>
                        Login
                      </Button>
                    </Link>
                    <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="primary" fullWidth>
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;