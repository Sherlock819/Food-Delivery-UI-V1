import React, { useEffect, useState } from 'react';
import { getAuthHeader } from '../utils/api';

const AuthCheck = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch('http://localhost:8080/user/api/users/isAuthenticated', {
        headers: getAuthHeader(),
      });
      const data = await response.json();
      setIsAuthenticated(data);
      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {isAuthenticated ? <h2>You are authenticated!</h2> : <h2>You are not authenticated.</h2>}
    </div>
  );
};

export default AuthCheck; 