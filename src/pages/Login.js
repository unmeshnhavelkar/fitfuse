import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "../styles/login.css"; 


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user info to localStorage
      localStorage.setItem("user", JSON.stringify({ email: user.email, uid: user.uid }));

      // Redirect to the dashboard
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    
    <div className="login-page">

      <div className="logo-div"><h1>Fitfuse</h1></div>


      <div className="login-container">

        <h2>Login to Your Account</h2>
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleLogin} className="form-container">
          <div className="input-group">
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="form-button">Log In</button>
        </form>

        <div className="switch-auth">
          Don’t have an account?{" "}
          <span className="switch-link" onClick={() => navigate("/signup")}>
            Sign Up
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
