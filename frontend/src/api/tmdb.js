// src/api/tmdb.js
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

if (!API_KEY) {
  console.warn("⚠️ TMDB API key is missing. Set VITE_TMDB_API_KEY in .env");
}

export async function fetchPopularMovies() {
  const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`TMDB API error: ${res.status}`);
  }

  const data = await res.json();
  return data.results; // آرایه فیلم‌ها
}