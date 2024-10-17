import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

// ProtectedRoute component to protect routes based on roles
const ProtectedRoute = ({ children, roles }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/" />; // Redirect to login if not authenticated
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" />; // Redirect if the user does not have the required role
  }

  return children; // Render the children if authenticated and authorized
};

export default ProtectedRoute;
