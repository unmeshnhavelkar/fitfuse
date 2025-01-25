import React from 'react';
import ReactDOM from 'react-dom/client';  // Import the new root API
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));  // Create a root element using ReactDOM.createRoot
root.render(
  <Router> {/* Wrap your app in Router */}
    <App />
  </Router>
);
