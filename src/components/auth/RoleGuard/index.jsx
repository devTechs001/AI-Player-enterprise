import { Navigate } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';

const RoleGuard = ({ children, roles = [] }) => {
  const { isAuthenticated, hasRole } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roles.length > 0 && !hasRole(roles)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default RoleGuard;
