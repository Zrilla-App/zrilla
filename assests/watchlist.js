const apiKey = 'b2efbdbbc6bd81460ab1aee451452cf2'; // Replace 'YOUR_API_KEY' with your TMDb API key

// Function to display watchlist on the page
function displayWatchlist() {
    // Retrieve watchlist from localStorage
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

    // Display each movie in the watchlist under respective categories
    watchlist.forEach(movie => {
        const category = determineCategory(movie); // Determine the category for each movie
        const watchlistContainer = document.getElementById(`${category}Watchlist`).querySelector('.watchlist-items');

        const movieElement = document.createElement('div');
        movieElement.classList.add('watch-card');
        const movieTitle = movie.title || 'Title Not Available';
        const voteAverage = movie.vote_average || 'Vote Average Not Available';
        movieElement.textContent = `${movieTitle} - Vote Average: ${voteAverage}`;
        watchlistContainer.appendChild(movieElement);
    });

    // Initialize SortableJS for nested sortables
    const containers = document.querySelectorAll('.watchlist-items');
    containers.forEach(container => {
        new Sortable(container, {
            animation: 150,
            handle: '.watch-card',
            ghostClass: 'sortable-ghost',
            fallbackClass: 'sortable-fallback',
            swapThreshold: 0.65,
            multiDrag: true,
            multiDragKey: 'ctrlKey',
            group: 'nested',
            sort: true,
            nested: true
        });
    });
}

// Determine the category for each movie based on its properties
function determineCategory(movie) {
    // Example logic: categorize movies as 'horror' or 'thriller' based on their title or other properties
    // You can customize this logic based on your requirements
    return movie.title.toLowerCase().includes('horror') ? 'horror' : 'thriller';
}

// Display watchlist on the page when the document is loaded
document.addEventListener('DOMContentLoaded', function() {
    displayWatchlist();
});


// Function to add a new watchlist item
function addWatchlistItem(title, voteAverage, category) {
    // Create a new movie object
    const movie = { title, voteAverage };

    // Update the watchlist in localStorage
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    watchlist.push(movie);
    localStorage.setItem('watchlist', JSON.stringify(watchlist));

    // Add the new movie to the appropriate category container
    const watchlistContainer = document.getElementById(`${category}Watchlist`).querySelector('.watchlist-items');
    const movieElement = document.createElement('div');
    movieElement.classList.add('watch-card');
    movieElement.textContent = `${title} - Vote Average: ${voteAverage}`;
    watchlistContainer.appendChild(movieElement);

    // Initialize SortableJS for nested sortables
    initializeSortable();
}

// Function to delete a watchlist item
function deleteWatchlistItem(category, index) {
    // Remove the movie from the DOM
    const watchlistContainer = document.getElementById(`${category}Watchlist`).querySelector('.watchlist-items');
    watchlistContainer.removeChild(watchlistContainer.childNodes[index]);

    // Update the watchlist in localStorage
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    watchlist.splice(index, 1);
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
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
            multiDrag: true,
            multiDragKey: 'ctrlKey',
            group: 'nested',
            sort: true,
            nested: true
        });
    });
}

// Event listener for adding a new watchlist item
document.getElementById('addWatchlistItemBtn').addEventListener('click', function() {
    const title = document.getElementById('watchlistItemTitle').value.trim();
    const voteAverage = document.getElementById('watchlistItemVoteAverage').value.trim();
    const category = document.getElementById('watchlistItemCategory').value.trim();

    if (title && voteAverage && category) {
        addWatchlistItem(title, voteAverage, category);
    } else {
        alert('Please fill out all fields.');
    }
});

// Event listener for deleting a watchlist item
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-watchlist-item')) {
        const category = event.target.dataset.category;
        const index = event.target.dataset.index;
        deleteWatchlistItem(category, index);
    }
});

// Display watchlist on the page when the document is loaded
document.addEventListener('DOMContentLoaded', function() {
    displayWatchlist();
    initializeSortable();
});
