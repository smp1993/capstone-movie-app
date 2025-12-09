// src/pages/ProfilePage.jsx
import { useAppContext } from "../context/AppContext.jsx";

function ProfilePage() {
  const { state } = useAppContext();
  const { user, favorites } = state;

  if (!user) {
    return (
      <div>
        <h1>Your Profile</h1>
        <p>You need to log in with Google to see your profile.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Your Profile</h1>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "1rem",
        }}
      >
        {user.picture && (
          <img
            src={user.picture}
            alt={user.name}
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        )}
        <div>
          <h2 style={{ margin: 0 }}>{user.name}</h2>
          <p style={{ margin: 0, color: "#555" }}>{user.email}</p>
        </div>
      </div>

      <p>
        You currently have <strong>{favorites.length}</strong> favorite
        movie{favorites.length === 1 ? "" : "s"}.
      </p>
    </div>
  );
}

export default ProfilePage;