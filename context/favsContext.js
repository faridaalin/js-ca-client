import { useState, useContext, createContext } from 'react';
import { FAVOURITES } from '../config/constants';

const favsContext = createContext();

const getFavs = () => {
  const currentList =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem(FAVOURITES))
      : null;
  return currentList;
};

export const FavsProvider = ({ children }) => {
  const [favourites, setFavourites] = useState(getFavs());

  return (
    <favsContext.Provider value={[favourites, setFavourites]}>
      {children}
    </favsContext.Provider>
  );
};

export const useFavs = () => {
  return useContext(favsContext);
};
