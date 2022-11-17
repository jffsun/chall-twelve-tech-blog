// Add new comment to a post
const newCommentHandler = async (event) => {

  const newCommentText = document.querySelector('#newCommentText').value.trim();

  // Get the post ID from the container
  const postId = document.getElementsByClassName("post")[0].id;

  // Stop browser from immediately submitting the form
  event.preventDefault();

  if (newCommentText) {

    const response = await fetch(`/api/loggedIn/post/${postId}`, {
      method: 'POST',
      body: JSON.stringify({
        text: newCommentText,
      }),
      headers: { 'Content-Type': 'application/json' }
    });
  
    // Reload page to display new comment
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
