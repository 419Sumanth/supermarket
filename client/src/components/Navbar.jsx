import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <span className="navbar-brand">Super Market</span>

      <div>
        <button className="btn btn-light mx-1" onClick={() => navigate("/")}>Home</button>
        <button className="btn btn-light mx-1" onClick={() => navigate("/products")}>Products</button>
        <button className="btn btn-light mx-1" onClick={() => navigate("/suppliers")}>Suppliers</button>
        <button className="btn btn-light mx-1" onClick={() => navigate("/purchases")}>Purchases</button>
        <button className="btn btn-warning mx-1" onClick={() => navigate("/login")}>Login</button>
      </div>
    </nav>
  );
}

export default Navbar;
