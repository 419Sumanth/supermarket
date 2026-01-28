import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        ...form,
        role: "user", // 🔒 forced user
      });

      alert("Registration successful");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3 className="text-center">Register</h3>

      <form onSubmit={handleRegister}>
        <input
          className="form-control my-2"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />

        <input
          className="form-control my-2"
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          className="form-control my-2"
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button className="btn btn-dark w-100 mt-3">Register</button>
      </form>
    </div>
  );
}

export default Register;
