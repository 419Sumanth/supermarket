import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authApi from "../../api/authApi";
import instance from "../../api/axios";

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

  

const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await authApi.login({
      email,
      password,
    });

    console.log("LOGIN RESPONSE 👉", res.data);
    alert("Check console for login response");

  } catch (error) {
    console.error("LOGIN ERROR 👉", error);
    alert("Login failed - check console");
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
