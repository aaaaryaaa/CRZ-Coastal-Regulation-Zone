import React, { useContext } from "react";

import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../../contexts/authContext";

const ProtectedRoutes = ({ component }) => {
  const { officeLogin } = useContext(AuthContext);
  return officeLogin ? component : <Navigate to="/office/login" />;
};

export default ProtectedRoutes;
