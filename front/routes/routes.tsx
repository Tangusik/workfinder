import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/main";
import LoginPage from "../pages/login";
import Page404 from "../pages/page-404";
import ProtectedRoute from "./protected_route";
import ProtectedFromAuthed from "./protected_from_authed";

const AppRoutes = () => {
  const navRoutes = [{ path: "/login", element: <LoginPage /> }];
  const navRoutesProtected = [{ path: "/", element: <MainPage /> }];
  return (
    <Routes>
      {navRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<ProtectedFromAuthed>{route.element}</ProtectedFromAuthed>}
        />
      ))}

      <Route>
        {navRoutesProtected.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<ProtectedRoute>{route.element}</ProtectedRoute>}
          />
        ))}
      </Route>

      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default AppRoutes;
