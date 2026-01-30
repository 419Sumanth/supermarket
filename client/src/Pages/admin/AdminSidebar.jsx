import { NavLink } from "react-router-dom";

const linkStyle = ({ isActive }) => ({
  cursor: "pointer",
  padding: "8px 12px",
  borderRadius: "6px",
  textDecoration: "none",
  color: isActive ? "#fff" : "#212529",
  backgroundColor: isActive ? "#0d6efd" : "transparent",
  display: "block",
});

function AdminSidebar() {
  return (
    <div
      className="bg-light border-end"
      style={{ width: "220px", minHeight: "100vh" }}
    >
      <ul className="nav flex-column p-3 gap-1">
        <NavLink to="/admin" end style={linkStyle}>
          Dashboard
        </NavLink>

        <NavLink to="/admin/products" style={linkStyle}>
          Products
        </NavLink>

        <NavLink to="/admin/suppliers" style={linkStyle}>
          Suppliers
        </NavLink>

        <NavLink to="/admin/purchases" style={linkStyle}>
          Purchases
        </NavLink>

        <NavLink to="/admin/orders" style={linkStyle}>
          Orders
        </NavLink>

        <NavLink to="/admin/alerts" style={linkStyle}>
          Low Stock Alerts
        </NavLink>
      </ul>
    </div>
  );
}

export default AdminSidebar;
