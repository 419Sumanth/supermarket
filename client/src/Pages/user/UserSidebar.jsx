import { NavLink } from "react-router-dom";

function UserSidebar() {
  return (
    <div className="bg-light border-end" style={{ width: "220px", minHeight: "100vh" }}>
      <ul className="nav flex-column p-3">
        <li className="nav-item">
          <NavLink className="nav-link" to="/user">Home</NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link" to="/user/products">Products</NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link" to="/user/orders">My Orders</NavLink>
        </li>

        <li className="nav-item">
          <NavLink className="nav-link" to="/user/profile">Profile</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default UserSidebar;
