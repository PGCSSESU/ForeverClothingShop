import { createContext, useContext, useEffect, useState } from "react";
import { ShopContext } from "./ShopContext";

export const FavouriteContext = createContext();

export const FavouriteProvider = ({ children }) => {
  const { token } = useContext(ShopContext);

  const storageKey = token ? `favourites_${token}` : null;

  const [favourites, setFavourites] = useState([]);

  /* ================= LOAD USER FAVOURITES ================= */
  useEffect(() => {
    if (!storageKey) {
      setFavourites([]);
      return;
    }

    const stored = localStorage.getItem(storageKey);
    setFavourites(stored ? JSON.parse(stored) : []);
  }, [storageKey]);

  /* ================= SAVE USER FAVOURITES ================= */
  useEffect(() => {
    if (!storageKey) return;
    localStorage.setItem(storageKey, JSON.stringify(favourites));
  }, [favourites, storageKey]);

  /* ================= ACTIONS ================= */
  const toggleFavourite = (product) => {
    if (!token) return;

    setFavourites((prev) => {
      const exists = prev.find((p) => p._id === product._id);
      if (exists) {
        return prev.filter((p) => p._id !== product._id);
      }
      return [...prev, product];
    });
  };

  const isFavourite = (productId) =>
    favourites.some((p) => p._id === productId);

  return (
    <FavouriteContext.Provider
      value={{ favourites, toggleFavourite, isFavourite }}
    >
      {children}
    </FavouriteContext.Provider>
  );
};
