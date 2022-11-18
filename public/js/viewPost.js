// Target all document elements with  "post" class
const postElements = document.getElementsByClassName("post");

// Redirect user to endpoint of that post's ID
const viewPost = async (event) => {

    // Get ID of post clicked
    postId = event.target.getAttribute('id')    

    // Redirect user to endpoint of selected post 
    document.location.replace(`/api/loggedIn/post/${postId}`);
}

// Add event listener that runs viewPost upon click to each post
for (let post of postElements) {
    post.addEventListener("click", viewPost);
}


// console.log('Local Storage User ID?-----------');

// console.log(localStorage.getItem('userId'));