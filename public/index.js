document.addEventListener('DOMContentLoaded', function() {
    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem('username');
  
    if (!isLoggedIn) {
      // Redirect the user back to the login page
      window.location.href = 'login.html';
    }
  });
  