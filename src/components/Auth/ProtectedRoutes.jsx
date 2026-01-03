// ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

// Protected Route Component for authentication
export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Admin-only Route Component
export const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  // Check if user role is admin (1 = admin, 0 = user)
  if (user.role !== 1) {
    return <Navigate to="/home/odp" replace />;
  }
  
  return children;
};