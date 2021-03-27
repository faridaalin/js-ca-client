import { useState, useContext, createContext } from 'react';
import { USER_TOKEN } from '../config/constants';

const authContext = createContext();

const getAuth = () => {
  const currentuser =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem(USER_TOKEN))
      : null;

  return currentuser;
};

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(getAuth());

  return (
    <authContext.Provider value={[authToken, setAuthToken]}>
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(authContext);
};
