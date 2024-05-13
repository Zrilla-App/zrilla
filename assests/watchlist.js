const apiKey = 'b2efbdbbc6bd81460ab1aee451452cf2'; // Replace 'YOUR_API_KEY' with your TMDb API key

    // Function to display watchlist on the page
    function displayWatchlist() {
        // Retrieve watchlist from localStorage
        const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

        // Display each movie in the watchlist
        watchlist.forEach(movie => {
            const watchlistContainer = document.getElementById('generalWatchlist').querySelector('.watchlist-items');

            const movieElement = document.createElement('div');
            movieElement.classList.add('watch-card');
            const movieTitle = movie.title || 'Title Not Available';
            const voteAverage = movie.vote_average || 'Vote Average Not Available';
            movieElement.textContent = `${movieTitle} - Vote Average: ${voteAverage}`;
            watchlistContainer.appendChild(movieElement);
        });

        // Initialize SortableJS for nested sortables
        initializeSortable();
    }

// Function to add a new folder
function addFolder() {
    // Prompt the user for the folder name
    const folderName = prompt("Enter the name of the folder:");

    // Check if the user entered a folder name
    if (folderName) {
        // Create a new folder element
        const folderElement = document.createElement('div');
        folderElement.classList.add('watchlist-container');

        const watchlistTitle = document.createElement('div');
        watchlistTitle.classList.add('watchlist-title');
        watchlistTitle.textContent = folderName;

        const watchlistItems = document.createElement('div');
        watchlistItems.classList.add('watchlist-items');

        // Append the delete button for the folder
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete Folder';
        deleteButton.addEventListener('click', function() {
            folderElement.remove();
        });

        // Append the title, delete button, and items to the folder element
        folderElement.appendChild(watchlistTitle);
        folderElement.appendChild(deleteButton);
        folderElement.appendChild(watchlistItems);

        // Append the folder element to the watchlist container
        const watchlistContainer = document.getElementById('generalWatchlist');
        watchlistContainer.appendChild(folderElement);

        // Initialize SortableJS for the newly added folder
        initializeSortable();
    } else {
        alert("Folder name cannot be empty!");
    }
}


// Function to delete a watchlist item
function deleteWatchlistItem(event) {
    event.target.parentElement.remove();
}

// Add event listener to delete watchlist items
document.querySelectorAll('.watchlist-item-delete').forEach(item => {
    item.addEventListener('click', deleteWatchlistItem);
});


// Add event listener to the "Add Folder" button
document.getElementById('addFolderButton').addEventListener('click', function() {
    addFolder();
});


    // Function to delete a folder
    function deleteFolder(folderName) {
        // Find the folder element with the specified name
        const folderElements = document.getElementById('generalWatchlist').querySelectorAll('.folder');
        folderElements.forEach(folderElement => {
            if (folderElement.textContent === folderName) {
                // Remove the folder element
                folderElement.remove();
            }
        });
    }

    // Function to initialize SortableJS for nested sortables
    function initializeSortable() {
        const containers = document.querySelectorAll('.watchlist-items');
        containers.forEach(container => {
            new Sortable(container, {
                animation: 150,
                handle: '.watch-card',
                ghostClass: 'sortable-ghost',
                fallbackClass: 'sortable-fallback',
                swapThreshold: 0.65,
                // multiDrag: true,
                // multiDragKey: 'ctrlKey',
                group: 'nested',
                sort: true,
                nested: true,
            });
        });
    }

    // Display watchlist on the page when the document is loaded
    document.addEventListener('DOMContentLoaded', function() {
        displayWatchlist();
    });

    // Initialize SortableJS for nested sortables
    initializeSortable();