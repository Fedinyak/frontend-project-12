import {
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';

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
});
export const { addMessage, addMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
