// src/pages/HomePage.jsx
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext.jsx";

function HomePage() {
  const { state } = useAppContext();
  const isLoggedIn = Boolean(state.user);

  return (
    <div
      style={{
        padding: "1.5rem",
        display: "grid",
        gap: "1.5rem",
      }}
    >
      {/* HERO SECTION */}
      <section
        style={{
          borderRadius: "18px",
          padding: "1.6rem 1.8rem",
          background:
            "radial-gradient(circle at top left, rgba(56,189,248,0.2), transparent 55%), radial-gradient(circle at bottom right, rgba(249,115,22,0.2), rgba(15,23,42,0.95) 60%)",
          border: "1px solid rgba(148,163,184,0.4)",
          boxShadow: "0 22px 50px rgba(15,23,42,0.9)",
        }}
      >
        {/* BANNER IMAGE */}
        <div
          style={{
            borderRadius: "16px",
            marginBottom: "1rem",
            backgroundColor: "#020617",
          }}
        >
          <img
            src="/hero-zootopia.jpg" // فایلی که در frontend/public گذاشتی
            alt="Movie characters banner"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
              display: "block",
              borderRadius: "16px",
            }}
          />
        </div>

        {/* SMALL BADGE */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.45rem",
            padding: "0.15rem 0.7rem",
            borderRadius: "999px",
            backgroundColor: "rgba(15,23,42,0.8)",
            border: "1px solid rgba(148,163,184,0.5)",
            fontSize: "0.75rem",
            marginBottom: "0.9rem",
          }}
        >
          <span
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "999px",
              background: "#22c55e",
              boxShadow: "0 0 12px rgba(34,197,94,0.9)",
            }}
          />
          <span>Capstone Movie App · React &amp; Express</span>
        </div>

        {/* TITLE & TEXT */}
        <h1
          style={{
            fontSize: "2rem",
            lineHeight: 1.25,
            marginBottom: "0.5rem",
          }}
        >
          Discover, track and save
          <br />
          your <span style={{ color: "#fb923c" }}>favorite movies</span>.
        </h1>

        <p
          style={{
            fontSize: "0.98rem",
            color: "#9ca3af",
            maxWidth: "32rem",
            marginBottom: "1.2rem",
          }}
        >
          Browse live data from TMDB, sign in with Google, and keep a personal
          list of the movies you love — all powered by a full-stack React +
          Express + MongoDB app.
        </p>

        {/* CTA BUTTONS */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem",
            alignItems: "center",
          }}
        >
          <Link to="/discover" style={{ textDecoration: "none" }}>
            <button
              style={{
                paddingInline: "1.3rem",
              }}
            >
              🎬 Start discovering
            </button>
          </Link>

          {isLoggedIn ? (
            <Link to="/favorites" style={{ textDecoration: "none" }}>
              <button
                style={{
                  background: "transparent",
                  color: "#e5e7eb",
                  borderColor: "rgba(148,163,184,0.6)",
                  boxShadow: "none",
                }}
              >
                ⭐ View my favorites
              </button>
            </Link>
          ) : (
            <p
              style={{
                fontSize: "0.85rem",
                color: "#9ca3af",
              }}
            >
              Tip: log in with Google from the top bar to start saving movies.
            </p>
          )}
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1rem",
        }}
      >
        <div
          style={{
            borderRadius: "14px",
            padding: "1rem",
            backgroundColor: "rgba(15,23,42,0.95)",
            border: "1px solid rgba(148,163,184,0.35)",
          }}
        >
          <h2
            style={{
              fontSize: "1rem",
              marginBottom: "0.35rem",
            }}
          >
            📡 Live data from TMDB
          </h2>
          <p style={{ fontSize: "0.9rem", color: "#9ca3af" }}>
            The Discover page pulls popular movies directly from the TMDB API,
            with proper loading and error handling states.
          </p>
        </div>

        <div
          style={{
            borderRadius: "14px",
            padding: "1rem",
            backgroundColor: "rgba(15,23,42,0.95)",
            border: "1px solid rgba(148,163,184,0.35)",
          }}
        >
          <h2
            style={{
              fontSize: "1rem",
              marginBottom: "0.35rem",
            }}
          >
            🔐 Google login &amp; personal favorites
          </h2>
          <p style={{ fontSize: "0.9rem", color: "#9ca3af" }}>
            Sign in with Google, and your favorites are linked to your account
            in MongoDB through a secure Express API.
          </p>
        </div>

        <div
          style={{
            borderRadius: "14px",
            padding: "1rem",
            backgroundColor: "rgba(15,23,42,0.95)",
            border: "1px solid rgba(148,163,184,0.35)",
          }}
        >
          <h2
            style={{
              fontSize: "1rem",
              marginBottom: "0.35rem",
            }}
          >
            🧪 Tested &amp; documented
          </h2>
          <p style={{ fontSize: "0.9rem", color: "#9ca3af" }}>
            The project includes a Dev Container, Playwright end-to-end tests,
            a design sequence diagram, and full deployment documentation.
          </p>
        </div>
      </section>
    </div>
  );
}

export default HomePage;