import { useNavigate } from "react-router-dom";

function UserNavbar() {
  const navigate = useNavigate();

 const logout = () => {
  localStorage.removeItem("role");
  navigate("/");
};


  return (
    <nav className="navbar navbar-dark bg-primary px-3">
      <span className="navbar-brand">Super Market</span>

      <button className="btn btn-outline-light" onClick={logout}>
        Logout
      </button>
    </nav>
  );
}

export default UserNavbar;
