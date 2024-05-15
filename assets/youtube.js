document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'AIzaSyDVmZSn2EE-5gI5GNXgfQo_342cCfeRKTc';
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    const resultsContainer = document.getElementById('results');

    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            searchYouTube(query);
        }
    });

    async function searchYouTube(query) {
        try {
            const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=10&key=${apiKey}`);
            const data = await response.json();
            displayResults(data.items);
        } catch (error) {
            console.error('Error fetching YouTube data:', error);
        }
    }

    function displayResults(videos) {
        resultsContainer.innerHTML = '';
        if (videos.length > 0) {
            videos.forEach(video => {
                const videoElement = document.createElement('div');
                videoElement.className = 'video';
                videoElement.innerHTML = `
                    <article class="media">
                        <figure class="media-left">
                            <p class="image is-128x128">
                                <img src="${video.snippet.thumbnails.default.url}" alt="${video.snippet.title}">
                            </p>
                        </figure>
                        <div class="media-content">
                            <div class="content">
                                <p>
                                    <strong>${video.snippet.title}</strong>
                                    <br>
                                    ${video.snippet.description}
                                    <br>
                                    <a href="https://www.youtube.com/watch?v=${video.id.videoId}" target="_blank" class="button is-link">Watch</a>
                                </p>
                            </div>
                        </div>
                    </article>
                `;
                resultsContainer.appendChild(videoElement);
            });
        } else {
            resultsContainer.innerHTML = '<p>No results found.</p>';
        }
    }
});
