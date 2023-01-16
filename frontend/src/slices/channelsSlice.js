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
      if (state.currentChannelId === payload.id) {
        // eslint-disable-next-line no-param-reassign
        state.currentChannelId = 1;
      }
      channelsAdapter.removeOne(state, payload.id);
    },
    updateChannel: channelsAdapter.updateOne,

    setCurrentChannelId: (state, action) => {
      console.log(state.currentChannelId, 'stateId');
      // eslint-disable-next-line no-param-reassign
      state.currentChannelId = action.payload;
    },
  },
});

export const {
  addChannel, addChannels, deleteChannel,
  updateChannel, setCurrentChannelId,
} = channelsSlice.actions;

export default channelsSlice.reducer;
