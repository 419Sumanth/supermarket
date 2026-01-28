import { useNavigate } from "react-router-dom";

function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role"); // admin / user
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <span className="navbar-brand fw-bold">
        Super Market — Admin
      </span>

      <button
        className="btn btn-outline-light"
        onClick={handleLogout}
      >
        Logout
      </button>
    </nav>
  );
}

export default AdminNavbar;

