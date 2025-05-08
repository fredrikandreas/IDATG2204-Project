// utility functions for authentication
export const isLoggedIn = () => {
    // Check if the token exists in localStorage
    return !!localStorage.getItem('token');
  };

  // Function to get the token from localStorage
  export const logout = (navigate) => {
    localStorage.removeItem('token');
    navigate('/login');        
    window.location.reload();
    console.log("Logout clicked");
  };