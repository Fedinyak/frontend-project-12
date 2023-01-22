import {
  createEntityAdapter, createSlice,
} from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({ currentChannelId: 1 });

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    addChannels: channelsAdapter.setAll,
    deleteChannel: (state, { payload }) => {
      console.log(payload, 'delChanSlice');
      console.log(state.currentChannelId, 'state.currentChannelId');
      if (state.currentChannelId === payload.id) {
        // eslint-disable-next-line no-param-reassign
        state.currentChannelId = 1;
      }
      channelsAdapter.removeOne(state, payload.id);
    },
    updateChannel: channelsAdapter.updateOne,
    addNewChannelId: (state, action) => {
      console.log(state.newChannelId, 'stateNewChannelId');
      // eslint-disable-next-line no-param-reassign
      state.newChannelId = action.payload;
    },
    setCurrentChannelId: (state, action) => {
      console.log(state.currentChannelId, 'stateId');
      // eslint-disable-next-line no-param-reassign
      state.currentChannelId = action.payload;
    },
    setNewChannelId: (state) => {
      console.log(state.newChannelId, 'state.newChannelId');
      console.log(state.currentChannelId, 'state.currentChannelId');
      // eslint-disable-next-line no-param-reassign
      state.currentChannelId = state.newChannelId;
      // state.currentChannelId = 2;
    },
  },
});

export const {
  addChannel, addChannels, deleteChannel,
  updateChannel, setCurrentChannelId, addNewChannelId, setNewChannelId,
} = channelsSlice.actions;

export default channelsSlice.reducer;
