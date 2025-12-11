// src/pages/ProfilePage.jsx
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext.jsx";

function ProfilePage() {
  const { state } = useAppContext();
  const isLoggedIn = Boolean(state.user);
  const favoritesCount = state.favorites?.length || 0;

  if (!isLoggedIn) {
    return (
      <div style={{ padding: "1.5rem" }}>
        <h1>Profile</h1>
        <p style={{ marginTop: "0.5rem" }}>
          You’re currently browsing as a guest.
        </p>
        <p
          style={{
            fontSize: "0.9rem",
            color: "#9ca3af",
            marginTop: "0.2rem",
          }}
        >
          Use the Google login button in the top navigation bar to sign in and
          start saving your favorite movies.
        </p>
      </div>
    );
  }

  // فقط حروف اول اسم کاربر برای آواتار
  const initials = state.user.name
    ? state.user.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <div
      style={{
        padding: "1.5rem",
        display: "grid",
        gap: "1.5rem",
      }}
    >
      {/* MAIN PROFILE CARD */}
      <section
        style={{
          borderRadius: "18px",
          padding: "1.6rem 1.8rem",
          background:
            "radial-gradient(circle at top left, rgba(56,189,248,0.18), transparent 55%), radial-gradient(circle at bottom right, rgba(59,130,246,0.2), rgba(15,23,42,0.96) 60%)",
          border: "1px solid rgba(148,163,184,0.4)",
          boxShadow: "0 22px 50px rgba(15,23,42,0.9)",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)",
          gap: "1.5rem",
        }}
      >
        {/* LEFT SIDE: USER INFO */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              marginBottom: "1.1rem",
            }}
          >
            {/* AVATAR with initials only */}
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "999px",
                background:
                  "conic-gradient(from 180deg, #38bdf8, #fb923c, #a855f7, #38bdf8)",
                padding: "2px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 10px 30px rgba(15,23,42,0.8)",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "999px",
                  backgroundColor: "#020617",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: "1.3rem",
                  letterSpacing: "0.05em",
                }}
              >
                {initials}
              </div>
            </div>

            <div>
              <h1
                style={{
                  fontSize: "1.5rem",
                  marginBottom: "0.1rem",
                }}
              >
                {state.user.name}
              </h1>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "#9ca3af",
                }}
              >
                {state.user.email}
              </p>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "#a5b4fc",
                  marginTop: "0.35rem",
                }}
              >
                Logged in with Google · Capstone Movie App user
              </p>
            </div>
          </div>

          <p
            style={{
              fontSize: "0.95rem",
              color: "#e5e7eb",
              maxWidth: "34rem",
              marginBottom: "1.1rem",
            }}
          >
            This profile is backed by a full-stack React + Express +
            MongoDB setup. Your favorites are securely stored in the backend
            and loaded through a protected API.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.7rem",
            }}
          >
            <Link to="/discover" style={{ textDecoration: "none" }}>
              <button
                style={{
                  paddingInline: "1.1rem",
                }}
              >
                🎬 Discover more movies
              </button>
            </Link>

            <Link to="/favorites" style={{ textDecoration: "none" }}>
              <button
                style={{
                  background: "transparent",
                  color: "#e5e7eb",
                  borderColor: "rgba(148,163,184,0.6)",
                  boxShadow: "none",
                }}
              >
                ⭐ View favorites ({favoritesCount})
              </button>
            </Link>
          </div>
        </div>

        {/* RIGHT SIDE: STATS & STACK */}
        <div
          style={{
            borderRadius: "14px",
            padding: "1rem",
            backgroundColor: "rgba(15,23,42,0.96)",
            border: "1px solid rgba(148,163,184,0.35)",
            display: "grid",
            gap: "0.8rem",
            alignContent: "flex-start",
          }}
        >
          <h2
            style={{
              fontSize: "1rem",
              marginBottom: "0.2rem",
            }}
          >
            📊 Activity overview
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: "0.6rem",
              marginBottom: "0.5rem",
            }}
          >
            <div
              style={{
                borderRadius: "10px",
                padding: "0.7rem",
                backgroundColor: "rgba(30,64,175,0.45)",
              }}
            >
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "#c7d2fe",
                  marginBottom: "0.1rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                Favorites
              </p>
              <p
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 600,
                }}
              >
                {favoritesCount}
              </p>
            </div>

            <div
              style={{
                borderRadius: "10px",
                padding: "0.7rem",
                backgroundColor: "rgba(16,185,129,0.35)",
              }}
            >
              <p
                style={{
                  fontSize: "0.75rem",
                  color: "#bbf7d0",
                  marginBottom: "0.1rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                Status
              </p>
              <p
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 600,
                }}
              >
                Logged in
              </p>
            </div>
          </div>

          <h3
            style={{
              fontSize: "0.95rem",
              marginTop: "0.4rem",
              marginBottom: "0.2rem",
            }}
          >
            🛠 Tech stack used in your profile
          </h3>
          <ul
            style={{
              fontSize: "0.85rem",
              color: "#9ca3af",
              paddingLeft: "1.1rem",
              margin: 0,
            }}
          >
            <li>React Context + useReducer for global user state</li>
            <li>Google OAuth 2.0 for authentication</li>
            <li>Express API with MongoDB for favorites</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default ProfilePage;