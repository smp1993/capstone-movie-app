// frontend/src/api/backend.js
const BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:5050";

async function handleJsonResponse(res) {
  if (!res.ok) {
    let message = `Request failed with status ${res.status}`;
    try {
      const data = await res.json();
      if (data?.message) message = data.message;
    } catch (e) {
      // ignore json parse error
    }
    throw new Error(message);
  }
  return res.json();
}

/* ---------------- Favorites ---------------- */

export async function fetchFavorites(userId) {
  const res = await fetch(`${BASE_URL}/api/favorites?userId=${userId}`);
  return handleJsonResponse(res);
}

export async function createFavorite(payload) {
  const res = await fetch(`${BASE_URL}/api/favorites`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleJsonResponse(res);
}

export async function deleteFavorite(id) {
  const res = await fetch(`${BASE_URL}/api/favorites/${id}`, {
    method: "DELETE",
  });
  return handleJsonResponse(res);
}

// ✅ برای سازگاری با AppContext
export async function deleteFavoriteById(id) {
  return deleteFavorite(id);
}

// ✅ آپدیت favorite (مثلاً اگر بعداً بخوایم rating / note اضافه کنیم)
export async function updateFavoriteById(id, payload) {
  const res = await fetch(`${BASE_URL}/api/favorites/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleJsonResponse(res);
}

/* ---------------- Playlists ---------------- */

export async function fetchPlaylists(userId) {
  const res = await fetch(`${BASE_URL}/api/playlists?userId=${userId}`);
  return handleJsonResponse(res);
}

export async function createPlaylist(payload) {
  const res = await fetch(`${BASE_URL}/api/playlists`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleJsonResponse(res);
}

export async function updatePlaylist(id, payload) {
  const res = await fetch(`${BASE_URL}/api/playlists/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleJsonResponse(res);
}

export async function deletePlaylist(id) {
  const res = await fetch(`${BASE_URL}/api/playlists/${id}`, {
    method: "DELETE",
  });
  return handleJsonResponse(res);
}

/* ---------------- Reviews ---------------- */

export async function fetchReviews(userId) {
  const res = await fetch(`${BASE_URL}/api/reviews?userId=${userId}`);
  return handleJsonResponse(res);
}

export async function createReview(payload) {
  const res = await fetch(`${BASE_URL}/api/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleJsonResponse(res);
}

export async function updateReview(id, payload) {
  const res = await fetch(`${BASE_URL}/api/reviews/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleJsonResponse(res);
}

export async function deleteReview(id) {
  const res = await fetch(`${BASE_URL}/api/reviews/${id}`, {
    method: "DELETE",
  });
  return handleJsonResponse(res);
}