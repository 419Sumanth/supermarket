import { Navigate, Outlet } from "react-router-dom";

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
