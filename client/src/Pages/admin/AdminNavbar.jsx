import { useNavigate } from "react-router-dom";

function AdminNavbar() {
  const navigate = useNavigate();

  const logout = () => {
  localStorage.removeItem("role");
  navigate("/");
};


  return (
    <nav 
      className="navbar navbar-dark bg-dark px-4 py-3"
      style={{display:"flex",
             justifyContent:"space-between", 
             alignItems:"center"}}
      >
      <span 
        className="navbar-brand"
        style={{fontSize:"24px",
               fontWeight:"bold"}}
      >
        Admin Dashboard
      </span>

      <button 
        className="btn btn-outline-light" 
        onClick={logout}
        style={{fontSize:"18px",
        marginRight:"15px"  
        }}
        >
        Logout
      </button>
    </nav>
  );
}

export default AdminNavbar;
