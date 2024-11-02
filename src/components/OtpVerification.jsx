import React, { useState } from 'react';
import './OtpVerification.css';

const OtpVerification = ({ email, onLoginSuccess }) => {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8080/user/auth/validate-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();
      console.log("Response token : ",data);
      if (data.token) {
        // Save JWT token to localStorage
        localStorage.setItem('authToken', data.token);
        onLoginSuccess();
      } else {
        throw new Error('Invalid OTP');
      }
    } catch (error) {
      alert(`Error verifying OTP: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="otp-container">
      <form onSubmit={handleSubmit} className="otp-form">
        <h2>Enter OTP</h2>
        <p>Please enter the OTP sent to {email}</p>
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