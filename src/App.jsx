import { Suspense, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import routes from './routes';
import Splash from './pages/Splash';
import MainLayout from './components/layout/MainLayout';
import DashboardLayout from './components/layout/DashboardLayout';
import AdminLayout from './components/layout/AdminLayout';
import AuthLayout from './components/layout/AuthLayout';
import PlayerLayout from './components/layout/PlayerLayout';
import PageLoader from './components/common/Loader/PageLoader';
import MiniPlayer from './components/player/MiniPlayer';
import { useAuth } from './hooks/useAuth';
import { usePlayer } from './hooks/usePlayer';

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const location = useLocation();
  const { isLoading: authLoading, initAuth } = useAuth();
  const { currentTrack, isMinimized } = usePlayer();

  useEffect(() => {
    initAuth();
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <Splash />;
  }

  if (authLoading) {
    return <PageLoader />;
  }

  const getLayout = (route) => {
    switch (route.layout) {
      case 'dashboard':
        return DashboardLayout;
      case 'admin':
        return AdminLayout;
      case 'auth':
        return AuthLayout;
      case 'player':
        return PlayerLayout;
      case 'none':
        return ({ children }) => children;
      default:
        return MainLayout;
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        <Suspense fallback={<PageLoader />}>
          <Routes location={location} key={location.pathname}>
            {routes.map((route) => {
              const Layout = getLayout(route);
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <Layout>
                      <route.component />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </Suspense>
      </AnimatePresence>
      
      {/* Mini Player */}
      {currentTrack && isMinimized && <MiniPlayer />}
    </>
  );
};

export default App;