// Verifies credentials to login
const userLoginHandler = async (event) => {

    // Stop browser from immediately submitting the form
    event.preventDefault();

    // Gather input from form elements on login page
    const email = document.querySelector('#userEmail').value.trim();
    const password = document.querySelector('#userPassword').value.trim();
  
    // If value exists for email and password
    if (email && password) {

      // Send POST request with email and password to server
      const response = await fetch('/login', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
      
      // 401 status code if invalid authentification credentials
      if (response.status === 401) {
        alert("Incorrect email or password. Please try again.");
        return;
      }
      
      // If valid credentials, redirect user to loggedIn homepage
      if (response.ok) {
        document.location.replace('/api/loggedIn');

      } else {
        alert(response.statusText);
      }
    }
  };

// Creates a new user's credentials
const userRegisterHandler = async (event) => {

  // Stop browser from immediately submitting the form
  event.preventDefault();

  // Gather input from form elements on the page
  const newUsername = document.querySelector('#newUsername').value.trim();
  const newEmail = document.querySelector('#newEmail').value.trim();
  const newPassword = document.querySelector('#newPassword').value.trim();

  // If value for email and password
  if (newUsername && newEmail && newPassword) {

    // Send POST request with email and password to server
    const response = await fetch('/login/register', {
      method: 'POST',
      body: JSON.stringify({
        username: newUsername,
        email: newEmail,
        password: newPassword
      }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
      alert("Account Created!");
      
      // If
      document.location.replace('/api/loggedIn');

    } else {
      alert('Failed to register your account');
    };
  };
};

// Event listeners to run login and sign up functions upon submission
var el = document.querySelector('.login-form');

if(el) {
  el.addEventListener('submit', userLoginHandler);  
};

var el2 = document.querySelector('.register-form');

if (el2) {
  el2.addEventListener('submit', userRegisterHandler);  
}