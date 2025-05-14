import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const user = localStorage.getItem("user");
  return user ? children : <Navigate to="/login" />;
}

export default PrivateRoute;