document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      if (username === 'Aissms' && password === 'ioit') {
        // Store the username in browser storage
        localStorage.setItem('username', username);
  
        // Redirect the user to the index.html page
        window.location.href = '/public/secure/index.html';
      } else {
        alert('Invalid username or password');
      }
    });
  });
  