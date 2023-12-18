// PrivateRoute.js
import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useAuth } from '../services/auth';

const PrivateRoute = ({ children, roles, ...rest }) => {
  const { user } = useAuth();

  const isAuthorized = () => {
    if (!roles || roles.length === 0) {
      // Aucune restriction de rôle
      return true;
    }

    return roles.includes(user?.role);
  };

  return (
    <Route
      {...rest}
      element={isAuthorized() ? children : <Navigate to="/login" replace />}
    />
  );
};

export default PrivateRoute;
