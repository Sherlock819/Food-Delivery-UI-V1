export const logout = () => {
  localStorage.removeItem('authToken');
  window.location.reload(); // Reload the page to reset the app state
}; 