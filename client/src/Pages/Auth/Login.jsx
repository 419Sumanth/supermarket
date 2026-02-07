import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authApi from "../../api/authApi";
import instance from "../../api/axios";
import axios from "axios";
// import { get } from "mongoose";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔒 Redirect if already logged in
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "Admin") navigate("/admin");
    if (role === "User") navigate("/user");
  }, [navigate]);


  const handleLogin = async (e) => {
    e.preventDefault();
    // console.log("Logging in with:", { email, password });
    try {
      const res = await authApi.login({
        Email : email,
        password: password,
      });

      console.log("LOGIN RESPONSE ", res.data);
      // alert("Check console for login response");
    
      //get the user type and email from the response
      const { userId,userType, userEmail } = res.data;
      localStorage.setItem("role", userType);
      localStorage.setItem("token", res.data.token);

      if (userType === "Admin") {
        navigate("/admin");
      } else {
        navigate("/user");
        // console.log("Navigated to user dashboard");
      }
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

        <button className="btn btn-primary w-100 mb-2">Login</button>

        <p className="text-center text-muted mb-2">
          Kindly register if you don’t have an account
        </p>

        <button
          type="button"
          className="btn btn-outline-secondary w-100"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </form>
    </div>

  );
}

export default Login;
