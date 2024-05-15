document.addEventListener('DOMContentLoaded', async () => {
    const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTBjZTliMmFhNzYxYjgxNTgyY2E2ZTlhNzY4ZDBiZSIsInN1YiI6IjY2Mzk3ZmI2Y2MyNzdjMDEyNjI0NWM2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.i3fAdE6-Y7b6gS-0ReKtVykROYIR7bt_QYLBaNcnrw4';
    const apiBaseUrl = 'https://api.themoviedb.org/3';

    async function fetchTopHorrorThriller(type) {
        const url = `${apiBaseUrl}/trending/${type}/week`;
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json;charset=utf-8'
            }
        });
        const data = await response.json();
        return data.results.filter(item => item.genre_ids.includes(27) || item.genre_ids.includes(53)).slice(0, 5);
    }

    function displayItems(items, containerId) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';
        items.forEach(item => {
            const listItem = document.createElement('li');
            listItem.className = 'item';
            listItem.textContent = item.title || item.name;
            container.appendChild(listItem);
        });
    }

    try {
        const [topHorrorThrillerMovies, topHorrorThrillerTvShows] = await Promise.all([
            fetchTopHorrorThriller('movie'),
            fetchTopHorrorThriller('tv')
        ]);

        displayItems(topHorrorThrillerMovies, 'movies');
        // displayItems(topHorrorThrillerTvShows, 'tv-shows');
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});
