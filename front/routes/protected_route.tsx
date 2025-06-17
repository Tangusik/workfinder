import type { JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const accessToken = localStorage.getItem("access_token");
  const location = useLocation();

  if (!accessToken) {
    // Перенаправляем на /login, сохраняя текущий путь для возврата после авторизации
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default ProtectedRoute;
