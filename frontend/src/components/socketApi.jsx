// import { io } from 'socket.io-client';
// import { useCallback, useEffect, useMemo } from 'react';
// import { useDispatch } from 'react-redux';
// import { addMessage } from '../store/messagesSlice.jsx';
// import {
//   addChannel,
//   renameChannel,
//   removeChannel,
// } from '../store/channelsSlice.jsx';

// const socket = io('/');
// const dispatch = useDispatch();

// useEffect(() => {
//   socket.on('newChannel', (channel) => {
//     dispatch(addChannel(channel));
//   });
//   return () => {
//     socket.off('newChannel');
//   };
// });

// useEffect(() => {
//   socket.on('newMessage', (message) => {
//     dispatch(addMessage(message));
//   });
//   return () => {
//     socket.off('newMessage');
//   };
// }, [dispatch, socket]);

// useEffect(() => {
//   socket.on('removeChannel', (channelId) => {
//     dispatch(removeChannel(channelId));
//   });
//   return () => {
//     socket.off('removeChannel');
//   };
// });
// useEffect(() => {
//   socket.on('renameChannel', (channel) => {
//     dispatch(renameChannel(channel));
//   });
//   return () => {
//     socket.off('renameChannel');
//   };
// });

// const sendMessage = useCallback(
//   (...args) => new Promise((resolve, reject) => {
//     socket.timeout(5000).emit('newMessage', ...args, (err) => {
//       if (err) {
//         reject(err);
//       }
//       resolve();
//     });
//   }),
//   [socket],
// );

// const newChannel = useCallback(
//   (...args) => new Promise((resolve, reject) => {
//     socket.timeout(5000).emit('newChannel', ...args, (err, response) => {
//       if (err) {
//         reject(err);
//       }
//       resolve(response);
//     });
//   }),
//   [socket],
// );

// const removeChan = useCallback(
//   (...args) => new Promise((resolve, reject) => {
//     socket.timeout(5000).emit('removeChannel', ...args, (err, response) => {
//       /* eslint-disable-next-line */
//       if (err) {
//         reject(err);
//       }
//       resolve(response);
//     });
//   }),
//   [socket],
// );
// const renameChan = useCallback(
//   (...args) => new Promise((resolve, reject) => {
//     socket.timeout(5000).emit('renameChannel', ...args, (err, response) => {
//       /* eslint-disable-next-line */
//       if (err) {
//         reject(err);
//       }
//       resolve(response);
//     });
//   }),
//   [socket],
// );

// const socketApi = useMemo(() => ({
//   sendMessage,
//   newChannel,
//   removeChan,
//   renameChan,
// }),
// [sendMessage, newChannel, removeChan, renameChan],
// );

// export default socketApi;
