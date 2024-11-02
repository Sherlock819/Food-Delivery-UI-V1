import React from 'react';
import LogoutButton from './LogoutButton';
import Notification from './Notification';
import './Navbar.css';

const Navbar = ({ notifications }) => {
  return (
    <div className="navbar">
      <h1 className="navbar-title">My Application</h1>
      <div className="navbar-right">
        <Notification messages={notifications} />
        <LogoutButton />
      </div>
    </div>
  );
};

export default Navbar; 