// src/api/backend.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function handleResponse(res) {
  if (!res.ok) {
    let message = `Request failed with status ${res.status}`;
    try {
      const data = await res.json();
      if (data?.message) {
        message = data.message;
      }
    } catch {
      // ignore JSON parse error
    }
    throw new Error(message);
  }
  return res.json();
}

// گرفتن لیست علاقه‌مندی‌ها برای یک userId
export async function fetchFavorites(userId) {
  const res = await fetch(`${API_BASE_URL}/api/favorites/${userId}`);
  return handleResponse(res);
}

// اضافه کردن یک favorite جدید
export async function createFavorite(payload) {
  const res = await fetch(`${API_BASE_URL}/api/favorites`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

// آپدیت یک favorite (مثلاً note یا rating)
export async function updateFavoriteById(id, payload) {
  const res = await fetch(`${API_BASE_URL}/api/favorites/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleResponse(res);
}

// حذف یک favorite
export async function deleteFavoriteById(id) {
  const res = await fetch(`${API_BASE_URL}/api/favorites/${id}`, {
    method: "DELETE",
  });
  return handleResponse(res);
}