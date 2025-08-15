// Components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const token = localStorage.getItem("token");           // check token
  const role = localStorage.getItem("role")?.toLowerCase(); // check role

  // If no token, redirect to login
  if (!token) return <Navigate to="/login" replace />;

  // If role not allowed, redirect to unauthorized
  if (!allowedRoles.map(r => r.toLowerCase()).includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
