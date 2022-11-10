// Credential verification
async function userLogin(event) {

    // Stop browser from immediately submitting the form
    event.preventDefault();

    // Gather input from form elements on the page
    const email = document.querySelector('#userEmail').value.trim();
    const password = document.querySelector('#userPassword').value.trim();
  
    // If value for email and password
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
        alert("Incorrect email or password.");
        return;
      }
      
      // If valid credentials, redirect user to loggedIn homepage
      if (response.ok) {
        // document.location.replace('/api/loggedIn');

        console.log('userLogin function Successful')

      } else {
        alert(response.statusText);
      }
    }
  };

  // Credential creation
async function userRegister(event) {

  console.log('userRegister function called')

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
        newUsername,
        newEmail,
        newPassword
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    
    // 401 status code if invalid authentification credentials
    if (response.ok) {
      alert("Account Created! You may log in.");
      document.location.replace('/login');
    } else {
      alert(response.statusText);
    };
  };
};

// Event listeners to run login and sign up functions upon submission
document.querySelector('.log-in').addEventListener('submit', userLogin);  
document.querySelector('.register').addEventListener('submit', userRegister);  