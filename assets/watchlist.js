// Function to escape special characters in a string for use as an ID
function escapeId(id) {
  return id.replace(/[^a-zA-Z0-9_-]/g, match => {
    return '\\' + match.charCodeAt(0).toString(16) + ' ';
  });
}

// Function to display watchlist on the page
function displayWatchlist() {
  const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  const folders = JSON.parse(localStorage.getItem("folders")) || [];

  // Clear the existing dynamically added watchlist items
  document.querySelectorAll(".watchlist-container.dynamic-folder").forEach(container => {
    container.remove();
  });

  // Display each dynamic folder
  folders.forEach((folder) => {
    createFolderElement(folder);
  });

  // Display each movie in the respective folder
  watchlist.forEach((movie) => {
    const folderId = movie.folder === "generalWatchlist" ? "generalWatchlist" : escapeId(movie.folder.replace(/\s+/g, '').toLowerCase());
    const watchlistItems = document.querySelector(`#${folderId} .watchlist-items`);
    if (watchlistItems) {
      const movieElement = document.createElement("div");
      movieElement.classList.add("watch-card");
      movieElement.setAttribute("data-id", movie.id);
      const movieTitle = movie.title || "Title Not Available";
      const voteAverage = movie.vote_average || "Vote Average Not Available";
      movieElement.textContent = `${movieTitle} - Vote Average: ${voteAverage}`;
      watchlistItems.appendChild(movieElement);
    }
  });

  // Initialize SortableJS for nested sortables
  initializeSortable();
}

// Function to save the updated watchlist order to localStorage
function saveOrder(event) {
  const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
  const folderElement = event.to.closest('.watchlist-container');
  const folderName = folderElement.querySelector('.watchlist-title').textContent;
  const movieElements = folderElement.querySelectorAll('.watch-card');

  // Update the order of movies in the watchlist
  const updatedWatchlist = [];
  movieElements.forEach((movieElement) => {
    const movieId = movieElement.getAttribute('data-id');
    const movie = watchlist.find(m => m.id === movieId);
    if (movie) {
      movie.folder = folderName === 'Just Watched' ? 'generalWatchlist' : folderName;
      updatedWatchlist.push(movie);
    }
  });

  // Add remaining movies that are not in this folder
  watchlist.forEach((movie) => {
    if (!updatedWatchlist.find(m => m.id === movie.id)) {
      updatedWatchlist.push(movie);
    }
  });

  localStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
  console.log('watchlist updated ==> ', updatedWatchlist);
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
      group: "nested",
      sort: true,
      nested: true,
      onEnd: saveOrder,
    });
  });
}

// Function to create a folder element
function createFolderElement(folderName) {
  const folderId = escapeId(folderName.replace(/\s+/g, '').toLowerCase());
  const folderElement = document.createElement("div");
  folderElement.classList.add("watchlist-container", "folder", "dynamic-folder");
  folderElement.id = folderId;

  const watchlistTitle = document.createElement("div");
  watchlistTitle.classList.add("watchlist-title");
  watchlistTitle.textContent = folderName;

  const watchlistItems = document.createElement("div");
  watchlistItems.classList.add("watchlist-items");

  folderElement.appendChild(watchlistTitle);
  folderElement.appendChild(watchlistItems);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete Folder";
  deleteButton.classList.add("delete-folder-button");
  deleteButton.addEventListener("click", function () {
    folderElement.remove();
    deleteFolder(folderName);
  });

  folderElement.appendChild(deleteButton);

  const watchlistContainer = document.querySelector(".mainContent");
  if (watchlistContainer) {
    watchlistContainer.appendChild(folderElement);
  }
}

// Function to add a new folder
function addFolder() {
  const folderName = prompt("Enter the name of the folder:");

  if (folderName) {
    const folders = JSON.parse(localStorage.getItem("folders")) || [];
    if (folders.includes(folderName)) {
      alert("Folder already exists!");
      return;
    }

    folders.push(folderName);
    localStorage.setItem("folders", JSON.stringify(folders));

    createFolderElement(folderName);
    initializeSortable();
  } else {
    alert("Folder name cannot be empty!");
  }
}

// Function to delete a folder
function deleteFolder(folderName) {
  // Update the folder property of movies that belonged to the deleted folder
  const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  watchlist.forEach(movie => {
    if (movie.folder === folderName) {
      movie.folder = "generalWatchlist"; // Move to default folder
    }
  });
  localStorage.setItem("watchlist", JSON.stringify(watchlist));

  // Remove the folder from localStorage
  let folders = JSON.parse(localStorage.getItem("folders")) || [];
  folders = folders.filter(folder => folder !== folderName);
  localStorage.setItem("folders", JSON.stringify(folders));

  displayWatchlist();
}

// Event listener to display watchlist on the page when the document is loaded
document.addEventListener("DOMContentLoaded", function () {
  displayWatchlist();
  initializeSortable();
});

// Add event listener to the "Add Folder" button
document.getElementById("addFolderButton").addEventListener("click", function () {
  addFolder();
});

