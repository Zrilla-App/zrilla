document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    const movieCards = document.getElementById('movieCards');

    searchButton.addEventListener('click', () => {
        const query = searchInput.value;
        fetchMovies(query);
    });

    async function fetchMovies(query) {
        const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=your_api_key&query=${query}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        displayMovies(data.results);
    }

    function displayMovies(movies) {
        movieCards.innerHTML = '';
        movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.className = 'col-md-4 mb-3';
            movieCard.innerHTML = `
                <div class="card">
                    <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="card-img-top" alt="${movie.title}">
                    <div class="card-body">
                        <h5 class="card-title">${movie.title}</h5>
                        <p class="card-text">${movie.overview}</p>
                        <button class="btn btn-primary" onclick="showDetails(${movie.id})">View Details</button>
                    </div>
                </div>
            `;
            movieCards.appendChild(movieCard);
        });
    }

    window.showDetails = async function(movieId) {
        const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=your_api_key`;
        const response = await fetch(apiUrl);
        const movie = await response.json();

        document.getElementById('title').textContent = movie.title;
        document.getElementById('movieDetails').textContent = movie.overview;
        document.getElementById('releaseDate').textContent = `Release Date: ${movie.release_date}`;
        document.getElementById('voteAverage').textContent = `Rating: ${movie.vote_average}`;
        document.getElementById('poster').innerHTML = `<img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="img-fluid" alt="${movie.title}">`;

        $('#modal-js-example').modal('show');
    }

    const searchYouTubeButton = document.getElementById('btnYoutube');
    const searchMoviesButton = document.getElementById('btnMovie');
    const youtubeSearch = document.getElementById('youtubeSearch');
    const movieSearch = document.getElementById('movieSearch');

    searchYouTubeButton.addEventListener('click', () => {
        movieSearch.classList.add('d-none');
        youtubeSearch.classList.remove('d-none');
    });

    searchMoviesButton.addEventListener('click', () => {
        youtubeSearch.classList.add('d-none');
        movieSearch.classList.remove('d-none');
    });
});
