// src/context/AppContext.jsx
import {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from "react";
import {
  fetchFavorites,
  createFavorite,
  updateFavoriteById,
  deleteFavoriteById,
} from "../api/backend.js";

const AppContext = createContext();

const initialState = {
  user: null, // later will come from Google Auth
  favorites: [],
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
      };
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
        favorites: state.favorites.filter(
          (fav) => fav._id !== action.payload
        ),
      };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const login = (user) => {
    dispatch({ type: "LOGIN", payload: user });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  // load favorites from backend for given userId
  const loadFavoritesForUser = useCallback(async (userId) => {
    try {
      const favorites = await fetchFavorites(userId);
      dispatch({ type: "SET_FAVORITES", payload: favorites });
    } catch (error) {
      console.error("Error loading favorites:", error);
    }
  }, []);

  const addFavorite = async ({ userId, tmdbId, title, posterPath }) => {
    try {
      const favorite = await createFavorite({
        userId,
        tmdbId,
        title,
        posterPath,
      });
      dispatch({ type: "ADD_FAVORITE", payload: favorite });
    } catch (error) {
      console.error("Error adding favorite:", error);
      throw error;
    }
  };

  const updateFavorite = async (id, { note, rating }) => {
    try {
      const favorite = await updateFavoriteById(id, { note, rating });
      dispatch({ type: "UPDATE_FAVORITE", payload: favorite });
    } catch (error) {
      console.error("Error updating favorite:", error);
    }
  };

  const removeFavorite = async (id) => {
    try {
      await deleteFavoriteById(id);
      dispatch({ type: "REMOVE_FAVORITE", payload: id });
    } catch (error) {
      console.error("Error deleting favorite:", error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        state,
        login,
        logout,
        loadFavoritesForUser,
        addFavorite,
        updateFavorite,
        removeFavorite,
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