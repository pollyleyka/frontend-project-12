/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const DEFAULT_CHANNEL_ID = 1;

const initialState = {
  channels: [],
  currentChannelId: DEFAULT_CHANNEL_ID,
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
      if (id === state.currentChannelId) {
        state.currentChannelId = DEFAULT_CHANNEL_ID;
      }
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
