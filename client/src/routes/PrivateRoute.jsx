import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { isAuth } = useAuth();

  return isAuth ? children : <Navigate to="/login" />;
};

export { PrivateRoute };
