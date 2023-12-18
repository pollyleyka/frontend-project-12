import { configureStore } from '@reduxjs/toolkit';
import channelsSlice from './channelsSlice.jsx';
import messagesSlice from './messagesSlice.jsx';
import modalsSlice from './modalsSlice.jsx';

const store = configureStore({
  reducer: {
    channels: channelsSlice,
    messages: messagesSlice,
    modal: modalsSlice,
  },
});

export default store;
