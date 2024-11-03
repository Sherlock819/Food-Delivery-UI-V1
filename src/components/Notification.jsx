import React, { useState, useEffect, useRef } from 'react';
import './Notification.css';

const Notification = ({ messages }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [seenMessages, setSeenMessages] = useState(new Set()); // Track seen messages
  const dropdownRef = useRef(null); // Reference to the dropdown

  const unreadCount = messages.filter((msg, index) => !seenMessages.has(index)).length; // Count unread messages

  const toggleDropdown = () => {
    setIsOpen((prev) => {
      const newState = !prev;
      if (newState) {
        // Mark all visible messages as seen when dropdown opens
        markVisibleMessagesAsSeen();
      }
      return newState;
    });
  };

  const markVisibleMessagesAsSeen = () => {
    if (dropdownRef.current) {
      const items = dropdownRef.current.querySelectorAll('.notification-item');
      items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        // Check if the item is visible in the viewport
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
          setSeenMessages((prev) => {
            const newSeenMessages = new Set(prev);
            newSeenMessages.add(index); // Mark message as seen
            return newSeenMessages; // Return the updated set
          });
        }
      });
    }
  };

  const handleScroll = () => {
    markVisibleMessagesAsSeen(); // Check for visible messages on scroll
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('scroll', handleScroll);
      markVisibleMessagesAsSeen(); // Check for visible messages when dropdown opens
    } else {
      window.removeEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen]);

  return (
    <div className="notification-container">
      <button onClick={toggleDropdown} className={`bell-icon ${unreadCount > 0 ? 'glow' : ''}`}>
        🔔 {unreadCount > 0 && <span className="notification-count">{unreadCount}</span>}
      </button>
      {isOpen && (
        <div className="notification-dropdown" ref={dropdownRef}>
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