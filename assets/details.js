let button = document.getElementById('details-button'); 

document.addEventListener('click', function (event) {

    //class selector to get details//
    if (event.target.classList.contains('details-button')) {
        console.log('request for details')
        const movieInfo = JSON.parse(event.target.getAttribute('data-movie-info'));
        const movie = (movieInfo);

        console.log(JSON.parse(event.target.getAttribute('data-movie-info')));

        const movieId = movieInfo.id;
        const movieTitle = movieInfo.original_title;
        const releaseDate = movieInfo.release_date;
        const voteAverage = movieInfo.vote_average;
        const overview = movieInfo.overview;
        const poster = movieInfo.backdrop_path;

        console.log("event: ", event, "target: ", event.target)
        console.log("Movie details: " + movie);

        // update movie information//

        updateMovieDetails(poster, movieTitle, overview, releaseDate, voteAverage);


        /////////////////////////////////////////////////////////////////////
        // Functions to open and close a modal
        /////////////////////////////////////////////////////////////////////

        function openModal($el) {
            $el.classList.add('is-active');
        }

        function closeModal($el) {
            $el.classList.remove('is-active');
        }

        function closeAllModals() {
            (document.querySelectorAll('.modal') || []).forEach(($modal) => {
                closeModal($modal);
            });
        }

        // Add a click event on buttons to open a specific modal
        (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
            const modal = $trigger.dataset.target;
            const $target = document.getElementById(modal);

            $trigger.addEventListener('click', () => {
                openModal($target);
            });
        });

        // Add a click event on various child elements to close the parent modal
        (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
            const $target = $close.closest('.modal');

            $close.addEventListener('click', () => {
                closeModal($target);
            });
        });

        // Add a keyboard event to close all modals
        document.addEventListener('keydown', (event) => {
            if (event.key === "Escape") {
                closeAllModals();
            }
        });
    }
});

//function to update movie details//

function updateMovieDetails(poster, movieTitle, overview, releaseDate, voteAverage, ) {
    
    //getting html for modal//
    const movieDetailsEl = document.getElementById('movieDetails');
    const titleEl = document.getElementById('title');
    const releaseDateEl = document.getElementById('releaseDate');
    const voteAverageEl = document.getElementById('voteAverage');
    const posterEl = document.getElementById('poster');

    //Needs Work: image apperance//

    posterEl.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${poster}" alt="${movieTitle}">`;
    
    //updating modal details//
    titleEl.innerHTML = `<h1>${movieTitle}</h1>`;
    movieDetailsEl.innerHTML = `<p>${overview}</p>`;
    releaseDateEl.innerHTML = `<p>Release Date: ${releaseDate}</p>`;
    voteAverageEl.innerHTML = `<p>Vote Average: ${voteAverage}</p>`;
}

// ////////////////////////////////////////////////////////////////////

//create click event to toggle between movie search and youtube search//

const youtubeButton = document.getElementById('btnYoutube');
const youtubeSearch = document.getElementById('youtubeSearch');

youtubeButton.addEventListener('click', function () {
    console.log("request to switch search function");
    movieButton.classList.remove('inactive');
    youtubeButton.classList.add('inactive');
    movieSearch.classList.remove('inactive');
    youtubeSearch.classList.add('inactive');

});

const movieButton = document.getElementById('btnMovie');
const movieSearch = document.getElementById('movieSearch');

movieButton.addEventListener('click', function () {
    console.log("request to switch search function");
    youtubeButton.classList.remove('inactive');
    movieButton.classList.add('inactive');
    youtubeSearch.classList.remove('inactive');
    movieSearch.classList.add('inactive');

});
