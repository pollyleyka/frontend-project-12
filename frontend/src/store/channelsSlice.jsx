import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  currentChannelId: 1,
};
const defaultChannelID = 1;

const channelsSlice = createSlice({
  name: 'channelsSlice',
  initialState,
  reducers: {
    setCurrentChannelId: (state, action) => {
      state.currentChannelId = action.payload;
    },
    setChannels: (state, action) => {
      state.channels = action.payload;
    },
    addChannel: (state, action) => {
      state.channels.push(action.payload);
      state.currentChannelId = action.payload.id;
    },
    removeChannel: (state, action) => {
      const { id } = action.payload;
      state.channels = state.channels.filter((channel) => channel.id !== id);
      if (id === state.currentChannelId) {
        state.currentChannelId = defaultChannelID;
      }
    },
    renameChannel: (state, action) => {
      const { id, name } = action.payload;
      state.channels = state.channels
        .map((channel) => (channel.id === id ? ({ ...channel, name }) : channel));
    },
  },
});

export const {
  setCurrentChannelId, setChannels, addChannel, removeChannel, renameChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
