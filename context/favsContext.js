import { useContext, createContext, useReducer } from 'react';
import { FAVOURITES } from '../config/constants';

const favsContext = createContext();

const reducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case 'saved':
      const localItem = JSON.parse(localStorage.getItem(FAVOURITES)) || [];
      return localItem;

    case 'add':
      const newList = [...state, payload];
      localStorage.setItem(FAVOURITES, JSON.stringify(newList));
      return newList;

    case 'delete':
      const updated = [...state].filter((truck) => truck.id !== payload);
      localStorage.setItem(FAVOURITES, JSON.stringify(updated));
      return updated;
  }
  return state;
};

export const FavsProvider = ({ children }) => {
  const [favourites, setFavourites] = useReducer(reducer, []);

  return (
    <favsContext.Provider value={[favourites, setFavourites]}>
      {children}
    </favsContext.Provider>
  );
};

export const useFavs = () => {
  return useContext(favsContext);
};
