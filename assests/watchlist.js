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

// ************************************************************************************************************************************************************************************************

// Determine the category for each movie based on its properties
function determineCategory(movie) {
    // Example logic: categorize movies as 'horror' or 'thriller' based on their title or other properties
    // You can customize this logic based on your requirements
    return movie.title.toLowerCase().includes('horror') ? 'horror' : 'thriller';
}

// ************************************************************************************************************************************************************************************************

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

// ************************************************************************************************************************************************************************************************

// Display watchlist on the page when the document is loaded
document.addEventListener('DOMContentLoaded', function() {
    displayWatchlist();
});

// Initialize SortableJS for nested sortables
initializeSortable();

