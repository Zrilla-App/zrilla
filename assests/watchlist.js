const apiKey = 'b2efbdbbc6bd81460ab1aee451452cf2'; // Replace 'YOUR_API_KEY' with your TMDb API key

let currentPage = 1; // Track the current page of search results
const resultsPerPage = 3; // Number of results to display per page

// Function to fetch movies based on search query
function fetchMoviesBySearch(query) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&page=${currentPage}&include_adult=false`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Log the fetched data
            // Filter out movies with missing posters
            const filteredResults = data.results.filter(movie => movie.poster_path);
            // Process the fetched data and create movie cards dynamically
            if (currentPage === 1) {
                displayMovies(filteredResults.slice(0, resultsPerPage));
            } else {
                appendMovies(filteredResults.slice(0, 6)); // Limit to 6 results when appending
            }
            // Check if there are more results to display
            if (filteredResults.length > resultsPerPage) {
                displayShowMoreButton();
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

// Function to display watchlist on the page
function displayWatchlist() {
    // Retrieve watchlist from localStorage
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    
    // Reference to the watchlist container in HTML
    const watchlistContainer = document.getElementById('watchlistContainer');

    // Clear previous watchlist items
    watchlistContainer.innerHTML = '';

    // Display each movie in the watchlist
    watchlist.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.textContent = `${movie.title} - Vote Average: ${movie.vote_average}`;
        watchlistContainer.appendChild(movieElement);
    });
}

// Display watchlist on the page when the document is loaded
document.addEventListener('DOMContentLoaded', function() {
    displayWatchlist();
});

