import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { JSX } from "react";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" />;
  return children;
};