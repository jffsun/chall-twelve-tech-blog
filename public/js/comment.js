// Add new comment to a post
const newCommentHandler = async (event) => {

    // Stop browser from immediately submitting the form
    event.preventDefault();

    const newCommentText = document.querySelector('#newCommentText').value.trim();
  
    if (newCommentText) {

      const response = await fetch('/login', {
        method: 'POST',
        body: JSON.stringify({
          text: newCommentText
        }),
        headers: { 'Content-Type': 'application/json' }
      });
    
      
      // If valid credentials, redirect user to loggedIn homepage
      if (response.ok) {
        alert("Comment added!")
        document.location.reload();

      } else {
        alert(response.statusText);
      }
    }
  };

// Event listeners to run login and sign up functions upon submission
var el = document.querySelector('.comment-form');

if(el) {
  el.addEventListener('submit', newCommentHandler);  
};
