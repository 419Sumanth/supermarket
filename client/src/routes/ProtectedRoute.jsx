import { Navigate, Outlet } from "react-router-dom";

/**
 * @param allowedRole - "admin" | "user"
 */
function ProtectedRoute({ allowedRole }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // ❌ Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Logged in but wrong role
  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Authorized
  return <Outlet />;
}

export default ProtectedRoute;
