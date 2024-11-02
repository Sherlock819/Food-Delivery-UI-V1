import React, { useState } from 'react';
import './Notification.css';

const Notification = ({ messages }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="notification-container">
      <button onClick={toggleDropdown} className="bell-icon">
        🔔
      </button>
      {isOpen && (
        <div className="notification-dropdown">
          {messages.length === 0 ? (
            <p>No notifications</p>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className="notification-item">
                {msg}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Notification; 