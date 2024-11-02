import React, { useState } from 'react';
import './LoginForm.css';

const LoginForm = ({ onOtpRequested }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:8080/user/auth/request-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "email": email, "role": "USER" }),
      });

      if (response.ok) {
        onOtpRequested(email);
      } else {
        throw new Error('Failed to request OTP');
      }
    } catch (error) {
      alert('Error requesting OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <div className="form-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Get OTP'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm; 