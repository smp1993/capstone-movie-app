// src/App.jsx
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import DiscoverPage from "./pages/DiscoverPage.jsx";
import FavoritesPage from "./pages/FavoritesPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import { useAppContext } from "./context/AppContext.jsx";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function App() {
  const { state, login, logout, loadFavoritesForUser } = useAppContext();

  const isLoggedIn = Boolean(state.user);

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
      if (!credential) {
        console.error("No credential returned from Google");
        return;
      }

      const decoded = jwtDecode(credential);
      // decoded معمولاً شامل sub, name, email, picture و ... است
      const user = {
        id: decoded.sub,
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
      };

      login(user);
      await loadFavoritesForUser(user.id);
    } catch (error) {
      console.error("Error decoding Google credential:", error);
    }
  };

  const handleGoogleError = () => {
    console.error("Google Login failed");
    alert("Google login failed. Please try again.");
  };

  return (
    <div className="page">
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
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
            />
          )}
        </div>
      </nav>

      {/* Routes */}
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