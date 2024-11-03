import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <nav>
        <ul className="dashboard-nav">
          <li>
            <Link to="/order" className="dashboard-link">Place an Order</Link>
          </li>
          <li>
            <Link to="/user-list" className="dashboard-link">View Users</Link>
          </li>
          <li>
            <Link to="/auth-check" className="dashboard-link">Check Authentication</Link>
          </li>
          <li>
            <Link to="/user-profile" className="dashboard-link">Edit Profile</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard; 