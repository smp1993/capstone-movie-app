// src/pages/ProfilePage.jsx
import { useAppContext } from "../context/AppContext.jsx";

function ProfilePage() {
  const { state } = useAppContext();
  const user = state.user;

  if (!user) {
    return (
      <div>
        <h1>Your Profile</h1>
        <p>You are not logged in.</p>
        <p>Please click the "Login" button in the top-right corner.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Your Profile</h1>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>User ID: {user.id}</p>
    </div>
  );
}

export default ProfilePage;