import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import Notification from './Notification';
import './Navbar.css';
import { FaHome, FaUser, FaBell, FaCheck } from 'react-icons/fa'; // Import icons

const Navbar = ({ notifications, clearNotifications }) => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-link"><FaHome /></Link>
        <Link to="/user-profile" className="navbar-link"><FaUser /></Link>
        <Link to="/auth-check" className="navbar-link"><FaCheck /></Link>
        <Notification messages={notifications} clearNotifications={clearNotifications} />
        <LogoutButton />
      </div>
    </nav>
  );
};

export default Navbar; 