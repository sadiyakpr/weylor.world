// Components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem("auth-token");
  const userRole = localStorage.getItem("role"); // backend should send role
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && userRole !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
