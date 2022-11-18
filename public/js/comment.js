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

// Update comment
const updateComment = async (event) => {
    event.preventDefault();

    // Get id of the comment clicked from parent element
    commentId = event.target.parentNode.id;

    // Create text area for new comment to be input
    let newTextArea = document.createElement("textarea");

    newTextArea.setAttribute('placeholder','Enter updated comment here..')
    newTextArea.setAttribute('id',`comment${commentId}`);


    let submitBtn = document.createElement("button");
    submitBtn.innerHTML = "Submit";
    submitBtn.type = "click";

    // Append text area and submit buttons to comment container
    event.target.parentNode.appendChild(submitBtn);
    event.target.parentNode.appendChild(newTextArea)

    function submitUpdate () {
       // targets inputs from that selected message
      const updatedText = $(`#comment${commentId}`).val()
      console.log(updatedText);
    }
    submitBtn.addEventListener("click", submitUpdate);
  


    // const response = await fetch('/api/teacher', {
    // method: 'PUT',
    // body: JSON.stringify({
    //     id: containerID,
    //     title: title,
    //     message: message,
    //     where: where,
    //     when: when
    // }),
    // headers: {'Content-Type': 'application/json'}
    // });
    // if (response.ok) {
    //     alert("Message updated!");
    //     document.location.reload();
    // } else { 
    //     alert("Something went wrong. Can't update message");
    // };
};

// Renders update and delete comment buttons for comments belonging to user 
const updateDeleteComments = async () => {

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