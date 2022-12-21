import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  entities: {
    isOpened: false,
    // type: null,
    // extra: null
  },
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setIsOpenedModal: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.isOpened = action.payload;
    },
  },
});

export const { setIsOpenedModal } = modalSlice.actions;

export default modalSlice.reducer;
