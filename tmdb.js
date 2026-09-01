const BACKEND_URL = "https://v-k-cinema-world-1.onrender.com";

async function loadTMDBMovies() {
    try {
        const response = await fetch(`${BACKEND_URL}/api/movies`);

        if (!response.ok) {
            throw new Error("Movies load नहीं हुईं");
        }

        const data = await response.json();

        console.log("TMDB Movies:", data);

        // Website में movie container खोजो
        const container =
            document.querySelector("#movies") ||
            document.querySelector(".movies-grid") ||
            document.querySelector(".movie-grid");

        if (!container || !data.results) {
            console.log("Movie container नहीं मिला");
            return;
        }

        // पुरानी movies हटाएँ
        container.innerHTML = "";

        data.results.forEach(movie => {
            const card = document.createElement("div");
            card.className = "movie-card";

            const poster = movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://via.placeholder.com/300x450?text=No+Poster";

            card.innerHTML = `
                <img
                    class="movie-poster"
                    src="${poster}"
                    alt="${movie.title || "Movie"}"
                >

                <div class="movie-info">
                    <h3>${movie.title || "Unknown Movie"}</h3>

                    <div class="meta">
                        ${movie.release_date || "N/A"}
                    </div>

                    <div class="rating">
                        ⭐ ${movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
                    </div>
                </div>
            `;

            container.appendChild(card);
        });

    } catch (error) {
        console.error("TMDB Error:", error);
    }
}

document.addEventListener("DOMContentLoaded", loadTMDBMovies);
