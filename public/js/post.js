// TO DO: FE- Click one post and redirect User

// Target all document elements with the "post" class
const postElements = document.getElementsByClassName("post");

// Gets id from post clicked
const viewPost = async (event) => {

    // Get ID of post clicked
    postId = event.target.getAttribute('id')    

    console.log(postId)
    document.location.replace(`/api/loggedIn/post/${postId}`);
}

// For each post, add event listener that runs viewPost upon click
for (let post of postElements) {
    post.addEventListener("click", viewPost);
}
