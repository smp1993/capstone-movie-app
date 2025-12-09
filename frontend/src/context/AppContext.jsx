// src/context/AppContext.jsx
import { createContext, useContext, useReducer } from "react";

const AppContext = createContext();

const initialState = {
  user: null,      // بعداً با Google Auth پر می‌کنیم
  favorites: [],   // بعداً از backend می‌آد
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

  // این‌ها رو فعلاً ساده نگه می‌داریم، بعداً auth واقعی و API وصل می‌کنیم
  const login = (user) => {
    dispatch({ type: "LOGIN", payload: user });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const setFavorites = (favorites) => {
    dispatch({ type: "SET_FAVORITES", payload: favorites });
  };

  const addFavorite = (favorite) => {
    dispatch({ type: "ADD_FAVORITE", payload: favorite });
  };

  const updateFavorite = (favorite) => {
    dispatch({ type: "UPDATE_FAVORITE", payload: favorite });
  };

  const removeFavorite = (favoriteId) => {
    dispatch({ type: "REMOVE_FAVORITE", payload: favoriteId });
  };

  return (
    <AppContext.Provider
      value={{
        state,
        login,
        logout,
        setFavorites,
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