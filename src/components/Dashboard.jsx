import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <nav>
        <ul>
          <li>
            <Link to="/order">Place an Order</Link>
          </li>
          {/* Add more navigation options as needed */}
          <li>
            <Link to="/some-other-route">Some Other Route</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard; 