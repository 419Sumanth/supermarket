import { Routes, Route, Navigate } from "react-router-dom";

import AdminNavbar from "./AdminNavbar.jsx";
import AdminSidebar from "./AdminSidebar.jsx";

import ProductList from "../Inventory/ProductList.jsx";
import AddProduct from "../Inventory/AddProduct.jsx";
import ProductDetail from "../Inventory/ProductDetail.jsx";

import AdminHome from "./Home.jsx";
import Orders from "./Orders.jsx";
import Stock from "./Stock.jsx";
import Suppliers from "./Suppliers.jsx";
import Purchases from "./Purchases.jsx";

function AdminDashboard() {
  return (
    <div>
      <AdminNavbar />

      <div className="d-flex">
        <AdminSidebar />

        <div className="flex-grow-1 p-4">
          <Routes>
            {/* Default */}
            <Route path="/" element={<AdminHome />} />

            {/* Inventory */}
            <Route path="inventory" element={<ProductList />} />
            <Route path="inventory/add" element={<AddProduct />} />
            <Route path="inventory/:id" element={<ProductDetail />} />

            {/* Other Admin Pages */}
            <Route path="orders" element={<Orders />} />
            <Route path="stock" element={<Stock />} />
            <Route path="suppliers" element={<Suppliers />} />
            <Route path="purchases" element={<Purchases />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/admin" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
