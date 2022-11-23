// Handles submitting a new post
const newPostHandler = async (event) => {

  // Stop browser from immediately submitting the form
  event.preventDefault();

  const newTitle = document.querySelector('#newTitle').value.trim();
  const newContent = document.querySelector('#newContent').value.trim();
  const userId = document.getElementsByTagName("header")[0].id;

  // Post fetch request 
  if (newTitle && newContent) {
    const response = await fetch('/api/loggedIn/dashboard', {
      method: 'POST',
      body: JSON.stringify({
        title: newTitle,
        content: newContent,
        user_id: userId
      }),
      headers: { 'Content-Type': 'application/json' }
    });
  
    // Reload page to display new comment
    if (response.ok) {
      alert("Post added!");
      document.location.reload();
    } else {
      alert(response.statusText);
    };
  };
};

// Updates a post
const updatePost = async (event) => {
  event.preventDefault();

  event.target.disabled = true;

  // Get post.id of the post clicked
  postId = event.target.parentNode.id;

  let newPostContainer = document.createElement("div");
  newPostContainer.style.display = 'grid';

  // Create text areas for new post title and content
  let newTitleTextArea = document.createElement("textarea");
  newTitleTextArea.setAttribute('placeholder','Enter new title...')
  newTitleTextArea.setAttribute('id',`postTitle${postId}`);

  let newContentTextArea = document.createElement("textarea");
  newContentTextArea.setAttribute('placeholder','Enter new content...')
  newContentTextArea.setAttribute('id',`postContent${postId}`);
  newContentTextArea.setAttribute('rows','4');

  // Create a submit button to submit updated comment
  let submitBtn = document.createElement("button");
  submitBtn.innerHTML = "Submit";
  submitBtn.type = "click";

  // Append post container
  event.target.parentNode.appendChild(newPostContainer);

  // Append new elements to post container
  newPostContainer.appendChild(newTitleTextArea);
  newPostContainer.appendChild(newContentTextArea);
  newPostContainer.appendChild(submitBtn);

  // Submits updated comment
  const submitPostUpdate = async (event) => {

    // Get text from recently created text area
    const updatedTitle = $(`#postTitle${postId}`).val()
    const updatedContent = $(`#postContent${postId}`).val()

    // Get user's id
    const userId = document.getElementsByTagName("header")[0].id;

    // Get post's id
    postId = event.target.parentNode.parentNode.parentNode.id;
    
    // Put fetch request
    if (updatedTitle && updatedContent) {
      const response = await fetch(`/api/loggedIn/dashboard/mypost/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({
          id: postId,
          title: updatedTitle,
          content: updatedContent,
          user_id: userId,
        }),
        headers: { 'Content-Type': 'application/json' }
      });
    
      // Reload page to display updated post
      if (response.ok) {
        alert("Post updated!")
        document.location.reload();
  
      } else {
        alert(response.statusText);
      }
    }
  }
  // Listen for submit button click
  submitBtn.addEventListener("click", submitPostUpdate);
};

// Deletes post
const deletePost = async (event) => {
  event.preventDefault();
  
  // Get post
  postId = event.target.parentNode.parentNode.id;

  // Get post's id
  const deleteBtn = document.getElementById('deletePostBtn');
  
  // Delete fetch request
  const response = await fetch(`/api/loggedIn/dashboard/mypost/${postId}`, {
    method: 'DELETE',
    body: JSON.stringify({
      id: postId,
    }),
    headers: { 'Content-Type': 'application/json' }
  });

  // Reload page to display new comment
  if (response.ok) {
    alert("Post deleted!")
    document.location.replace('/api/loggedIn/dashboard');

  } else {
    alert(response.statusText);
  }
  
  // Listen for delete button click
  deleteBtn.addEventListener("click", deletePost);
};