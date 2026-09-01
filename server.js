const express = require("express");

const app = express();

app.use(express.json());

app.get("/api/movies", async (req, res) => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=hi-IN&page=1`
        );

        if (!response.ok) {
            return res.status(response.status).json({
                error: "TMDB से movies नहीं मिलीं"
            });
        }

        const data = await response.json();

        res.json(data);

    } catch (error) {
        res.status(500).json({
            error: "Server error"
        });
    }
});

app.get("/", (req, res) => {
    res.send("V K Cinema World Backend चालू है ✅");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
