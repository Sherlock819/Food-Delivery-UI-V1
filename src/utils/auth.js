import { getAuthHeader } from './api';

export const logout = () => {
  localStorage.removeItem('authToken');
  window.location.reload(); // Reload the page to reset the app state
};

export const checkAuth = async () => {
  try {
    const response = await fetch('http://localhost:8080/user/auth/check', {
      headers: getAuthHeader(),
    });

    if (!response.ok) {
      throw new Error('Failed to check authentication status');
    }

    const data = await response.json();
    return data; // Return the authentication status
  } catch (error) {
    console.error('Error checking authentication:', error);
    throw error; // Rethrow the error for further handling
  }
}; 