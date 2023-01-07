import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getAuthHeader from '../context/AuthHeader';
import routes from '../routes';

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({ currentChannelId: 1 });

export const fetchContent = createAsyncThunk(
  'fetchContent',
  async () => {
    const response = await axios.get(routes.dataPath(), { headers: getAuthHeader() });
    console.log(response.data, 'response.data');
    return response.data;
  },
);

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
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
  extraReducers: (builder) => {
    builder.addCase(fetchContent.fulfilled, (state, action) => {
      console.log(action.payload, 'builder addCase');
      channelsAdapter.addMany(state, action.payload.channels);
    });
  },
});

export const {
  addChannel, deleteChannel, updateChannel, setCurrentChannelId,
} = channelsSlice.actions;

export default channelsSlice.reducer;
