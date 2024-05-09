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

// ******************************************************************************************************************************************************

// Function to display movies on the page
function displayMovies(movies) {
    const movieCardsContainer = document.getElementById('movieCards');
    movieCardsContainer.innerHTML = ''; // Clear previous movie cards

    movies.forEach(movie => {
        const card = document.createElement('div');
        card.classList.add('col-md-4', 'mb-4', 'movie-card');
        card.innerHTML = `
            <div class="card">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}">
                <div class="card-body">
                    <h5 class="card-title dark-Text">${movie.title}</h5>
                    <p class="card-text">${movie.overview}</p>
                    <button class="btn btn-primary backCard" data-movie-id="${movie.id}">Back</button>
                </div>
            </div>
        `;
        movieCardsContainer.appendChild(card);
    });

    // Scroll to the "Show More" button at the bottom of the page
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
}

// ******************************************************************************************************************************************************

// Function to append movies to the existing list
function appendMovies(movies) {
    const movieCardsContainer = document.getElementById('movieCards');

    movies.forEach(movie => {
        const card = document.createElement('div');
        card.classList.add('col-md-4', 'mb-4', 'movie-card');
        card.innerHTML = `
            <div class="card">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}">
                <div class="card-body">
                    <h5 class="card-title">${movie.title}</h5>
                    <p class="card-text">${movie.overview}</p>
                    <button class="btn btn-primary details-button" data-movie-id="${movie.id}">Details</button>
                </div>
            </div>
        `;
        movieCardsContainer.appendChild(card);
    });

    // Scroll to the "Show More" button at the bottom of the page
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
}

// ******************************************************************************************************************************************************

// Function to display "Show More" button
function displayShowMoreButton() {
    // Remove any existing "Show More" button
    const existingShowMoreButton = document.getElementById('showMoreButton');
    if (existingShowMoreButton) {
        existingShowMoreButton.remove();
    }

    const showMoreButton = document.createElement('button');
    showMoreButton.id = 'showMoreButton';
    showMoreButton.classList.add('btn', 'btn-primary', 'mt-3', 'show-more-button');
    showMoreButton.textContent = 'Show More';
    showMoreButton.onclick = function() {
        currentPage++; // Increment current page
        const searchInput = document.getElementById('searchInput').value.trim();
        if (searchInput !== '') {
            fetchMoviesBySearch(searchInput);
        }
    };
    const movieCardsContainer = document.getElementById('movieCards');
    movieCardsContainer.parentNode.appendChild(showMoreButton);
}

// ******************************************************************************************************************************************************

// Event listener for search button click
document.getElementById('searchButton').addEventListener('click', function() {
    const searchInput = document.getElementById('searchInput').value.trim();
    if (searchInput !== '') {
        currentPage = 1; // Reset current page when initiating a new search
        fetchMoviesBySearch(searchInput);
    }
});

// ******************************************************************************************************************************************************

// Function to display movies on the page
function displayMovies(movies) {
    const movieCardsContainer = document.getElementById('movieCards');
    movieCardsContainer.innerHTML = ''; // Clear previous movie cards

    movies.forEach(movie => {
        const card = document.createElement('div');
        card.classList.add('col-md-4', 'mb-4', 'movie-card');
        card.innerHTML = `
            <div class="card">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}">
                <div class="card-body">
                    <h5 class="card-title Dark-text">${movie.title}</h5>
                    <div class="btn-group" role="group">
                        <button class="btn btn-primary details-button" data-movie-id="${movie.id}">Details</button>
                        <button class="btn btn-success add-to-watchlist-button" data-movie-id="${movie.id}">Add to Watchlist</button>
                        <button class="btn btn-info start-review-button" data-movie-id="${movie.id}">Start Review</button>
                    </div>
                </div>
            </div>
        `;
        movieCardsContainer.appendChild(card);
    });
}

// ******************************************************************************************************************************************************

// Event listener for search button click
document.getElementById('searchButton').addEventListener('click', function() {
    const searchInput = document.getElementById('searchInput').value.trim();
    if (searchInput !== '') {
        currentPage = 1; // Reset current page when initiating a new search
        fetchMoviesBySearch(searchInput);
    }
});

// ******************************************************************************************************************************************************

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
            <button class="btn btn-primary backCard-button" data-movie-id="${movie.id}">Back</button>
        </div>
    `;

    // Update the content of the clicked card with the expanded details
    card.innerHTML = detailsContent;
}

// ******************************************************************************************************************************************************

// Function to expand card body when "Details" button is clicked
function expandCardBody(card) {
    const cardBody = card.querySelector('.card-body');
    cardBody.classList.add('expanded'); // Remove height restriction
}

// ******************************************************************************************************************************************************

// Event listener for "Details" button click
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('details-button')) {
        const card = event.target.closest('.movie-card'); // Find the closest movie card
        const movieId = event.target.dataset.movieId;
        cla
        fetchMovieDetails(card, movieId); // Pass the card and movie ID to fetch movie details
        expandCardBody(card); // Expand the card body
    }
});

document.addEventListener('click', function(event) { //back button function
    console.log("back button clicked")
    if (event.target.classList.contains('backCard')) {
        const card = event.target.closest('.movie-card'); // Find the closest movie card
        const movieId = event.target.dataset.movieId;
        fetchMovieDetails(card, movieId); // Pass the card and movie ID to fetch movie details
        card.classList.add('dark-Text');
        
        card.innerHTML = `
            <div class="card">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}">
                <div class="card-body">
                    <h5 class="card-title">${movie.title}</h5>
                    <div class="btn-group" role="group">
                        <button class="btn btn-primary details-button" data-movie-id="${movie.id}">Details</button>
                        <button class="btn btn-success add-to-watchlist-button" data-movie-id="${movie.id}">Add to Watchlist</button>
                        <button class="btn btn-info start-review-button" data-movie-id="${movie.id}">Start Review</button>
                    </div>
                    <p class="card-text">${movie.overview}</p>
                </div>
            </div>
        `;
    }
});


// ******************************************************************************************************************************************************

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

// ******************************************************************************************************************************************************

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

// Event listener for "Start Review" button click
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('start-review-button')) {
        const movieId = event.target.dataset.movieId;
        startReview(movieId);
    }
});

// Function to start a review for a movie
function startReview(movieId) {
    // Implement logic to navigate to the review page for the specified movie
    console.log(`Started review for movie with ID ${movieId}`);
}
