import React, { useState } from 'react';
import './OtpVerification.css';

const OtpVerification = ({ email, onLoginSuccess }) => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null); // State to hold error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null); // Reset error state

    try {
      const response = await fetch('http://localhost:8080/user/auth/validate-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();
      if (response.ok) {
        if (data.token) {
          // Save JWT token to localStorage
          localStorage.setItem('authToken', data.token);
          onLoginSuccess();
        } else {
          throw new Error('Invalid OTP');
        }
      } else {
        throw new Error(data.message || 'Error verifying OTP');
      }
    } catch (error) {
      setError(error.message); // Set error message
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="otp-container">
      <form onSubmit={handleSubmit} className="otp-form">
        <h2>Enter OTP</h2>
        <p>Please enter the OTP sent to {email}</p>
        {error && <div className="error-message">Error: {error}</div>} {/* Display error message */}
        <div className="form-group">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            maxLength="6"
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Verifying...' : 'Verify OTP'}
        </button>
      </form>
    </div>
  );
};

export default OtpVerification; 