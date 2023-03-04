const modal = document.getElementById("modal");
const form = document.getElementById("new-post-form");
const postsContainer = document.getElementById("posts-container");

let posts = [];

// Open the modal when the "Create New Blog" button is clicked
function openModal() {
  modal.style.display = "block";
}

// Close the modal when the user clicks the "X" button or outside the modal
function closeModal() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    closeModal();
  }
}

// Handle form submission to create a new post
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the default form submission behavior

  const title = event.target.elements.title.value;
  const description = event.target.elements.description.value;

  // Create a new post object and add it to the posts array
  const newPost = {
    title: title,
    description: description,
    timestamp: Date.now()
  };

  posts.push(newPost);

  // Add the new post to the page
  const postElement = createPostElement(newPost);
  postsContainer.appendChild(postElement);

  // Reset the form and close the modal
  form.reset();
  closeModal();
});

// Create an HTML element for a post
function createPostElement(post) {
  const postElement = document.createElement("div");
  postElement.classList.add("post");

  const titleElement = document.createElement("h2");
  titleElement.textContent = post.title;

  const descriptionElement = document.createElement("p");
  descriptionElement.textContent = post.description;
   

  const timestampElement = document.createElement("p");
  timestampElement.textContent = `Posted on ${new Date(post.timestamp).toLocaleString()}`;
  //changed
  const editButton = document.createElement("button");
  editButton.textContent = "Edit post";
  editButton.classList.add("editButton");
  editButton.addEventListener("click", () => {
    editPost(post);
  });

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete post";
  deleteButton.classList.add("deleteButton");
  deleteButton.addEventListener("click", () => {
    deletePost(post);
  });
//  end of change

  postElement.appendChild(titleElement);
  postElement.appendChild(descriptionElement);
  postElement.appendChild(timestampElement);
  postElement.appendChild(editButton);
  postElement.appendChild(deleteButton);

  return postElement;
}


// Edit a post
function editPost(post) {
  const index = posts.indexOf(post);

  // Prompt the user to enter new title and description for the post
  const newTitle = prompt("Enter a new title", post.title);
  const newDescription = prompt("Enter a new description", post.description);

  // Update the post object with the new title and description
  posts[index].title = newTitle;
  posts[index].description = newDescription;

  posts[index].timestamp = Date.now();

  // Update the post element on the page
  const postElement = postsContainer.childNodes[index];
  const titleElement = postElement.childNodes[0];
  const descriptionElement = postElement.childNodes[1];
  const timestampElement = postElement.childNodes[2];
timestampElement.textContent = `Last Updated on ${new Date(post.timestamp).toLocaleString()}`;


  titleElement.textContent = newTitle;
  descriptionElement.textContent = newDescription;
}


// Delete a post
function deletePost(post) {
  const index = posts.indexOf(post);

  // Remove the post from the posts array
  posts.splice(index, 1);

  // Remove the post element from the page
  const postElement = postsContainer.childNodes[index];
  postsContainer.removeChild(postElement);
}

