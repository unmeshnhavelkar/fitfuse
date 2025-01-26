import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/header.css";

const Header = ({ username, showGreeting = true }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user data from localStorage
    navigate("/login");
  };

  return (
    <div className="header">
      <div>
        <h1 onClick={()=>navigate("/dashboard")}>Fitfuse</h1>
      </div>

      {showGreeting && <div>Hi, {username}</div>}

      <div className="header-right-container">
        <img
          src="/profile-icon.svg"
          className="prof-icon"
          onClick={() => navigate("/profile")}
        />
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
