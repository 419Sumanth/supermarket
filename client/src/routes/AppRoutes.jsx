import { BrowserRouter, Routes, Route } from "react-router-dom";

// Auth pages
import Login from "../Auth/Login";
import Register from "../Auth/Register";

// Dashboards
import UserDashboard from "../Pages/user/UserDashboard";
import AdminDashboard from "../Pages/admin/AdminDashboard";

// Protection
import ProtectedRoute from "./ProtectedRoute";

// Other pages
import Unauthorized from "../Pages/Unauthorized";
import NotFound from "../Pages/NotFound";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🔓 Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


        {/* 🔐 User Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
          <Route path="/user/*" element={<UserDashboard />} />
        </Route>

        {/* 🔐 Admin Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin/*" element={<AdminDashboard />} />
        </Route>
        <Route path="/admin/products" element={<AdminProducts />} />


        {/* 🚫 Unauthorized */}
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* ❌ 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
