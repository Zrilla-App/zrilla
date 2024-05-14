// Function to display watchlist on the page
function displayWatchlist() {
  // Retrieve watchlist from localStorage
  const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  const folders = JSON.parse(localStorage.getItem("folders")) || [];
  const watchlistOrder = JSON.parse(localStorage.getItem("watchlistOrder")) || [];


  // Display each folder
  folders.forEach((folderName) => {
    const folderElement = document.createElement("div");
    folderElement.classList.add("watchlist-container", "folder");

    const watchlistTitle = document.createElement("div");
    watchlistTitle.classList.add("watchlist-title");
    watchlistTitle.textContent = folderName;

    const watchlistItems = document.createElement("div");
    watchlistItems.classList.add("watchlist-items");

    // Append the title to the folder element
    folderElement.appendChild(watchlistTitle);

    // Append the delete button for the folder
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Folder";
    deleteButton.classList.add("delete-folder-button");
    deleteButton.addEventListener("click", function () {
      folderElement.remove();
    });

    // Append the delete button to the folder element
    folderElement.appendChild(deleteButton);

    // Append the items to the folder element
    folderElement.appendChild(watchlistItems);

    const watchlistContainer = document.getElementById("generalWatchlist");
    watchlistContainer.appendChild(folderElement);
  });

  // Function to add a new folder

  // Display each movie in the watchlist
  watchlist.forEach((movie) => {
    const watchlistContainer = document
      .getElementById("generalWatchlist")
      .querySelector(".watchlist-items");

    const movieElement = document.createElement("div");
    movieElement.classList.add("watch-card");
    movieElement.setAttribute("data-id", movie.id);
    const movieTitle = movie.title || "Title Not Available";
    const voteAverage = movie.vote_average || "Vote Average Not Available";
    movieElement.textContent = `${movieTitle} - Vote Average: ${voteAverage}`;
    watchlistContainer.appendChild(movieElement);
  });

  // Initialize SortableJS for nested sortables
  initializeSortable();

  // Add event listener to delete watchlist items
  document.querySelectorAll(".watchlist-item-delete").forEach((item) => {
    item.addEventListener("click", deleteWatchlistItem);
  });

  // Add event listener to delete folder buttons
  document.querySelectorAll(".delete-folder-button").forEach((button) => {
    button.addEventListener("click", function () {
      button.parentElement.remove();
    });
  });
}

// Function to delete a watchlist item
function deleteWatchlistItem(event) {
  event.target.parentElement.remove();
}

function addFolder() {
  // Prompt the user for the folder name
  const folderName = prompt("Enter the name of the folder:");

  // Check if the user entered a folder name
  if (folderName) {
    // Create a new folder element
    const folderElement = document.createElement("div");
    folderElement.classList.add("watchlist-container", "folder");

    const watchlistTitle = document.createElement("div");
    watchlistTitle.classList.add("watchlist-title");
    watchlistTitle.textContent = folderName;

    const watchlistItems = document.createElement("div");
    watchlistItems.classList.add("watchlist-items");

    // Append the title to the folder element
    folderElement.appendChild(watchlistTitle);

    // Append the delete button for the folder
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Folder";
    deleteButton.classList.add("delete-folder-button");
    deleteButton.addEventListener("click", function () {
      folderElement.remove();
    });

    // Append the delete button to the folder element
    folderElement.appendChild(deleteButton);

    // Append the items to the folder element
    folderElement.appendChild(watchlistItems);

    // Append the folder element to the watchlist container
    const watchlistContainer = document.getElementById("generalWatchlist");
    watchlistContainer.appendChild(folderElement);

    // Save folder in localStorage
    const folders = JSON.parse(localStorage.getItem("folders")) || [];
    folders.push(folderName);
    localStorage.setItem("folders", JSON.stringify(folders));

    // Initialize SortableJS for the newly added folder
    initializeSortable();
  } else {
    alert("Folder name cannot be empty!");
  }
}

// Add event listener to delete watchlist items
document.querySelectorAll(".watchlist-item-delete").forEach((item) => {
  item.addEventListener("click", deleteWatchlistItem);
});

// Add event listener to the "Add Folder" button
document
  .getElementById("addFolderButton")
  .addEventListener("click", function () {
    addFolder();
  });

// Function to delete a folder
function deleteFolder(folderName) {
  // Find the folder element with the specified name
  const folderElements = document
    .getElementById("generalWatchlist")
    .querySelectorAll(".folder");
  folderElements.forEach((folderElement) => {
    if (folderElement.textContent === folderName) {
      // Remove the folder element
      folderElement.remove();

      // Remove folder from localStorage
      const folders = JSON.parse(localStorage.getItem("folders")) || [];
      const index = folders.indexOf(folderName);
      if (index !== -1) {
        folders.splice(index, 1);
        localStorage.setItem("folders", JSON.stringify(folders));
      }
    }
  });
}

// Function to initialize SortableJS for nested sortables
function initializeSortable() {
  const containers = document.querySelectorAll(".watchlist-items");
  containers.forEach((container) => {
    new Sortable(container, {
      animation: 150,
      handle: ".watch-card",
      ghostClass: "sortable-ghost",
      fallbackClass: "sortable-fallback",
      swapThreshold: 0.65,
      // multiDrag: true,
      // multiDragKey: 'ctrlKey',
      group: "nested",
      sort: true,
      nested: true,
      onEnd: saveOrder,
    });
  });
}

// Function to save the order of nested watchlist and folders to localStorage
function saveOrder() {
    const watchlistContainer = document.querySelector('.watchlist-items');
    const items = watchlistContainer.querySelectorAll('.watch-card');
    const order = Array.from(items).map((item) => item.getAttribute('data-id'));
    localStorage.setItem('watchlistOrder', JSON.stringify(order));
    console.log('order', order);
}

// Display watchlist on the page when the document is loaded
document.addEventListener("DOMContentLoaded", function () {
  displayWatchlist();
});

// Initialize SortableJS for nested sortables
initializeSortable();
