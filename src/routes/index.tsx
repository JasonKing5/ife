import { useRoutes } from "react-router-dom";
import { lazy } from "react";
import AppLayout from "@/layouts/AppLayout";
import AuthLayout from "@/layouts/AuthLayout";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const Login = lazy(() => import("@/pages/login"));
const HomePage = lazy(() => import("@/pages/home"));
const UserPage = lazy(() => import("@/pages/user"));
const NotFound = lazy(() => import("@/pages/not-found"));

export const AppRoutes = () =>
  useRoutes([
    {
      path: "/login",
      element: <AuthLayout />,
      children: [{ index: true, element: <Login /> }],
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <HomePage /> },
        { path: "user", element: <UserPage /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);