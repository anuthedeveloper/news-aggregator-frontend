import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../services/authService";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = getToken();
  return token ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;

// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
//   const { user } = useAuth();
//   return user ? children : <Navigate to="/login" />;
// };

// export default ProtectedRoute;
