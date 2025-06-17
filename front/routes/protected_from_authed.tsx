import type { JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedFromAuthedRoute = ({ children }: { children: JSX.Element }) => {
  const accessToken = localStorage.getItem("access_token");
  const location = useLocation();

  if (accessToken) {
    return <Navigate to="/" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default ProtectedFromAuthedRoute;
