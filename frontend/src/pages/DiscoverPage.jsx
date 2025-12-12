// src/pages/DiscoverPage.jsx
import { useState } from "react";
import useSWR from "swr";
import { fetchPopularMovies } from "../api/tmdb.js";
import { useAppContext } from "../context/AppContext.jsx";
import {
  fetchPlaylists,
  createPlaylist,
  updatePlaylist,
} from "../api/backend.js";

const imageBaseUrl = "https://image.tmdb.org/t/p/w300";

// صفحه‌ی اول رو با SWR می‌گیریم
const fetcher = () => fetchPopularMovies(1);

function DiscoverPage() {
  const { data: firstPageMovies, error, isLoading } = useSWR(
    "popular-movies-page-1",
    fetcher
  );
  const { state, addFavorite } = useAppContext();
  const isLoggedIn = Boolean(state.user);

  // ✅ pagination
  const [page, setPage] = useState(1);
  const [extraMovies, setExtraMovies] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // ✅ search
  const [searchQuery, setSearchQuery] = useState("");

  // همه‌ی فیلم‌ها: صفحه ۱ + صفحه‌های بعد
  const movies = [...(firstPageMovies || []), ...extraMovies];

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const visibleMovies = normalizedQuery
    ? movies.filter((m) => m.title?.toLowerCase().includes(normalizedQuery))
    : movies;

  // اضافه کردن فیلم به Favorites
  const handleAddFavorite = async (movie) => {
    if (!state.user) {
      alert("Please log in first to save favorites.");
      return;
    }

    // اگر همین حالا توی state.favorites هست، اصلاً درخواست هم نزن
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
    } catch (err) {
      // اگر بک‌اند بگه این فیلم از قبل توی favorites هست، فقط ساکت رد شو
      if (err.message === "Movie already exists in favorites") {
        console.warn("Duplicate favorite ignored");
        return;
      }

      // بقیه خطاها واقعی هستن و باید به کاربر گفته بشن
      alert(err.message || "Failed to add favorite.");
    }
  };

  // ⭐ اضافه کردن فیلم به Playlist
  const handleAddToPlaylist = async (movie) => {
    if (!state.user) {
      alert("Please log in first to use playlists.");
      return;
    }

    const rawName = window.prompt(
      'Enter a playlist name (existing name to append, or a new name to create):'
    );
    if (!rawName) return;

    const name = rawName.trim();
    if (!name) return;

    try {
      // پلی‌لیست‌های فعلی کاربر را از سرور می‌گیریم
      const playlists = await fetchPlaylists(state.user.id);

      const normalized = name.toLowerCase();
      let target = playlists.find(
        (pl) => pl.name.trim().toLowerCase() === normalized
      );

      const movieEntry = {
        tmdbId: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
      };

      if (!target) {
        // اگر پلی‌لیست وجود ندارد → یکی بساز، بعد فیلم را اضافه کن
        const created = await createPlaylist({
          userId: state.user.id,
          name,
          description: "",
        });

        const updated = await updatePlaylist(created._id, {
          ...created,
          movies: [...(created.movies || []), movieEntry],
        });

        alert(`"${movie.title}" added to new playlist "${updated.name}".`);
      } else {
        // پلی‌لیست با این اسم از قبل هست → فیلم را به همان اضافه کن
        const existingMovies = target.movies || [];
        const alreadyIn = existingMovies.some(
          (m) => m.tmdbId === movie.id
        );
        if (alreadyIn) {
          alert(`"${movie.title}" is already in playlist "${target.name}".`);
          return;
        }

        const updated = await updatePlaylist(target._id, {
          ...target,
          movies: [...existingMovies, movieEntry],
        });

        alert(`"${movie.title}" added to playlist "${updated.name}".`);
      }
    } catch (err) {
      console.error("Error adding movie to playlist", err);
      alert(err.message || "Failed to add to playlist.");
    }
  };

  // ✅ load more برای صفحه‌های بعدی
  const handleLoadMore = async () => {
    if (isLoadingMore || !hasMore) return;

    try {
      setIsLoadingMore(true);
      const nextPage = page + 1;

      const newMovies = await fetchPopularMovies(nextPage);

      if (!newMovies || newMovies.length === 0) {
        setHasMore(false);
      } else {
        setExtraMovies((prev) => [...prev, ...newMovies]);
        setPage(nextPage);
      }
    } catch (err) {
      console.error("Failed to load more movies:", err);
      alert("Failed to load more movies.");
    } finally {
      setIsLoadingMore(false);
    }
  };

  // حالت loading صفحه اول
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
      <p>Popular movies from TMDB (page {page}).</p>

      {/* 🔍 نوار سرچ */}
      <div
        style={{
          marginTop: "1rem",
          marginBottom: "1.5rem",
          maxWidth: "400px",
        }}
      >
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "0.5rem 0.75rem",
            borderRadius: "999px",
            border: "1px solid #4b5563",
            backgroundColor: "#020617",
            color: "#e5e7eb",
            fontSize: "0.9rem",
          }}
        />
      </div>

      {/* اگر سرچ چیزی برنگردونه */}
      {visibleMovies.length === 0 ? (
        <p style={{ fontSize: "0.9rem", color: "#9ca3af" }}>
          No movies match your search.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          {visibleMovies.map((movie) => {
            const isFavorite = state.favorites?.some(
              (fav) => fav.tmdbId === movie.id
            );

            return (
              <div
                key={movie.id}
                data-testid="movie-card" // 👈 برای تست
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
                  <div
                    style={{
                      marginTop: "0.55rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.4rem",
                    }}
                  >
                    {/* دکمه Favorites */}
                    <button
                      onClick={() => handleAddFavorite(movie)}
                      disabled={isFavorite}
                      style={{
                        width: "100%",
                        padding: "0.4rem 0.6rem",
                        borderRadius: "999px",
                        border: "none",
                        fontSize: "0.9rem",
                        fontWeight: 500,
                        backgroundColor: isFavorite ? "#16a34a" : "#22c55e",
                        color: "#f9fafb",
                        boxShadow: isFavorite
                          ? "0 0 0 1px rgba(22,163,74,0.6)"
                          : "0 0 0 1px rgba(34,197,94,0.5)",
                        cursor: isFavorite ? "default" : "pointer",
                        opacity: isFavorite ? 0.9 : 1,
                        transition:
                          "background-color 0.15s ease, transform 0.1s ease",
                      }}
                    >
                      {isFavorite ? "Added to Favorites" : "Add to Favorites"}
                    </button>

                    {/* دکمه Playlist */}
                    <button
                      onClick={() => handleAddToPlaylist(movie)}
                      style={{
                        width: "100%",
                        padding: "0.35rem 0.6rem",
                        borderRadius: "999px",
                        border: "1px solid rgba(148,163,184,0.7)",
                        fontSize: "0.85rem",
                        backgroundColor: "transparent",
                        color: "#e5e7eb",
                        cursor: "pointer",
                        transition:
                          "background-color 0.15s ease, border-color 0.15s ease",
                      }}
                    >
                      Add to Playlist
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* دکمه Load more برای صفحه‌بندی */}
      <div
        style={{
          marginTop: "1.5rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {hasMore ? (
          <button onClick={handleLoadMore} disabled={isLoadingMore}>
            {isLoadingMore ? "Loading..." : "Load more movies"}
          </button>
        ) : (
          <p style={{ fontSize: "0.9rem", color: "#9ca3af" }}>
            No more movies to load.
          </p>
        )}
      </div>
    </div>
  );
}

export default DiscoverPage;