import { Navigate, useRoutes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ProtectedRoute from "../context/ProtectedRoute";
import UserPreferences from "../pages/Settings";
import AuthLayout from "../components/layouts/AuthLayout";
import MainLayout from "../components/layouts/MainLayout";
import { AUTH_PATH, HOME_PATH } from "./path";
import News from "../pages/News";

const AppRoutes: React.FC = () => {
  // Define route configuration
  const routes = [
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        { path: AUTH_PATH.login, element: <Login /> },
        { path: AUTH_PATH.register, element: <Register /> },
      ],
    },
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: HOME_PATH.root, element: <Home /> },
        {
          path: HOME_PATH.settings,
          element: <ProtectedRoute element={<UserPreferences />} />,
        },
        {
          path: HOME_PATH.news,
          element: <ProtectedRoute element={<News />} />,
        },
        // Catch-all route to redirect to login
        { path: "*", element: <Navigate to={AUTH_PATH.root} /> },
      ],
    },
  ];

  return useRoutes(routes);
};

export default AppRoutes;
