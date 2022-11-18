// Add new comment to a post
const newCommentHandler = async (event) => {

  const newCommentText = document.querySelector('#newCommentText').value.trim();

  // Get the post ID from the container
  const postId = document.getElementsByClassName("post")[0].id;

  // Stop browser from immediately submitting the form
  event.preventDefault();

  // Post new comment fetch request 
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


// Identifies which comments are created by the user
const addupdateDeleteComments = async () => {

  // Gets username of the current user from invisible element
  const currentUsername = $('.username').attr('id');
  
  // Gets username of each comment
  const allComments = $('.comment')

  for (comment of allComments) {
    const commentUsername = comment.dataset.username;
    
    // If comment belongs to current user, create Update and Delete buttons
    if (commentUsername == currentUsername) {

      let updateBtn = document.createElement("button");
      updateBtn.innerHTML = "Update";

      // TO DO:
      // updateBtn.onclick = updateComment();

      let deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = "Delete";

      // TO DO:
      // deleteBtn.onclick = deleteComment();

      comment.appendChild(updateBtn);
      comment.appendChild(deleteBtn);
    };    
  };
};

// Event listeners to run login and sign up functions upon submission
var el = document.querySelector('.comment-form');

if(el) {
  el.addEventListener('submit', newCommentHandler);  
};

updateDeleteComments();