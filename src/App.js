import React from "react";
import { Routes, Route, Navigate } from "react-router-dom"; // No need to import BrowserRouter here
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard"; // Import Dashboard component
import "./App.css";

const App = () => {
  // Temporary function to check if the user is logged in
  // Replace with actual authentication logic if needed
  const isLoggedIn = () => !!localStorage.getItem("user"); // Example: Check localStorage for user data

  return (
    <div>
      <Routes>
        {/* Redirect from home page to login page */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Other routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected route: Only accessible when logged in */}
        <Route
          path="/dashboard"
          element={isLoggedIn() ? <Dashboard /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
};

export default App;
