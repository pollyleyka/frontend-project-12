import React, { useCallback, useEffect, useMemo } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { Provider, ErrorBoundary } from '@rollbar/react';
import { ToastContainer } from 'react-toastify';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import AuthProvider from './AuthProvider.jsx';
import LoginPage from './LoginPage.jsx';
import ErrorPage from './ErrorPage.jsx';
import SignupPage from './SignupPage.jsx';
import PrivatePage from './PrivatePage.jsx';
import { SocketContext } from '../contexts/index.jsx';
import { useAuth } from '../hooks/index.jsx';
import { addMessage } from '../store/messagesSlice.jsx';
import {
  addChannel,
  renameChannel,
  removeChannel,
} from '../store/channelsSlice.jsx';
import routes from '../routes.js';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  return auth.loggedIn ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};
const rollbarConfig = {
  accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
  payload: {
    environment: 'production',
  },
  captureUncaught: true,
  captureUnhandledRejections: true,
};

const App = () => {
  const socket = io();
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on('newChannel', (channel) => {
      dispatch(addChannel(channel));
    });
    return () => {
      socket.off('newChannel');
    };
  });

  useEffect(() => {
    socket.on('newMessage', (message) => {
      dispatch(addMessage(message));
    });
    return () => {
      socket.off('newMessage');
    };
  }, [dispatch, socket]);

  useEffect(() => {
    socket.on('removeChannel', (channelId) => {
      dispatch(removeChannel(channelId));
    });
    return () => {
      socket.off('removeChannel');
    };
  });
  useEffect(() => {
    socket.on('renameChannel', (channel) => {
      dispatch(renameChannel(channel));
    });
    return () => {
      socket.off('renameChannel');
    };
  });

  const sendMessage = useCallback(
    (...args) => new Promise((resolve, reject) => {
      socket.timeout(5000).emit('newMessage', ...args, (err) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    }),
    [socket],
  );

  const newChannel = useCallback(
    (...args) => new Promise((resolve, reject) => {
      socket.timeout(5000).emit('newChannel', ...args, (err, response) => {
        if (err) {
          reject(err);
        }
        resolve(response);
      });
    }),
    [socket],
  );

  const removeChan = useCallback(
    (...args) => new Promise((resolve, reject) => {
      socket.timeout(5000).emit('removeChannel', ...args, (err, response) => {
        /* eslint-disable-next-line */
        if (err) {
          reject(err);
        }
        resolve(response);
      });
    }),
    [socket],
  );
  const renameChan = useCallback(
    (...args) => new Promise((resolve, reject) => {
      socket.timeout(5000).emit('renameChannel', ...args, (err, response) => {
        /* eslint-disable-next-line */
        if (err) {
          reject(err);
        }
        resolve(response);
      });
    }),
    [socket],
  );

  const socketApi = useMemo(
    () => ({
      sendMessage,
      newChannel,
      removeChan,
      renameChan,
    }),
    [sendMessage, newChannel, removeChan, renameChan],
  );
  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <SocketContext.Provider value={socketApi}>
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
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
            </BrowserRouter>
          </AuthProvider>
        </SocketContext.Provider>
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
