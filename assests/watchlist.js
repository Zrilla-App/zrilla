// Event listener for "Add to Watchlist" button click
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('add-to-watchlist-button')) {
        const movieId = event.target.dataset.movieId;
        addToWatchlist(movieId);
    }
});

// Function to add a movie to the watchlist
function addToWatchlist(movieId) {
    // Implement logic to add the movie to the user's watchlist
    console.log(`Added movie with ID ${movieId} to watchlist`);
}

// Function to add a movie to the watchlist
function addToWatchlist(movieId, movieTitle) {
    // Retrieve existing watchlist from localStorage
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

    // Check if the movie is already in the watchlist
    if (watchlist.some(movie => movie.id === movieId)) {
        console.log('Movie already exists in the watchlist');
    } else {
        // Add the movie to the watchlist
        watchlist.push({ id: movieId, title: movieTitle });
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
        console.log('Movie added to watchlist:', movieTitle);
    }
}

// Example usage:
addToWatchlist(123, 'Movie Title 1'); // Add movie with ID 123 to the watchlist
addToWatchlist(456, 'Movie Title 2'); // Add movie with ID 456 to the watchlist

