import React, { useState, useCallback } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from 'react-router-dom';
import LoginPage from './LoginPage.jsx';
import ErrorPage from './ErrorPage.jsx';
import SignupPage from './SignupPage.jsx';
import PrivatePage from './PrivatePage.jsx';
import AuthContext from '../contexts/index.jsx';
import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(currentUser || null);

  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = useCallback((userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setLoggedIn(true);
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('user');
    setUser(null);
    setLoggedIn(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  //const { user } = useAuth();
  //return user ? children : <Navigate to={routes.login} />;
  return auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }}/>
};



const App = () => {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
          <Route path={routes.error} element={<ErrorPage />} />
          <Route path={routes.login} element={<LoginPage />} />
          <Route path={routes.signup} element={<SignupPage />} />
          <Route
            path={routes.home}
            element={(
              <PrivateRoute>
                <PrivatePage />
              </PrivateRoute>
            )}
          />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App;