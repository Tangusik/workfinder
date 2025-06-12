import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/main";
import LoginPage from "../pages/login";
import Page404 from "../pages/page-404";

const AppRoutes = () => {
  const navRoutes = [
    { path: "/", element: <MainPage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "*", element: <Page404 /> },
  ];
  return (
    <Routes>
      {navRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default AppRoutes;
