import { useNavigate } from "react-router-dom";
import { useState } from "react";
import authApi from "../../api/authApi";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");


  const handleRegister = async(e) => {
    e.preventDefault();

    try {
      const userData = {
        Name: name,
        Email: email,
        Mobile: phone,
        DOB: Number(dob.split("-")[0]),
        password: password,
        Type: "User",
        isActive: true
      };

      // console.log("Registering user with data:", userData);

      const res = await authApi.register(userData);

      alert("Registration successful! forwarding to login...");
      
      // Redirect to login
      navigate("/");

    } catch (error) {
      console.log("Register Error:", error.response?.data || error.message);
      alert("Registration failed");
    }
  };

  return (

    <div 
       className="container"
      style={{ maxWidth: "30%", height:"800px", display :"flex", flexDirection : "column", alignItems : "center",justifyContent : "center", gap:"30px" }}
    >

        <h2 className="text-xl font-bold mb-2">Register</h2>

  <form
    onSubmit={handleRegister}
    className="bg-white p-6"
    autoComplete="off"
    style={{ display: "flex", flexDirection: "column", gap: "12px", padding: "0px", width:"300px" }}
  >
  
    <input
      type="text"
      placeholder="Name"
      className="form-control mb-2"
      required
      onChange={(e) => setName(e.target.value)}
    />
    <input
      type="email"
      placeholder="Email"
      autoComplete="off"
      className="form-control mb-2"
      required
      onChange={(e) => setEmail(e.target.value)} 
    />
    <input
      type="text"
      placeholder="Phone Number"
      className="form-control mb-2"
      autoComplete="new-password"
      required
      onChange={(e) => setPhone(e.target.value)}
    />
    <input
      type="date"
      className="form-control mb-2"
      autoComplete="new-password"
      required
      onChange={(e) => setDob(e.target.value)}
    />
    <input
      type="password"
      placeholder="Password"
      className="form-control mb-2"
      autoComplete="new-password"
      required
      onChange={(e) => setPassword(e.target.value)}
    />

    <button className="w-full bg-green-600 text-white p-2 rounded">
      Register
    </button>

    <p className="text-sm text-center">
      Already have an account?{" "}
      <span
        className="text-blue-600"
        style={{
          cursor:"pointer",
          color:"blue"
        }}
        onClick={() => navigate("/")}
      >
        Login
      </span>
    </p>
  </form>
</div>


  );
}

export default Register;
