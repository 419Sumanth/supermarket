import { Routes, Route, Navigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";

// Admin Pages
import AdminHome from "./Home";
import Products from "./Products";
import Stock from "./Stock";
import Suppliers from "./Suppliers";
import Purchases from "./Purchases";
import Orders from "./Orders";

function AdminDashboard() {
  return (
    <div>
      {/* Top Navbar */}
      <AdminNavbar />

      {/* Sidebar + Page Content */}
      <div className="d-flex">
        <AdminSidebar />

        <div className="flex-grow-1 p-4">
          <Routes>
            <Route index element={<AdminHome />} />
            <Route path="/products" element={<AdminProducts />} />
            <Route path="/stock" element={<AdminStock />} />
            <Route path="/suppliers" element={<AdminSuppliers />} />
            <Route path="/purchases" element={<AdminPurchases />} />
            <Route path="/orders" element={<AdminOrders />} />
            <Route path="suppliers" element={<SupplierList />} />
            <Route path="suppliers/add" element={<AddSupplier />} />
            <Route path="suppliers/:supplierId/purchases" element={<PurchaseHistory />} />
            <Route path="alerts/stock" element={<StockAlertList />} />

            

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/admin" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
