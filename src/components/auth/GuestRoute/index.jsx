import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';

const GuestRoute = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (isAuthenticated) {
    const from = location.state?.from?.pathname || '/dashboard';
    return <Navigate to={from} replace />;
  }

  return children;
};

export default GuestRoute;
