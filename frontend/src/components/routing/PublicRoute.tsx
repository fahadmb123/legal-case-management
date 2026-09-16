import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export function PublicRoute() {
  const { user } = useAuth();

  if (user) {
    // If user is already logged in, redirect away from public auth pages
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
