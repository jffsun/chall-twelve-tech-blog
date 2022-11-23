// Updates a comment
const newPost = async (event) => {
    event.preventDefault();

    // Get comment.id of the comment clicked
    commentId = event.target.parentNode.id;

    // Create a text area for new comment to be input
    let newTitle = document.createElement("textarea");
    let newContent = document.createElement("textarea");
    newTitle.setAttribute('placeholder', 'TITLE')
    newContent.setAttribute('placeholder','Type your post here...')
    newTextArea.setAttribute('id','newPost');

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