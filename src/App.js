import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './components/Auth';
import OrderForm from './components/OrderForm';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
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

  useEffect(() => {
    // Check for token on app load
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, []);

  const addNotification = (message) => {
    if (message) {
      console.log('Adding notification:', message); // Debug log
      setNotifications((prev) => [...prev, message]);
    }
  };

  return (
    <Router>
      <div className="App">
        <Navbar notifications={notifications} />
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
            path="/" 
            element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
