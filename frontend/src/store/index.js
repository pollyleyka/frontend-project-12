import { configureStore } from '@reduxjs/toolkit';
import channelsSlice from './channelsSlice.jsx';
import messagesSlice from './messagesSlice.jsx';

const store = configureStore({
  reducer: {
    channels: channelsSlice,
    messages: messagesSlice,
  },
});

export default store;
