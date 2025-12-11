// frontend/src/context/AppContext.jsx
import { createContext, useContext, useReducer } from "react";

import {
  fetchFavorites,
  createFavorite,
  deleteFavoriteById,
  updateFavoriteById,
  fetchPlaylists,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
  fetchReviews,
  createReview,
  updateReview,
  deleteReview,
} from "../api/backend.js";

const AppContext = createContext();

const initialState = {
  user: null,
  favorites: [],
  playlists: [],
  reviews: [],
};

function appReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        favorites: [],
        playlists: [],
        reviews: [],
      };

    // ---------- Favorites ----------
    case "SET_FAVORITES":
      return {
        ...state,
        favorites: action.payload,
      };
    case "ADD_FAVORITE":
      return {
        ...state,
        favorites: [action.payload, ...state.favorites],
      };
    case "UPDATE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.map((fav) =>
          fav._id === action.payload._id ? action.payload : fav
        ),
      };
    case "REMOVE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.filter((fav) => fav._id !== action.payload),
      };

    // ---------- Playlists ----------
    case "SET_PLAYLISTS":
      return {
        ...state,
        playlists: action.payload,
      };
    case "ADD_PLAYLIST":
      return {
        ...state,
        playlists: [action.payload, ...state.playlists],
      };
    case "UPDATE_PLAYLIST":
      return {
        ...state,
        playlists: state.playlists.map((pl) =>
          pl._id === action.payload._id ? action.payload : pl
        ),
      };
    case "REMOVE_PLAYLIST":
      return {
        ...state,
        playlists: state.playlists.filter(
          (pl) => pl._id !== action.payload
        ),
      };

    // ---------- Reviews ----------
    case "SET_REVIEWS":
      return {
        ...state,
        reviews: action.payload,
      };
    case "ADD_REVIEW":
      return {
        ...state,
        reviews: [action.payload, ...state.reviews],
      };
    case "UPDATE_REVIEW":
      return {
        ...state,
        reviews: state.reviews.map((rev) =>
          rev._id === action.payload._id ? action.payload : rev
        ),
      };
    case "REMOVE_REVIEW":
      return {
        ...state,
        reviews: state.reviews.filter((rev) => rev._id !== action.payload),
      };

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // -------- Auth --------
  const login = (user) => {
    dispatch({ type: "LOGIN", payload: user });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  // -------- Favorites (CRUD) --------
  const loadFavoritesForUser = async (userId) => {
    if (!userId) return;
    const data = await fetchFavorites(userId);
    dispatch({ type: "SET_FAVORITES", payload: data });
  };

  const addFavorite = async (payload) => {
    const saved = await createFavorite(payload);
    dispatch({ type: "ADD_FAVORITE", payload: saved });
    return saved;
  };

  const updateFavorite = async (id, payload) => {
    const updated = await updateFavoriteById(id, payload);
    dispatch({ type: "UPDATE_FAVORITE", payload: updated });
    return updated;
  };

  const removeFavorite = async (id) => {
    await deleteFavoriteById(id);
    dispatch({ type: "REMOVE_FAVORITE", payload: id });
  };

  // -------- Playlists (CRUD) --------
  const loadPlaylistsForUser = async (userId) => {
    if (!userId) return;
    const data = await fetchPlaylists(userId);
    dispatch({ type: "SET_PLAYLISTS", payload: data });
  };

  const addPlaylist = async (payload) => {
    const saved = await createPlaylist(payload);
    dispatch({ type: "ADD_PLAYLIST", payload: saved });
    return saved;
  };

  const editPlaylist = async (id, payload) => {
    const updated = await updatePlaylist(id, payload);
    dispatch({ type: "UPDATE_PLAYLIST", payload: updated });
    return updated;
  };

  const removePlaylist = async (id) => {
    await deletePlaylist(id);
    dispatch({ type: "REMOVE_PLAYLIST", payload: id });
  };

  // -------- Reviews (CRUD) --------
  const loadReviewsForUser = async (userId) => {
    if (!userId) return;
    const data = await fetchReviews(userId);
    dispatch({ type: "SET_REVIEWS", payload: data });
  };

  const addReview = async (payload) => {
    const saved = await createReview(payload);
    dispatch({ type: "ADD_REVIEW", payload: saved });
    return saved;
  };

  const editReview = async (id, payload) => {
    const updated = await updateReview(id, payload);
    dispatch({ type: "UPDATE_REVIEW", payload: updated });
    return updated;
  };

  const removeReview = async (id) => {
    await deleteReview(id);
    dispatch({ type: "REMOVE_REVIEW", payload: id });
  };

  return (
    <AppContext.Provider
      value={{
        state,
        // auth
        login,
        logout,
        // favorites
        loadFavoritesForUser,
        addFavorite,
        updateFavorite,
        removeFavorite,
        // playlists
        loadPlaylistsForUser,
        addPlaylist,
        editPlaylist,
        removePlaylist,
        // reviews
        loadReviewsForUser,
        addReview,
        editReview,
        removeReview,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return ctx;
}