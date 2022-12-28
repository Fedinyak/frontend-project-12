import {
  createEntityAdapter,
  // createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import { fetchContent } from './channelsSlice';
// import axios from 'axios';
// import getAuthHeader from '../context/AuthHeader';

// const initialState = {
//   // entities: {
//   // },
// };

// export const fetchMessages = createAsyncThunk(
//   'messages/fetchMessages',
//   async () => {
//     const response = await axios.get('/api/v1/data', { headers: getAuthHeader() });
//     console.log(response.data, 'response.data');
//     // .then((response) => {
//     // const dispatch = useDispatch();
//     // dispatch(getChannels(response.data.channels));
//     // dispatch(getMessages(response.data.messages));
//     // });
//     return response.data;
//   },
// );
const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    getMessages: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      // state.entities = action.payload;
      state.entities.push(action.payload);
      // state.push(action.payload);
    },
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    // builder.addCase(fetchMessages.fulfilled, (state, action) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchContent.fulfilled, (state, action) => {
      // Add user to the state array
      console.log(action.payload, 'builder.messages');
      // state.entities.push(action.payload.channels);
      // eslint-disable-next-line no-param-reassign
      state.entities = action.payload.messages;
      // eslint-disable-next-line no-param-reassign
      // state.entities = action.payload.messages;
    });
  },
});
export const { getMessagesn, addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
