// Function for logging out of the session
const logout = async (event) => {

    console.log('Logout button clicked');

    // Make a post request to destroy the user's session
      const response = await fetch('/api/loggedIn', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
      });
    
      if (response.ok) {
        // If successfully logged out, redirect to the logged out home page
        document.location.replace('/');
      } else {
        console.log('No user logged in')
        alert(response.statusText);
      }
    };
    
    document.querySelector('.logOut').addEventListener('click', logout);