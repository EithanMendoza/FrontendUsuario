import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const sessionToken = localStorage.getItem('session_token');
  return sessionToken ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
