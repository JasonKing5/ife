import { useRoutes } from "react-router-dom";
import { lazy } from "react";
import AppLayout from "@/layouts/AppLayout";
import AuthLayout from "@/layouts/AuthLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import ResetPasswordPage from "@/pages/login/reset";
import SettingsPage from "@/pages/settings";

const Login = lazy(() => import("@/pages/login"));
const HomePage = lazy(() => import("@/pages/home"));
const UserPage = lazy(() => import("@/pages/user"));
const Dashboard = lazy(() => import("@/pages/dashboard"));
const NotFound = lazy(() => import("@/pages/not-found"));

export const AppRoutes = () =>
  useRoutes([
    {
      path: "/login",
      element: <AuthLayout />,
      children: [{ index: true, element: <Login /> }],
    },
    {
      path: "/reset",
      element: <AuthLayout />,
      children: [{ index: true, element: <ResetPasswordPage /> }],
    },
    {
      path: "/",
      element: <AppLayout />,
      children: [{ index: true, element: <HomePage /> }],
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: "user", element: <UserPage /> },
        { path: "dashboard", element: <Dashboard /> },
        { path: "*", element: <NotFound /> },
        { path: "settings", element: <SettingsPage /> },
      ],
    },
  ]);