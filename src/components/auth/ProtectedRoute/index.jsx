import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import Loader from '@components/common/Loader';

const ProtectedRoute = ({ children, roles = [] }) => {
  const location = useLocation();
  const { isAuthenticated, isLoading, hasRole } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-dark-950">
        <Loader size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles.length > 0 && !hasRole(roles)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
