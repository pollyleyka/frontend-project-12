import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from './channelsSlice.jsx';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, { payload }) => {
      state.messages = payload;
    },
    addMessage: (state, { payload }) => {
      state.messages.push(payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeChannel, (state, { payload }) => {
        const { id } = payload;
        const restMessages = state.messages.filter((message) => message.channelId !== id);
        state.messages = restMessages;
      });
  },
});

export default messagesSlice.reducer;
export const { setMessages, addMessage } = messagesSlice.actions;
