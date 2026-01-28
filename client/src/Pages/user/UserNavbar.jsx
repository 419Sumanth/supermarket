import { useNavigate } from "react-router-dom";

function UserNavbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-dark bg-primary px-3">
      <span className="navbar-brand">Super Market – User</span>

      <button className="btn btn-light" onClick={logout}>
        Logout
      </button>
    </nav>
  );
}

export default UserNavbar;
