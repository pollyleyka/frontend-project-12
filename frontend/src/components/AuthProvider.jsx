import React, { useState, useCallback } from 'react';
import { AuthContext } from '../contexts/index.jsx';

const AuthProvider = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [loggedIn, setLoggedIn] = useState(user && user.token);
  const logIn = useCallback((userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setLoggedIn(true);
  }, []);
  const logOut = useCallback(() => {
    localStorage.removeItem('user');
    setLoggedIn(false);
  }, []);

  return (
    /* eslint-disable-next-line */
    <AuthContext.Provider value={{ user, loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
