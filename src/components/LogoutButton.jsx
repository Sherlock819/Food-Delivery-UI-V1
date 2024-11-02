import React from 'react';
import { logout } from '../utils/auth'; // Import the logout function
import './LogoutButton.css'; // Import the CSS for styling

const LogoutButton = () => {
  const handleLogout = () => {
    logout();
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  );
};

export default LogoutButton; 