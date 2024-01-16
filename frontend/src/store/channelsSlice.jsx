/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  currentChannelId: 1,
};

const channelsSlice = createSlice({
  name: 'channelsSlice',
  initialState,
  reducers: {
    setCurrentChannelId: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    setChannels: (state, { payload }) => {
      state.channels = payload;
    },
    addChannel: (state, { payload }) => {
      state.channels.push(payload);
    },
    removeChannel: (state, { payload }) => {
      const { id } = payload;
      state.channels = state.channels.filter((channel) => channel.id !== id);
    },
    renameChannel: (state, { payload }) => {
      const { id, name } = payload;
      state.channels = state.channels
        .map((channel) => (channel.id === id ? ({ ...channel, name }) : channel));
    },
  },
});

export const {
  setCurrentChannelId, setChannels, addChannel, removeChannel, renameChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
