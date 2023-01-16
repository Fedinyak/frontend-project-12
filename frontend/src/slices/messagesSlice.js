import {
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
// import { fetchContent } from './channelsSlice';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    // addMessage: messagesAdapter.addOne,
    addMessage: messagesAdapter.addOne,
    addMessages: messagesAdapter.addMany,
  },
  // extraReducers: (builder) => {
  //   builder.addCase(fetchContent.fulfilled, (state, action) => {
  //     console.log(action.payload, 'builder.messages');
  //     // eslint-disable-next-line no-param-reassign
  //     state.entities = action.payload.messages;
  //   });
  // },
});
export const { addMessage, addMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
