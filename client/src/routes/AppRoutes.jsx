import { Routes, Route } from "react-router-dom";

import Login from "../Pages/Auth/Login.jsx";
import Register from "../Pages/Auth/Register.jsx";
import AdminDashboard from "../Pages/admin/AdminDashboard.jsx";
import UserDashboard from "../Pages/user/UserDashboard.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/user" element={<UserDashboard />} />
    </Routes>
  );
}

export default AppRoutes;
