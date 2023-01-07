import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  entities: {
    isOpened: false,
    type: null,
    channelId: null,
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
    openedModal: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.entities.isOpened = action.payload.isOpened;
      // eslint-disable-next-line no-param-reassign
      state.entities.type = action.payload.type;
      // eslint-disable-next-line no-param-reassign
      state.entities.channelId = action.payload.channelId;
    },
    closedModal: (state) => {
      // eslint-disable-next-line no-param-reassign
      state.entities.isOpened = null;
      // eslint-disable-next-line no-param-reassign
      state.entities.type = null;
      // eslint-disable-next-line no-param-reassign
      state.entities.channelId = null;
    },
  },
});

export const { setIsOpenedModal, openedModal, closedModal } = modalSlice.actions;

export default modalSlice.reducer;
