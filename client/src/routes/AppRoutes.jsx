import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";

import AdminDashboard from "../Pages/admin/AdminDashboard";
import UserDashboard from "../Pages/user/UserDashboard";

import ProtectedRoute from "./ProtectedRoute";

/* Admin Pages */
import AdminHome from "../Pages/admin/Home";
import AdminProducts from "../Pages/admin/Products";
import AdminSuppliers from "../Pages/admin/Suppliers";
import AdminPurchases from "../Pages/admin/Purchases";
import AdminOrders from "../Pages/admin/Orders";
import AdminStockAlerts from "../Pages/admin/StockAlerts";

/* User Pages */
import UserHome from "../Pages/user/Home";
import UserProducts from "../Pages/user/Products";
import UserOrders from "../Pages/user/Orders";
import UserProfile from "../Pages/user/Profile";
import UserCart from "../Pages/user/Cart";
import Products from "../Pages/user/Products";

function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ADMIN PROTECTED */}
      <Route element={<ProtectedRoute allowedRole="Admin" />}>
        <Route path="/admin" element={<AdminDashboard />}>
          <Route index element={<AdminHome />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="suppliers" element={<AdminSuppliers />} />
          <Route path="purchases" element={<AdminPurchases />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="alerts" element={<AdminStockAlerts />} />
        </Route>
      </Route>

      {/* USER PROTECTED */}
      <Route element={<ProtectedRoute allowedRole="User" />}>
        <Route path="/user" element={<UserDashboard />}>
          <Route index element={<UserHome />} />
          <Route path="products" element={<UserProducts restrict={false}/>} />
          <Route path="orders" element={<UserOrders />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="cart" element={<UserCart />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRoutes;
