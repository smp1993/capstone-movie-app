// src/pages/DiscoverPage.jsx
import useSWR from "swr";
import { fetchPopularMovies } from "../api/tmdb.js";

const imageBaseUrl = "https://image.tmdb.org/t/p/w300";

const fetcher = () => fetchPopularMovies();

function DiscoverPage() {
  const { data: movies, error, isLoading } = useSWR("popular-movies", fetcher);

  if (isLoading) {
    return (
      <div>
        <h1>Discover Movies</h1>
        <p>Loading popular movies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>Discover Movies</h1>
        <p>Something went wrong while loading movies.</p>
        <p style={{ color: "red" }}>{error.message}</p>
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div>
        <h1>Discover Movies</h1>
        <p>No movies found.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Discover Movies</h1>
      <p>Popular movies from TMDB:</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "0.5rem",
              overflow: "hidden",
            }}
          >
            {movie.poster_path && (
              <img
                src={`${imageBaseUrl}${movie.poster_path}`}
                alt={movie.title}
                style={{
                  width: "100%",
                  display: "block",
                  borderRadius: "4px",
                }}
              />
            )}
            <h3 style={{ marginTop: "0.5rem", fontSize: "1rem" }}>
              {movie.title}
            </h3>
            <p style={{ fontSize: "0.85rem", color: "#555" }}>
              ⭐ {movie.vote_average?.toFixed(1)} | 📅{" "}
              {movie.release_date || "N/A"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DiscoverPage;