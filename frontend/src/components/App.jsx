import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import LoginPage from './LoginPage.jsx';
import ErrorPage from './ErrorPage.jsx';
import SignupPage from './SignupPage.jsx';
import PrivatePage from './PrivatePage.jsx';
import { AuthContext, SocketContext } from '../contexts/index.jsx';
import { useAuth } from '../hooks/index.jsx';
import { setMessages, addMessage } from '../store/messagesSlice.jsx';
import routes from '../routes.js';
//import { actions as messagesActions } from '../store/messagesSlice.jsx';

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
  console.log('auth', auth);
  const location = useLocation();
  return auth.loggedIn ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => {
  const socket = io('ws://localhost:3000');
  const dispatch = useDispatch();
 // const { addMessage } = messagesActions;

  useEffect(() => {
    socket.on('newMessage', (message) => {
      dispatch(addMessage(message));
    });
    return () => {
      socket.off('newMessage');
    };
  }, []);

  const sendMessage = useCallback(
    (...args) =>
      new Promise((resolve, reject) => {
        socket.timeout(5000).emit('newMessage', ...args, (err) => {
          if (err) {
            reject(err);
          }
          resolve();
        });
      }),
    [socket]
  );

  const socketApi = useMemo(() => ({ sendMessage }), [sendMessage]);
  return (
    <SocketContext.Provider value={socketApi}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path={routes.error} element={<ErrorPage />} />
            <Route path={routes.login} element={<LoginPage />} />
            <Route path={routes.signup} element={<SignupPage />} />
            <Route
              path={routes.home}
              element={
                <PrivateRoute>
                  <PrivatePage />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </SocketContext.Provider>
  );
};

export default App;
