// src/App.jsx
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import DiscoverPage from "./pages/DiscoverPage.jsx";
import FavoritesPage from "./pages/FavoritesPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import { useAppContext } from "./context/AppContext.jsx";

function App() {
  const { state, login, logout } = useAppContext();

  const handleFakeLogin = () => {
    // فعلاً یک یوزر تستی؛ بعداً این رو با Google Auth عوض می‌کنیم
    login({
      id: "demo-user-id",
      name: "Demo User",
      email: "demo@example.com",
    });
  };

  const isLoggedIn = Boolean(state.user);

  return (
    <div>
      {/* Navigation bar */}
      <nav
        style={{
          padding: "1rem",
          borderBottom: "1px solid #ddd",
          marginBottom: "1rem",
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: "1rem" }}>
          <Link to="/">Home</Link>
          <Link to="/discover">Discover</Link>
          <Link to="/favorites">Favorites</Link>
          <Link to="/profile">Profile</Link>
        </div>

        <div>
          {isLoggedIn ? (
            <>
              <span style={{ marginRight: "0.75rem" }}>
                Hi, {state.user.name}
              </span>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <button onClick={handleFakeLogin}>Login</button>
          )}
        </div>
      </nav>

      {/* Routeها */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;