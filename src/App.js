import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './components/Auth';
import OrderForm from './components/OrderForm';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import UserProfile from './components/UserProfile';
import UserList from './components/UserList';
import AuthCheck from './components/AuthCheck';
import Notification from './components/Notification';
import './App.css';

// Protected Route wrapper component
const ProtectedRoute = ({ children }) => {
  const hasToken = localStorage.getItem('authToken');
  
  if (!hasToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isWebSocketAlive, setIsWebSocketAlive] = useState(false);

  useEffect(() => {
    // Check for token on app load
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080'); // Replace with your WebSocket URL

    socket.onopen = () => {
      setIsWebSocketAlive(true);
    };

    socket.onclose = () => {
      setIsWebSocketAlive(false);
    };

    return () => {
      socket.close();
    };
  }, []);

  const addNotification = (message) => {
    if (message) {
      console.log('Adding notification:', message); // Debug log
      setNotifications((prev) => [...prev, message]);
    }
  };

  // Function to clear notifications
  const clearNotifications = () => {
    setNotifications([]); // Clear notifications
  };

  return (
    <Router>
      <div className="App">
        <Navbar notifications={notifications} isWebSocketAlive={isWebSocketAlive} clearNotifications={clearNotifications} />
        <Routes>
          <Route 
            path="/login" 
            element={
              isAuthenticated ? 
                <Navigate to="/dashboard" replace /> : 
                <Auth onLoginSuccess={() => setIsAuthenticated(true)} />
            } 
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order"
            element={
              <ProtectedRoute>
                <OrderForm addNotification={addNotification} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-profile"
            element={<UserProfile />}
          />
          <Route
            path="/user-list"
            element={<UserList />}
          />
          <Route
            path="/auth-check"
            element={<AuthCheck />}
          />
          <Route 
            path="/" 
            element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
