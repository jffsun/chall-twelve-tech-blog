// Adds a new comment to post
const newCommentHandler = async (event) => {

  const newCommentText = document.querySelector('#newCommentText').value.trim();

  // Get the post ID from invisible document element
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

// Renders update and delete comment buttons to comments belonging to user 
const renderUpdateDeleteBtns = async () => {

  // Gets username of the current user from invisible element
  const currentUsername = $('.username').attr('id');
  
  // Gets username of each comment
  const allComments = $('.comment')

  // Compare each comment's username against current user's
  for (comment of allComments) {
    const commentUsername = comment.dataset.username;
    
    // If comment belongs to current user, create Update and Delete buttons
    if (commentUsername == currentUsername) {

      let updateBtn = document.createElement("button");
      updateBtn.innerHTML = "Update";

      // Run updateComment() when update button is clicked
      updateBtn.setAttribute('onclick','updateComment(event)')

      
      let deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = "Delete";

      // TO DO:
      deleteBtn.id = 'deleteButton';
      deleteBtn.setAttribute('onclick','deleteComment(event)')

      comment.appendChild(updateBtn);
      comment.appendChild(deleteBtn);
    };    
  };
};

// Updates a comment
const updateComment = async (event) => {
    event.preventDefault();

    // Get comment.id of the comment clicked
    commentId = event.target.parentNode.id;

    // Create a text area for new comment to be input
    let newTextArea = document.createElement("textarea");
    newTextArea.setAttribute('placeholder','Enter updated comment here..')
    newTextArea.setAttribute('id',`comment${commentId}`);

    // Create a submit button to submit updated comment
    let submitBtn = document.createElement("button");
    submitBtn.innerHTML = "Submit";
    submitBtn.type = "click";

    // Append new elements comment container
    event.target.parentNode.appendChild(submitBtn);
    event.target.parentNode.appendChild(newTextArea)

    // Submits updated comment
    const submitUpdate = async (event) => {

      // Get text from recently created text area
      const updatedText = $(`#comment${commentId}`).val()
      
      // Get comment id
      commentId = event.target.parentNode.id;

      // Get post's id
      const postId = document.getElementsByClassName("post")[0].id;
      
      // Put fetch request
      if (updatedText) {
        const response = await fetch(`/api/loggedIn/post/${postId}`, {
          method: 'PUT',
          body: JSON.stringify({
            text: updatedText,
            post_id: postId,
            id: commentId,
          }),
          headers: { 'Content-Type': 'application/json' }
        });
      
        // Reload page to display new comment
        if (response.ok) {
          alert("Comment updated!")
          document.location.reload();
    
        } else {
          alert(response.statusText);
        }
      }
    }
    // Listen for submit button click
    submitBtn.addEventListener("click", submitUpdate);
};

// Deletes comment
const deleteComment = async (event) => {
  event.preventDefault();
  
  // Get comment id
  commentId = event.target.parentNode.id;

  // Get post's id
  const postId = document.getElementsByClassName("post")[0].id;
  const deleteBtn = document.getElementById('deleteButton');
  
  // Delete fetch request
  const response = await fetch(`/api/loggedIn/post/${postId}`, {
    method: 'DELETE',
    body: JSON.stringify({
      id: commentId,
    }),
    headers: { 'Content-Type': 'application/json' }
  });

  // Reload page to display new comment
  if (response.ok) {
    alert("Comment deleted!")
    document.location.reload();

  } else {
    alert(response.statusText);
  }
  
  // Listen for delte button click
  deleteBtn.addEventListener("click", deleteComment);
};

// Event listeners to run login and sign up functions upon submission
var el = document.querySelector('.comment-form');

if(el) {
  el.addEventListener('submit', newCommentHandler);  
};

renderUpdateDeleteBtns();