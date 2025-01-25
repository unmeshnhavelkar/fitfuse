import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import '../styles/header.css';

const Header = ({ username }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <div className="header">
      <h1>Fitfuse</h1>
      <div>Hi {username}</div>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Header;


