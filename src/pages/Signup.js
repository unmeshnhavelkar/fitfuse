import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../styles/signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update user profile with username
      await updateProfile(user, { displayName: username });

      // Store additional user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        username,
        email,
      });

      // Send verification email
      await sendEmailVerification(user);

      alert("Verification email sent. Please check your inbox.");
      navigate("/login");
    } catch (err) {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="signup-page">

  <div className="logo-div"><h1>Fitfuse</h1></div>

  <div className="signup-container">
    <h2>Create an Account</h2>
    {error && <p className="error">{error}</p>}

    <form onSubmit={handleSignup} className="form-container">
      <div className="input-group">
        <input
          type="text"
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

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

      <button type="submit" className="form-button">Sign Up</button>
    </form>

    <div className="switch-auth">
      Already have an account?{" "}
      <span className="switch-link" onClick={() => navigate("/login")}>
        Log In
      </span>
    </div>
  </div>

</div>

  );
};

export default Signup;
