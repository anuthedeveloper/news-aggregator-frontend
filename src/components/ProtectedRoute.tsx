import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../services/authService';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = getToken();
  return token ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
