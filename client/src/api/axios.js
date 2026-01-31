import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔒 Redirect if already logged in
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "admin") navigate("/admin");
    if (role === "user") navigate("/user");
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    // TEMP logic (backend later)
    if (email === "admin@admin.com") {
      localStorage.setItem("role", "admin");
      navigate("/admin");
    } else {
      localStorage.setItem("role", "user");
      navigate("/user");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3 className="mb-3">Login</h3>

      <form onSubmit={handleLogin}>
        <input
          className="form-control mb-2"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="form-control mb-3"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
}

export default Login;
