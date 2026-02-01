import { useNavigate } from "react-router-dom";

function AdminNavbar() {
  const navigate = useNavigate();

  const logout = () => {
  localStorage.removeItem("role");
  navigate("/");
};


  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <span className="navbar-brand">Admin Dashboard</span>

      <button className="btn btn-outline-light" onClick={logout}>
        Logout
      </button>
    </nav>
  );
}

export default AdminNavbar;
