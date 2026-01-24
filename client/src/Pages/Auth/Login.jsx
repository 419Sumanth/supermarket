import React from "react";

export default function Login() {
  const [isLogin, setIsLogin] = React.useState(true);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function login() {
    if (email === "you@example.com" && password === "admin@123") {
   //   alert("Login Successful");
   //   alert(`Email: ${email}`);
      alert(`Login Successful\nEmail: ${email}`);
    } else {
      alert("Invalid Credentials");
    }
  }

  return (
    <div className="container">
      <div className="form-container">
        {isLogin ? (
          /* LOGIN FORM */
          <div className="form">
            <h2>Login Form</h2>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={login}>Login</button>

            <p>
              Not a member?{" "}
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                style={{
                  color: "blue",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Signup now
              </button>
            </p>
          </div>
        ) : (
          /* SIGNUP FORM */
          <div className="form">
            <h2>Signup Form</h2>

            <input
              type="text"
              placeholder="Full Name"
            />

            <input
              type="email"
              placeholder="Email Address"
            />

            <input
              type="password"
              placeholder="Password"
            />

            <input
              type="password"
              placeholder="Confirm Password"
            />

            <button>Sign Up</button>

            <p>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                style={{
                  color: "blue",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Login
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

