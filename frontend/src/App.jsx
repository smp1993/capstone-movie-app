// src/App.jsx
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import DiscoverPage from "./pages/DiscoverPage.jsx";
import FavoritesPage from "./pages/FavoritesPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import { useAppContext } from "./context/AppContext.jsx";

// Google OAuth
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function App() {
  const { state, login, logout, loadFavoritesForUser } = useAppContext();

  const isLoggedIn = Boolean(state.user);

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      if (!credentialResponse.credential) {
        console.error("No credential from Google");
        return;
      }

      const decoded = jwtDecode(credentialResponse.credential);

      // این‌جا عکس گوگل رو هم ذخیره می‌کنیم
      const user = {
        id: decoded.sub,
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture, // 👈 خیلی مهم برای Profile
      };

      login(user);
      await loadFavoritesForUser(user.id);
    } catch (err) {
      console.error("Error decoding Google credential", err);
      alert("Google login failed. Please try again.");
    }
  };

  const handleGoogleError = () => {
    console.error("Google login error");
    alert("Google login failed.");
  };

  return (
    <div>
      {/* Navigation bar */}
      <nav
        style={{
          padding: "1rem 1.5rem",
          borderBottom: "1px solid #1f2937",
          marginBottom: "1rem",
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#020617",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <span
            style={{
              fontWeight: 700,
              fontSize: "1rem",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#e5e7eb",
            }}
          >
            Movie App
          </span>
          <span
            style={{
              width: "4px",
              height: "4px",
              borderRadius: "999px",
              backgroundColor: "#22c55e",
              boxShadow: "0 0 8px rgba(34,197,94,0.9)",
            }}
          />
        </div>

        <div style={{ display: "flex", gap: "1rem" }}>
          <Link to="/" style={{ textDecoration: "none", color: "#e5e7eb" }}>
            Home
          </Link>
          <Link
            to="/discover"
            style={{ textDecoration: "none", color: "#e5e7eb" }}
          >
            Discover
          </Link>
          <Link
            to="/favorites"
            style={{ textDecoration: "none", color: "#e5e7eb" }}
          >
            Favorites
          </Link>
          <Link
            to="/profile"
            style={{ textDecoration: "none", color: "#e5e7eb" }}
          >
            Profile
          </Link>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {isLoggedIn && (
            <span
              style={{
                fontSize: "0.9rem",
                color: "#e5e7eb",
              }}
            >
              Hi, {state.user.name}
            </span>
          )}

          {isLoggedIn ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              // استفاده از حالت استاندارد
              theme="outline"
              size="medium"
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