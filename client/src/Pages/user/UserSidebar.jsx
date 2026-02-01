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

function UserSidebar() {
  return (
    <div
      className="bg-light border-end"
      style={{ width: "220px", minHeight: "100vh" }}
    >
      <ul className="nav flex-column p-3 gap-1">
        <NavLink to="/user" end style={linkStyle}>
          Home
        </NavLink>

        <NavLink to="/user/products" style={linkStyle}>
          Products
        </NavLink>

        <NavLink to="/user/orders" style={linkStyle}>
          My Orders
        </NavLink>

        <NavLink to="/user/cart" style={linkStyle}>
          Cart
        </NavLink>

        <NavLink to="/user/profile" style={linkStyle}>
          Profile
        </NavLink>
      </ul>
    </div>
  );
}

export default UserSidebar;
