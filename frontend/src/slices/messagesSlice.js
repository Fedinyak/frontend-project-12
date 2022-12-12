import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // entities: {
  // },
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    getMessages: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.entities = action.payload;
    },
  },
});
export const { getMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
