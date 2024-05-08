const apiKey = 'b2efbdbbc6bd81460ab1aee451452cf2'; // Replace 'YOUR_API_KEY' with your TMDb API key

// Function to fetch movies based on search query
function fetchMoviesBySearch(query) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`; // Fetches movies based on search query
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Log the fetched data
            // Process the fetched data and create movie cards dynamically
            displayMovies(data.results);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

// Function to display movies on the page
function displayMovies(movies) {
    const movieCardsContainer = document.getElementById('movieCards');
    movieCardsContainer.innerHTML = ''; // Clear previous movie cards

    movies.forEach(movie => {
        const card = document.createElement('div');
        card.classList.add('col-md-4', 'mb-4');
        card.innerHTML = `
            <div class="card">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}">
                <div class="card-body">
                    <h5 class="card-title">${movie.title}</h5>
                    <p class="card-text">${movie.overview}</p>
                    <a href="#" class="btn btn-primary">Details</a>
                </div>
            </div>
        `;
        movieCardsContainer.appendChild(card);
    });
}

// Event listener for search button click
document.getElementById('searchButton').addEventListener('click', function() {
    const searchInput = document.getElementById('searchInput').value.trim();
    if (searchInput !== '') {
        fetchMoviesBySearch(searchInput);
    }
});

// Function to display more details for the clicked movie card
function expandMovieDetails(card, movie) {
    // Construct the HTML content for the expanded details
    const detailsContent = `
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}">
        <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">${movie.overview}</p>
            <p>Release Date: ${movie.release_date}</p>
            <p>Vote Average: ${movie.vote_average}</p>
            <!-- Add more movie details here -->
        </div>
    `;

    // Update the content of the clicked card with the expanded details
    card.innerHTML = detailsContent;
}

// Event listener for "Details" button click
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('details-button')) {
        const card = event.target.closest('.movie-card'); // Find the closest movie card
        const movieId = event.target.dataset.movieId;
        fetchMovieDetails(card, movieId); // Pass the card and movie ID to fetch movie details
    }
});

// Function to fetch movie details by ID
function fetchMovieDetails(card, movieId) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Log the fetched movie details
            expandMovieDetails(card, data); // Expand the clicked card with the movie details
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}







// $(document).ready(function() {
//     // Function to fetch movie data from IMDb API
//     function fetchMovies() {
//         // Make API request to fetch movies
        
//         // Process the response and create movie cards
//     }

//     // Function to create movie cards
//     function createMovieCard(movie) {
//         // Create HTML structure for movie card using movie details
//         // Add drag and drop attributes
//         // Append the card to the movieCards container
//     }

//     // Fetch movies when the page loads
//     fetchMovies();
// });

