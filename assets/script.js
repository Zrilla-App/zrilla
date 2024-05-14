const apiKey = 'b2efbdbbc6bd81460ab1aee451452cf2'; // Replace 'YOUR_API_KEY' with your TMDb API key
let currentPage = 1; // Track the current page of search results
const resultsPerPage = 3; // Number of results to display per page
let originalSearchQuery = ''; // Store the original search query

// Function to fetch movies based on search query
function fetchMoviesBySearch(query) {
    const movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&page=${currentPage}&include_adult=false&with_genres=27|53`;
    const tvUrl = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${query}&page=${currentPage}&include_adult=false&with_genres=27|53`;

    Promise.all([fetch(movieUrl), fetch(tvUrl)])
        .then(responses => Promise.all(responses.map(response => response.json())))
        .then(data => {
            const [movieData, tvData] = data;
            console.log('Movie Data:', movieData);
            console.log('TV Data:', tvData);

            // Filter out movies and TV shows with missing posters
            const filteredMovies = movieData.results.filter(movie => movie.poster_path);
            const filteredTvShows = tvData.results.filter(show => show.poster_path);

            // Combine the filtered movie and TV show results
            const combinedResults = [...filteredMovies, ...filteredTvShows];

            // Process the fetched data and create movie/show cards dynamically
            if (currentPage === 1) {
                displayMoviesAndShows(combinedResults.slice(0, resultsPerPage));
            } else {
                appendMoviesAndShows(combinedResults.slice(0, 6)); // Limit to 6 results when appending
            }

            // Check if there are more results to display
            if (combinedResults.length > resultsPerPage) {
                displayShowMoreButton();
            }
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

// Function to display movies and shows on the page
function displayMoviesAndShows(results) {
    const movieCardsContainer = document.getElementById('movieCards');
    movieCardsContainer.innerHTML = ''; // Clear previous movie/show cards

    results.forEach(result => {
        const card = document.createElement('div');
        card.classList.add('col-md-4', 'mb-4', 'movie-card');
        card.innerHTML = `
            <div class="card">
                <img src="https://image.tmdb.org/t/p/w500${result.poster_path}" class="card-img-top" alt="${result.title || result.name}">
                <div class="card-body">
                    <h5 class="card-title">${result.title || result.name}</h5>
                    <div class="btn-group" role="group">
                        <button class="btn btn-primary details-button js-modal-trigger" data-target="modal-js-example" data-movie-id="${result.id}" data-media-type="${result.media_type}" data-movie-info="${JSON.stringify(result).replace(/"/g, '&quot;')}">Details</button>
                        <button class="btn btn-success add-to-watchlist-button" data-movie-id="${result.id}" data-movie-title="${result.title || result.name}" data-movie-vote="${result.vote_average}">Add to Watchlist</button>
                        <button class="btn btn-info start-review-button" data-movie-id="${result.id}">Start Review</button>
                    </div>
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

// Function to append movies and shows to the existing list
function appendMoviesAndShows(results) {
    const movieCardsContainer = document.getElementById('movieCards');

    results.forEach(result => {
        const card = document.createElement('div');
        card.classList.add('col-md-4', 'mb-4', 'movie-card');
        card.innerHTML = `
            <div class="card">
                <img src="https://image.tmdb.org/t/p/w500${result.poster_path}" class="card-img-top" alt="${result.title || result.name}">
                <div class="card-body">
                    <h5 class="card-title">${result.title || result.name}</h5>
                    <p>Type: ${result.media_type === 'movie' ? 'Movie' : 'TV Show'}</p>
                    <div class="btn-group" role="group">
                        <button class="btn btn-primary details-button js-modal-trigger" data-target="modal-js-example" data-movie-id="${result.id}" data-media-type="${result.media_type}" data-movie-info="${JSON.stringify(result).replace(/"/g, '&quot;')}">Details</button>
                        <button class="btn btn-success add-to-watchlist-button" data-movie-id="${result.id}" data-movie-title="${result.title || result.name}" data-movie-vote="${result.vote_average}">Add to Watchlist</button>
                        <button class="btn btn-info start-review-button" data-movie-id="${result.id}">Start Review</button>
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

// Function to display "Show More" button
function displayShowMoreButton() {
    // Remove any existing "Show More" button
    const existingShowMoreButton = document.getElementById('showMoreButton');
    if (existingShowMoreButton) {
        existingShowMoreButton.remove();
    }

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('text-center', 'mt-3', 'mb-5');
    const showMoreButton = document.createElement('button');
    showMoreButton.id = 'showMoreButton';
    showMoreButton.classList.add('btn', 'btn-primary', 'show-more-button');
    showMoreButton.textContent = 'Show More';
    showMoreButton.onclick = function() {
        currentPage++; // Increment current page
        if (originalSearchQuery !== '') {
            fetchMoviesBySearch(originalSearchQuery);
        }
    };
    buttonContainer.appendChild(showMoreButton);

    const movieCardsContainer = document.getElementById('movieCards');
    movieCardsContainer.parentNode.appendChild(buttonContainer);
}

// Event listener for search button click
document.getElementById('searchButton').addEventListener('click', function() {
    const searchInput = document.getElementById('searchInput').value.trim();
    if (searchInput !== '') {
        originalSearchQuery = searchInput; // Store the original search query
        currentPage = 1; // Reset current page when initiating a new search
        fetchMoviesBySearch(searchInput);
    }
});

// Event listener for "keypress" event on search input
document.getElementById('searchInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const searchInput = document.getElementById('searchInput').value.trim();
        if (searchInput !== '') {
            originalSearchQuery = searchInput; // Store the original search query
            currentPage = 1; // Reset current page when initiating a new search
            fetchMoviesBySearch(searchInput);
        }
    }
});

//CODE COMMENTED OUT FOR REVIEW ON MAIN//

// // Function to display more details for the clicked movie card
// function expandMovieDetails(card, movie) {
//     // Construct the HTML content for the expanded details
//     const detailsContent = `
//         <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="card-img-top" alt="${movie.title}">
//         <div class="card-body">
//             <h5 class="card-title">${movie.title}</h5>
//             <p class="card-text">${movie.overview}</p>
//             <p>Release Date: ${movie.release_date}</p>
//             <p>Vote Average: ${movie.vote_average}</p>
//             <!-- Add more movie details here -->
//         </div>
//     `;

//     // Update the content of the clicked card with the expanded details
//     card.innerHTML = detailsContent;
// }

// // Function to expand card body when "Details" button is clicked
// function expandCardBody(card) {
//     const cardBody = card.querySelector('.card-body');
//     cardBody.classList.add('expanded'); // Remove height restriction
// }

// // Event listener for "Details" button click
// document.addEventListener('click', function(event) {
//     if (event.target.classList.contains('details-button')) {
//         const card = event.target.closest('.movie-card'); // Find the closest movie card
//         const movieId = event.target.dataset.movieId;
//         const mediaType = event.target.dataset.mediaType;
//         fetchMovieDetails(card, movieId, mediaType); // Pass the card, movie ID, and media type to fetch movie details
//         expandCardBody(card); // Expand the card body
//     }
// });

// // Function to fetch movie details by ID
// function fetchMovieDetails(card, movieId, mediaType) {
//     let url;
//     if (mediaType === 'movie') {
//         url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
//     } else {
//         url = `https://api.themoviedb.org/3/tv/${movieId}?api_key=${apiKey}`;
//     }

//     fetch(url)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log(data); // Log the fetched movie details
//             expandMovieDetails(card, data); // Expand the clicked card with the movie details
//         })
//         .catch(error => {
//             console.error('There was a problem with the fetch operation:', error);
//         });
// }

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

// Event listener for "Add to Watchlist" button click
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('add-to-watchlist-button')) {
        const movieId = event.target.dataset.movieId;
        const title = event.target.dataset.movieTitle;
        const vote_average = event.target.dataset.movieVote;
        addToWatchlist(movieId, title, vote_average);
    }
});

// Function to add a movie to the watchlist
function addToWatchlist(movieId, title, vote_average) {
    // Retrieve existing watchlist from localStorage
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

    // Check if the movie is already in the watchlist
    if (watchlist.some(movie => movie.id === movieId)) {
        console.log('Movie already exists in the watchlist');
    } else {
        // Add the movie to the watchlist with rating and vote average
        watchlist.push({ id: movieId, title: title, vote_average: vote_average });
        console.log(watchlist);
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
        console.log('Movie added to watchlist:', title);
    }
}

// Function to display movies on the watchlist page
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
