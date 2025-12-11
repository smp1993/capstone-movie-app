// src/pages/HomePage.jsx
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext.jsx";

const slides = [
  {
    id: 1,
    src: "/hero-zootopia.jpg",
    alt: "Zootopia hero image",
  },
  {
    id: 2,
    src: "/hero-jurassic-world.jpg",
    alt: "Jurassic World hero image",
  },
  {
    id: 3,
    src: "/hero-stranger-things.jpg",
    alt: "Stranger Things hero image",
  },
];

function HomePage() {
  const { state } = useAppContext();
  const isLoggedIn = Boolean(state.user);
  const [currentIndex, setCurrentIndex] = useState(0);

  // اسلایدر اتوماتیک با ترنزیشن جذاب‌تر (fade + move + scale)
  useEffect(() => {
    if (slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000); // هر ۶ ثانیه اسلاید عوض می‌شود

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page-container">
      {/* HERO SLIDER */}
      <section
        style={{
          marginBottom: "2rem",
        }}
      >
        <div
          style={{
            position: "relative",
            borderRadius: "24px",
            overflow: "hidden",
            height: "520px", // 👈 ارتفاع بیشتر
            backgroundColor: "#020617",
            boxShadow: "0 24px 60px rgba(15,23,42,0.95)",
          }}
        >
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              style={{
                position: "absolute",
                inset: 0,
                opacity: index === currentIndex ? 1 : 0,
                transform:
                  index === currentIndex
                    ? "scale(1) translateY(0)"
                    : "scale(1.05) translateY(10px)",
                transition:
                  "opacity 0.9s ease-in-out, transform 0.9s ease-in-out",
                pointerEvents: index === currentIndex ? "auto" : "none",
              }}
            >
              {/* تصویر پس‌زمینه */}
              <img
                src={slide.src}
                alt={slide.alt}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "brightness(0.75)",
                }}
              />

              {/* گرادیان نرم برای خواناتر شدن دکمه‌ها */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(90deg, rgba(15,23,42,0.75), rgba(15,23,42,0.15), rgba(15,23,42,0.85))",
                }}
              />
            </div>
          ))}

          {/* دکمه‌ها روی اسلاید – یکی وسط چپ، یکی وسط راست + شعار وسط */}
          <div
            style={{
              position: "absolute",
              left: "2rem",
              right: "2rem",
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              pointerEvents: "none", // خود دکمه‌ها pointerEvents: auto دارند
              gap: "1rem",
            }}
          >
            <Link
              to="/discover"
              style={{ textDecoration: "none", pointerEvents: "auto" }}
            >
              <button
                style={{
                  paddingInline: "1.4rem",
                }}
              >
                🎬 Start discovering
              </button>
            </Link>

            {/* شعار وسط بین دو دکمه */}
            <div
              style={{
                pointerEvents: "none",
                textAlign: "center",
                flex: "0 1 40%",
              }}
            >
              <p
                style={{
                  fontSize: "1.3rem", // 👈 شعار بزرگ‌تر
                  fontWeight: 600,
                  color: "#e5e7eb",
                  textShadow: "0 2px 8px rgba(0,0,0,0.7)",
                  margin: 0,
                  lineHeight: 1.3,
                }}
              >
                Track the movies you love, all in one place.
              </p>
            </div>

            <Link
              to="/favorites"
              style={{ textDecoration: "none", pointerEvents: "auto" }}
            >
              <button
                style={{
                  background: "transparent",
                  color: "#e5e7eb",
                  borderColor: "rgba(148,163,184,0.8)",
                  boxShadow: "none",
                }}
              >
                ⭐ View favorites
                {isLoggedIn && state.favorites?.length
                  ? ` (${state.favorites.length})`
                  : ""}
              </button>
            </Link>
          </div>

          {/* دایره‌های اسلایدر – پایین وسط */}
          <div
            style={{
              position: "absolute",
              bottom: "1.1rem",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: "0.4rem",
            }}
          >
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => setCurrentIndex(index)}
                style={{
                  width: index === currentIndex ? "12px" : "8px",
                  height: "8px",
                  borderRadius: "999px",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  backgroundColor:
                    index === currentIndex
                      ? "rgba(248,250,252,0.98)"
                      : "rgba(148,163,184,0.8)",
                  opacity: index === currentIndex ? 1 : 0.8,
                  transition: "all 0.2s ease-out",
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* بخش پایینی: توضیح کوتاه درباره اپ */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1.2rem",
        }}
      >
        <div
          style={{
            borderRadius: "16px",
            padding: "1rem",
            border: "1px solid rgba(148,163,184,0.4)",
            background:
              "radial-gradient(circle at top left, rgba(59,130,246,0.18), rgba(15,23,42,0.96))",
          }}
        >
          <h2
            style={{
              fontSize: "1rem",
              marginBottom: "0.35rem",
            }}
          >
            🔗 Full-stack integration
          </h2>
          <p
            style={{
              fontSize: "0.9rem",
              color: "#e5e7eb",
            }}
          >
            React frontend, Express backend and MongoDB database work together
            to store and load your favorites.
          </p>
        </div>

        <div
          style={{
            borderRadius: "16px",
            padding: "1rem",
            border: "1px solid rgba(148,163,184,0.4)",
            background:
              "radial-gradient(circle at top right, rgba(34,197,94,0.14), rgba(15,23,42,0.96))",
          }}
        >
          <h2
            style={{
              fontSize: "1rem",
              marginBottom: "0.35rem",
            }}
          >
            🧠 Smart frontend
          </h2>
          <p
            style={{
              fontSize: "0.9rem",
              color: "#e5e7eb",
            }}
          >
            Google OAuth, global state with Context + useReducer, and SWR
            for fetching TMDB data.
          </p>
        </div>

        <div
          style={{
            borderRadius: "16px",
            padding: "1rem",
            border: "1px solid rgba(148,163,184,0.4)",
            background:
              "radial-gradient(circle at bottom, rgba(251,146,60,0.18), rgba(15,23,42,0.96))",
          }}
        >
          <h2
            style={{
              fontSize: "1rem",
              marginBottom: "0.35rem",
            }}
          >
            🧪 Tested & deployed
          </h2>
          <p
            style={{
              fontSize: "0.9rem",
              color: "#e5e7eb",
            }}
          >
            End-to-end tests with Playwright, backend on Render, frontend on
            Netlify, and documented Dev Container.
          </p>
        </div>
      </section>
    </div>
  );
}

export default HomePage;