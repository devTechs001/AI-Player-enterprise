import { createContext, useContext, useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const RefreshContext = createContext(null);

export const RefreshProvider = ({ children }) => {
  const [refreshKey, setRefreshKey] = useState(0);
  const navigate = useNavigate();

  const refresh = useCallback(() => {
    setRefreshKey((k) => k + 1);
  }, []);

  const hardReload = useCallback(() => {
    window.location.reload();
  }, []);

  const softReload = useCallback(() => {
    navigate(0);
  }, [navigate]);

  // Intercept browser refresh to use soft reload
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        refresh();
      }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'r') {
        e.preventDefault();
        hardReload();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [refresh, hardReload]);

  const value = {
    refreshKey,
    refresh,
    hardReload,
    softReload,
  };

  return (
    <RefreshContext.Provider value={value}>
      {children}
    </RefreshContext.Provider>
  );
};

export const useRefresh = () => {
  const context = useContext(RefreshContext);
  if (!context) {
    throw new Error('useRefresh must be used within a RefreshProvider');
  }
  return context;
};

export default RefreshContext;
