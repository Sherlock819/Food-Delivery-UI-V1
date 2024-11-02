import React, { useState } from 'react';
import LoginForm from './LoginForm';
import OtpVerification from './OtpVerification';
import { useNavigate } from 'react-router-dom';

const Auth = ({ onLoginSuccess }) => {
  const [currentStep, setCurrentStep] = useState('login');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleOtpRequested = (userEmail) => {
    setEmail(userEmail);
    setCurrentStep('otp');
  };

  const handleLoginSuccess = () => {
    onLoginSuccess();
    navigate('/dashboard');
  };

  return (
    <>
      {currentStep === 'login' ? (
        <LoginForm onOtpRequested={handleOtpRequested} />
      ) : (
        <OtpVerification 
          email={email} 
          onLoginSuccess={handleLoginSuccess} 
        />
      )}
    </>
  );
};

export default Auth; 