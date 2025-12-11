// src/pages/FavoritesPage.jsx
import { useAppContext } from "../context/AppContext.jsx";

const imageBaseUrl = "https://image.tmdb.org/t/p/w300";

function FavoritesPage() {
  const { state, removeFavorite } = useAppContext();
  const isLoggedIn = Boolean(state.user);
  const favorites = state.favorites || [];

  const handleRemove = async (fav) => {
    try {
      await removeFavorite(fav._id);
      // لازم نیست alert بزنیم، خود UI با حذف کارت مشخص میشه
      // alert(`"${fav.title}" removed from favorites.`);
    } catch (err) {
      alert(err.message || "Failed to remove favorite.");
    }
  };

  if (!isLoggedIn) {
    return (
      <div style={{ padding: "1.5rem" }}>
        <h1>My Favorites</h1>
        <p>Please log in to view your favorite movies.</p>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div style={{ padding: "1.5rem" }}>
        <h1>My Favorites</h1>
        <p>You haven't added any favorite movies yet.</p>
        <p style={{ marginTop: "0.5rem", fontSize: "0.9rem" }}>
          Go to the <strong>Discover</strong> page and click
          {" "}“Add to Favorites” on a movie you like.
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: "1.5rem" }}>
      <h1>My Favorites</h1>
      <p>Movies you’ve saved from the Discover page:</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "1.1rem",
          marginTop: "1rem",
        }}
      >
        {favorites.map((fav) => (
          <div
            key={fav._id}
            style={{
              border: "1px solid #334155",
              borderRadius: "10px",
              padding: "0.6rem",
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
            {fav.posterPath && (
              <img
                src={`${imageBaseUrl}${fav.posterPath}`}
                alt={fav.title}
                style={{
                  width: "100%",
                  display: "block",
                  borderRadius: "6px",
                  marginBottom: "0.5rem",
                  objectFit: "cover",
                  height: "260px",
                }}
              />
            )}

            <h3 style={{ fontSize: "1rem", marginBottom: "0.25rem" }}>
              {fav.title}
            </h3>

            <p
              style={{
                fontSize: "0.8rem",
                color: "#9ca3af",
                marginBottom: "0.5rem",
              }}
            >
              TMDB ID: {fav.tmdbId}
            </p>

            <button
              onClick={() => handleRemove(fav)}
              style={{
                width: "100%",
                backgroundColor: "#ef4444",
                boxShadow: "0 10px 25px rgba(239,68,68,0.4)",
              }}
            >
              Remove from Favorites
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavoritesPage;