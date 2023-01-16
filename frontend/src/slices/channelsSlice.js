import {
  // createAsyncThunk,
  createEntityAdapter, createSlice,
} from '@reduxjs/toolkit';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import getAuthHeader from '../context/AuthHeader';
// import routes from '../routes';

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({ currentChannelId: 1 });

// export const fetchContent = createAsyncThunk(
//   'fetchContent',
//   // eslint-disable-next-line consistent-return
//   async () => {
//     try {
//       const userId = JSON.parse(localStorage.getItem('userId'));
//       const headers = { Authorization: `Bearer ${userId.token}` };
//       const response = await axios.get(routes.dataPath(), { headers });
//       console.log(response.data, 'response.data');
//       return response.data;
//     } catch (error) {
//       toast.success(error.response.status);
//     }
//   },
// );

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    // addChannel: channelsAdapter.addOne,
    addChannel: channelsAdapter.addOne,
    addChannels: channelsAdapter.setAll,
    // addChannels: channelsAdapter.addMany,
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
    setNewCurrentChannelId: (state) => {
      console.log(state.newChannelId, 'staaaaaaaaate');
      // eslint-disable-next-line no-param-reassign
      // state.currentChannelId = state.newChannelId;
    },
    getNewChannelId: (state, action) => {
      console.log(state.currentChannelId, 'stateId');
      // eslint-disable-next-line no-param-reassign
      state.newChannelId = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(fetchContent.fulfilled, (state, action) => {
  //     console.log(action.payload, 'builder addCase');
  //     channelsAdapter.addMany(state, action.payload.channels);
  //   });
  // },
});

export const {
  addChannel, addChannels, deleteChannel,
  updateChannel, setCurrentChannelId,
  getNewChannelId, setNewCurrentChannelId,
} = channelsSlice.actions;

export default channelsSlice.reducer;
