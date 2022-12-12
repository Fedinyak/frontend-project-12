import { createSlice } from '@reduxjs/toolkit';

// Начальное значение
const initialState = {
  entities: {

  },
  // ids: [],
  currentChannelId: 1,
};

// posts: {
//   entities: {
//     post1: {
//       id: 'post1',
//       author: 'user1',
//       body: '......',
//       comments: ['comment1', 'comment2'],
//     },
//     post2: {
//       id: 'post2',
//       author: 'user2',
//       body: '......',
//       comments: [],
//     },
//   },
//   ids: ['post1', 'post2'],
// },

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    getChannels: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.entities = action.payload;
      // state.id.push[action.payload]
      // const { channels } = action.payload;
      // eslint-disable-next-line no-param-reassign
      // state.entities[channels] = channels;
      // state.ids.push(channels);
    },
    setCurrentChannelId: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.currentChannelId = action.payload;
    },
    // getChannels: (state, action) => {
    //   // state.value += 1;

    //   const { channels } = action.payload;

    //   // eslint-disable-next-line no-param-reassign
    //   state.entities[channels.id] = channels;
    //   state.ids.push(channels.id);
    // },
    // addChannels: (state, action) => {

    // }
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },
});

// Слайс генерирует действия, которые экспортируются отдельно
// Действия генерируются автоматически из имен ключей редьюсеров
// export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export const { getChannels, setCurrentChannelId } = channelsSlice.actions;

// По умолчанию экспортируется редьюсер сгенерированный слайсом
export default channelsSlice.reducer;
