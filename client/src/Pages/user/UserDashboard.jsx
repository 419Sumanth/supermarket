import { Routes, Route, Navigate } from "react-router-dom";
import UserNavbar from "./UserNavbar";
import UserSidebar from "./UserSidebar";

// User pages
import Home from "./Home";
import Products from "./Products";
import Orders from "./Orders";
import Profile from "./Profile";

function UserDashboard() {
  return (
    <div>
      {/* Top Navbar */}
      <UserNavbar />

      {/* Sidebar + Content */}
      <div className="d-flex">
        <UserSidebar />

        <div className="flex-grow-1 p-4">
          <Routes>
            <Route  index element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/profile" element={<Profile />} />

            {/* fallback */}
            <Route path="*" element={<Navigate to="/user" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
