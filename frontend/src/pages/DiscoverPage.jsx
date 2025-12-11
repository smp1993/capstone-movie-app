// src/pages/DiscoverPage.jsx
import useSWR from "swr";
import { fetchPopularMovies } from "../api/tmdb.js";
import { useAppContext } from "../context/AppContext.jsx";

const imageBaseUrl = "https://image.tmdb.org/t/p/w300";
const fetcher = () => fetchPopularMovies();

function DiscoverPage() {
  const { data: movies, error, isLoading } = useSWR("popular-movies", fetcher);
  const { state, addFavorite } = useAppContext();
  const isLoggedIn = Boolean(state.user);

  const handleAddFavorite = async (movie) => {
    if (!state.user) {
      alert("Please log in first to save favorites.");
      return;
    }

    // اگر همین الان توی favorites هست، دیگه کاری نکن
    const alreadyFav = state.favorites?.some(
      (fav) => fav.tmdbId === movie.id
    );
    if (alreadyFav) return;

    try {
      await addFavorite({
        userId: state.user.id,
        tmdbId: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
      });
      // نیاز نیست alert بزنیم؛ خود دکمه و UI عوض می‌شه
      // alert(`"${movie.title}" added to favorites!`);
    } catch (err) {
      alert(err.message || "Failed to add favorite.");
    }
  };

  if (isLoading) {
    return (
      <div style={{ padding: "1.5rem" }}>
        <h1>Discover Movies</h1>
        <p>Loading popular movies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "1.5rem" }}>
        <h1>Discover Movies</h1>
        <p>Something went wrong while loading movies.</p>
        <p style={{ color: "salmon" }}>{error.message}</p>
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div style={{ padding: "1.5rem" }}>
        <h1>Discover Movies</h1>
        <p>No movies found.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "1.5rem" }}>
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
        {movies.map((movie) => {
          const isFavorite = state.favorites?.some(
            (fav) => fav.tmdbId === movie.id
          );

          return (
            <div
              key={movie.id}
              style={{
                border: "1px solid #334155",
                borderRadius: "10px",
                padding: "0.5rem",
                overflow: "hidden",
                background: "#020617",
                boxShadow: "0 12px 30px rgba(15,23,42,0.8)",
                transform: "translateY(0)",
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow =
                  "0 18px 40px rgba(15,23,42,0.95)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 12px 30px rgba(15,23,42,0.8)";
              }}
            >
              {movie.poster_path && (
                <img
                  src={`${imageBaseUrl}${movie.poster_path}`}
                  alt={movie.title}
                  style={{
                    width: "100%",
                    display: "block",
                    borderRadius: "6px",
                    marginBottom: "0.5rem",
                  }}
                />
              )}
              <h3 style={{ marginTop: "0.2rem", fontSize: "1rem" }}>
                {movie.title}
              </h3>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "#9ca3af",
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "0.25rem",
                }}
              >
                <span>📅 {movie.release_date || "N/A"}</span>
                <span
                  style={{
                    fontSize: "0.8rem",
                    background: "rgba(249,115,22,0.15)",
                    padding: "0.1rem 0.5rem",
                    borderRadius: "999px",
                    color: "#fed7aa",
                  }}
                >
                  ⭐ {movie.vote_average?.toFixed(1) ?? "–"}
                </span>
              </p>

              {isLoggedIn && (
                <button
                  onClick={() => handleAddFavorite(movie)}
                  disabled={isFavorite}
                  style={{
                    marginTop: "0.55rem",
                    width: "100%",
                    opacity: isFavorite ? 0.7 : 1,
                    cursor: isFavorite ? "default" : "pointer",
                  }}
                >
                  {isFavorite ? "Added to Favorites" : "Add to Favorites"}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DiscoverPage;