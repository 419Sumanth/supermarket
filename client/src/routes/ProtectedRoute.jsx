import { Navigate, Outlet } from "react-router-dom";
import authApi from "../api/authApi";

function ProtectedRoute({ allowedRole }) {
  const role = localStorage.getItem("role");

  // Not logged in
  if (!role) {
    return <Navigate to="/" replace />;
  }

  // Role mismatch
  if (role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  // Allowed
  return <Outlet />;
}

export default ProtectedRoute;
