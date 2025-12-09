// src/pages/FavoritesPage.jsx
import { useAppContext } from "../context/AppContext.jsx";

function FavoritesPage() {
  const { state, removeFavorite } = useAppContext();
  const { user, favorites } = state;

  if (!user) {
    return (
      <div>
        <h1>Your Favorite Movies</h1>
        <p>You need to log in to see your favorites.</p>
      </div>
    );
  }

  if (!favorites || favorites.length === 0) {
    return (
      <div>
        <h1>Your Favorite Movies</h1>
        <p>You don't have any favorites yet.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Your Favorite Movies</h1>
      <ul>
        {favorites.map((fav) => (
          <li key={fav._id}>
            {fav.title}
            <button
              style={{ marginLeft: "0.5rem" }}
              onClick={() => removeFavorite(fav._id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FavoritesPage;