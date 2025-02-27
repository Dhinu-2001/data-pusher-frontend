import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const state = useSelector((state) => state);
  const isAuthenticated = state?.isAuthenticated;

  if ( !isAuthenticated ) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
