import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../slices/counterSlice.js';
import channelsReducer from './channelsSlice.js';
import messagesReducer from './messagesSlice.js';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
  },
});
