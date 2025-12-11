// frontend/src/api/tmdb.js
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

// حالا می‌تونه page رو هم بگیره (پیش‌فرض 1)
export async function fetchPopularMovies(page = 1) {
  const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch popular movies (page ${page})`);
  }

  const data = await res.json();
  return data.results || [];
}