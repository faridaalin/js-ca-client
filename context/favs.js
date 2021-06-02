import { useState, useContext, createContext } from 'react';
import { FAVOURITES } from '../config/constants';

const favContext = createContext();

const getFavList = () => {
  const currentFavList =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem(FAVOURITES))
      : [];
  return currentFavList;
};

export const FavProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  return (
    <favContext.Provider value={[favourites, setFavourites]}>
      {children}
    </favContext.Provider>
  );
};

export const useFavourites = () => {
  return useContext(favContext);
};
