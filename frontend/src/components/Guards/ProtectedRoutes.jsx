import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = () => {
  const userIsVerified = useSelector((state) => state.auth?.user?.verified);

  return userIsVerified ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
