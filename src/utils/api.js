export const getAuthHeader = () => {
  const token = localStorage.getItem('authToken');
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};

// Example usage in API calls:
export const fetchProtectedData = async () => {
  const response = await fetch('http://localhost:8080/api/protected-route', {
    headers: getAuthHeader(),
  });
  return response.json();
}; 