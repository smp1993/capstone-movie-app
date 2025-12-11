// frontend/src/pages/ProfilePage.jsx
import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext.jsx";

const imageBaseUrl = "https://image.tmdb.org/t/p/w92";

function ProfilePage() {
  const {
    state,
    loadPlaylistsForUser,
    addPlaylist,
    removePlaylist,
    loadReviewsForUser,
    addReview,
    removeReview,
  } = useAppContext();

  const user = state.user;

  // state محلی برای فرم‌ها
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");

  const [reviewMovieTitle, setReviewMovieTitle] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    if (!user) return;
    // وقتی کاربر لاگین شد، playlist و reviewها رو لود کن
    loadPlaylistsForUser(user.id);
    loadReviewsForUser(user.id);
  }, [user, loadPlaylistsForUser, loadReviewsForUser]);

  if (!user) {
    return (
      <div className="page-container">
        <h1>Profile</h1>
        <p>Please sign in with Google to view your profile, playlists, and reviews.</p>
      </div>
    );
  }

  const initialLetter = user.name?.[0]?.toUpperCase() || "?";

  const handleCreatePlaylist = async (e) => {
    e.preventDefault();
    if (!playlistName.trim()) return;

    try {
      await addPlaylist({
        userId: user.id,
        name: playlistName.trim(),
        description: playlistDescription.trim(),
      });
      setPlaylistName("");
      setPlaylistDescription("");
    } catch (err) {
      alert(err.message || "Failed to create playlist.");
    }
  };

  const handleCreateReview = async (e) => {
    e.preventDefault();
    if (!reviewMovieTitle.trim()) return;

    try {
      await addReview({
        userId: user.id,
        movieTitle: reviewMovieTitle.trim(),
        rating: Number(reviewRating) || 5,
        text: reviewText.trim(),
      });
      setReviewMovieTitle("");
      setReviewRating(5);
      setReviewText("");
    } catch (err) {
      alert(err.message || "Failed to add review.");
    }
  };

  return (
    <div className="page-container" style={{ maxWidth: "900px", margin: "0 auto" }}>
      {/* کارت پروفایل */}
      <section
        style={{
          background: "radial-gradient(circle at top, #1d283a, #020617)",
          borderRadius: "16px",
          padding: "1.5rem",
          border: "1px solid #1f2937",
          display: "flex",
          gap: "1.25rem",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "999px",
            background:
              "conic-gradient(from 220deg, #22c55e, #a855f7, #0ea5e9, #22c55e)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 20px rgba(56,189,248,0.6)",
          }}
        >
          <div
            style={{
              width: "54px",
              height: "54px",
              borderRadius: "999px",
              backgroundColor: "#020617",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
              fontWeight: 700,
            }}
          >
            {initialLetter}
          </div>
        </div>

        <div>
          <h1 style={{ marginBottom: "0.25rem" }}>{user.name}</h1>
          <p
            style={{
              margin: 0,
              fontSize: "0.9rem",
              color: "#9ca3af",
            }}
          >
            {user.email}
          </p>
          <p
            style={{
              marginTop: "0.5rem",
              fontSize: "0.85rem",
              color: "#a5b4fc",
            }}
          >
            Your personal space for playlists and reviews.
          </p>
        </div>
      </section>

      {/* Playlists */}
      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ marginBottom: "0.75rem", fontSize: "1.4rem" }}>
          Your Playlists
        </h2>

        <form
          onSubmit={handleCreatePlaylist}
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 3fr auto",
            gap: "0.5rem",
            marginBottom: "1rem",
            alignItems: "center",
          }}
        >
          <input
            type="text"
            placeholder="Playlist name"
            value={playlistName}
            onChange={(e) => setPlaylistName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description (optional)"
            value={playlistDescription}
            onChange={(e) => setPlaylistDescription(e.target.value)}
          />
          <button type="submit">Create</button>
        </form>

        {state.playlists && state.playlists.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "1rem",
            }}
          >
            {state.playlists.map((pl) => (
              <div
                key={pl._id}
                style={{
                  background: "linear-gradient(135deg,#020617,#020617)",
                  borderRadius: "14px",
                  padding: "0.9rem 1rem",
                  border: "1px solid rgba(148,163,184,0.35)",
                  boxShadow: "0 10px 30px rgba(15,23,42,0.7)",
                }}
              >
                {/* header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "0.4rem",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: "1rem",
                        fontWeight: 600,
                        marginBottom: "0.1rem",
                      }}
                    >
                      {pl.name}
                    </h3>
                    {pl.description && (
                      <p
                        style={{
                          fontSize: "0.8rem",
                          color: "#9ca3af",
                        }}
                      >
                        {pl.description}
                      </p>
                    )}
                  </div>
                  <span
                    style={{
                      fontSize: "0.8rem",
                      padding: "0.15rem 0.6rem",
                      borderRadius: "999px",
                      background: "rgba(59,130,246,0.15)",
                      color: "#bfdbfe",
                    }}
                  >
                    {pl.movies?.length || 0}{" "}
                    {(pl.movies?.length || 0) === 1 ? "movie" : "movies"}
                  </span>
                </div>

                {/* movies strip */}
                {pl.movies && pl.movies.length > 0 ? (
                  <div
                    style={{
                      marginTop: "0.4rem",
                      display: "flex",
                      gap: "0.35rem",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    {pl.movies.slice(0, 4).map((m) => (
                      <div
                        key={m.tmdbId}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.3rem",
                          background: "rgba(15,23,42,0.9)",
                          borderRadius: "999px",
                          padding: "0.15rem 0.45rem",
                          border: "1px solid rgba(31,41,55,0.8)",
                        }}
                      >
                        {m.posterPath ? (
                          <img
                            src={`${imageBaseUrl}${m.posterPath}`}
                            alt={m.title}
                            style={{
                              width: "26px",
                              height: "38px",
                              borderRadius: "4px",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <span
                            style={{
                              width: "26px",
                              height: "26px",
                              borderRadius: "999px",
                              background:
                                "radial-gradient(circle at 30% 30%,#f97316,#a855f7)",
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "0.7rem",
                              color: "#f9fafb",
                            }}
                          >
                            {m.title?.[0] || "M"}
                          </span>
                        )}
                        <span
                          style={{
                            fontSize: "0.75rem",
                            color: "#e5e7eb",
                            maxWidth: "130px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {m.title}
                        </span>
                      </div>
                    ))}

                    {pl.movies.length > 4 && (
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: "#9ca3af",
                          marginLeft: "0.2rem",
                        }}
                      >
                        +{pl.movies.length - 4} more…
                      </span>
                    )}
                  </div>
                ) : (
                  <p
                    style={{
                      marginTop: "0.4rem",
                      fontSize: "0.8rem",
                      color: "#9ca3af",
                    }}
                  >
                    No movies yet in this playlist.
                  </p>
                )}

                <button
                  type="button"
                  onClick={() => removePlaylist(pl._id)}
                  style={{ width: "100%", marginTop: "0.6rem" }}
                >
                  Delete playlist
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ fontSize: "0.9rem", color: "#9ca3af" }}>
            You don’t have any playlists yet.
          </p>
        )}
      </section>

      {/* Reviews */}
      <section>
        <h2 style={{ marginBottom: "0.75rem" }}>Your Reviews</h2>

        <form
          onSubmit={handleCreateReview}
          style={{
            display: "grid",
            gridTemplateColumns: "2fr auto",
            gap: "0.5rem",
            marginBottom: "0.5rem",
          }}
        >
          <input
            type="text"
            placeholder="Movie title"
            value={reviewMovieTitle}
            onChange={(e) => setReviewMovieTitle(e.target.value)}
          />
          <select
            value={reviewRating}
            onChange={(e) => setReviewRating(e.target.value)}
          >
            <option value={5}>⭐ 5</option>
            <option value={4}>⭐ 4</option>
            <option value={3}>⭐ 3</option>
            <option value={2}>⭐ 2</option>
            <option value={1}>⭐ 1</option>
          </select>

          <textarea
            placeholder="Write your thoughts about this movie..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            style={{ gridColumn: "1 / -1", minHeight: "80px" }}
          />

          <button type="submit" style={{ gridColumn: "1 / -1" }}>
            Add review
          </button>
        </form>

        {state.reviews.length === 0 ? (
          <p style={{ fontSize: "0.9rem", color: "#9ca3af" }}>
            You haven’t written any reviews yet.
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "0.75rem",
              marginTop: "0.5rem",
            }}
          >
            {state.reviews.map((rev) => (
              <div
                key={rev._id}
                style={{
                  borderRadius: "10px",
                  border: "1px solid #1f2937",
                  padding: "0.75rem",
                  backgroundColor: "#020617",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "0.25rem",
                  }}
                >
                  <h3 style={{ margin: 0 }}>{rev.movieTitle}</h3>
                  <span style={{ fontSize: "0.9rem", color: "#fbbf24" }}>
                    ⭐ {rev.rating ?? 5}
                  </span>
                </div>
                {rev.text && (
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "#e5e7eb",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {rev.text}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => removeReview(rev._id)}
                  style={{ width: "100%" }}
                >
                  Delete review
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default ProfilePage;