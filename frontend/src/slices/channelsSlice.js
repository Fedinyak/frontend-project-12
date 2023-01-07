import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getAuthHeader from '../context/AuthHeader';
import routes from '../routes';

// Начальное значение
// const initialState = {
//   entities: {

//   },
//   // ids: [],
//   currentChannelId: 1,
// };

const channelsAdapter = createEntityAdapter();

// По умолчанию: { ids: [], entities: {} }
const initialState = channelsAdapter.getInitialState({ currentChannelId: 1 });

export const fetchContent = createAsyncThunk(
  'fetchContent',
  async () => {
    const response = await axios.get(routes.dataPath(), { headers: getAuthHeader() });
    console.log(response.data, 'response.data');
    // .then((response) => {
    // const dispatch = useDispatch();
    // dispatch(getChannels(response.data.channels));
    // dispatch(getMessages(response.data.messages));
    // });
    return response.data;
  },
);
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
    // addChannels: channelsAdapter.addMany,
    addChannel: channelsAdapter.addOne,
    deleteChannel: (state, { payload }) => {
    // deleteChannel: (state, action) => {
      console.log(payload, 'delChanSlice');
      // console.log(state.entities.channels, 'StatedelChanSlice');
      if (state.currentChannelId === payload.id) {
        // eslint-disable-next-line no-param-reassign
        state.currentChannelId = 1;
      }
      channelsAdapter.removeOne(state, payload.id);
    },
    // deleteChannel: channelsAdapter.removeOne,
    updateChannel: channelsAdapter.updateOne,
    getChannels: (state, action) => {
      // console.log('dfdffdfdf');
      // eslint-disable-next-line no-param-reassign, no-unused-expressions
      state.entities.push(action.payload);
      // {channel}
      // const { user } = action.payload;
      console.log(action, '2 userA');
      console.log(state, 'user');
      // return [...state, action.payload];
      // eslint-disable-next-line no-param-reassign
      // state.entities = action.payload;
      // state.id.push[action.payload]
      // const { channels } = action.payload;
      // eslint-disable-next-line no-param-reassign
      // state.entities[channels] = channels;
      // state.ids.push(channels);
    },
    setCurrentChannelId: (state, action) => {
      console.log(state.currentChannelId, 'stateId');
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
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchContent.fulfilled, (state, action) => {
      // Add user to the state array
      console.log(action.payload, 'builder addCase');
      // state.entities.push(action.payload.channels);
      // eslint-disable-next-line no-param-reassign
      // state.entities = action.payload;
      // eslint-disable-next-line no-param-reassign
      // state.entities = action.payload.channels;
      channelsAdapter.addMany(state, action.payload.channels);
      // eslint-disable-next-line no-param-reassign
      // state.currentChannelId = action.payload.currentChannelId;
      // state.entities = action.payload.messages;
    });
  },
});

// Слайс генерирует действия, которые экспортируются отдельно
// Действия генерируются автоматически из имен ключей редьюсеров
// export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export const {
  addChannel, deleteChannel, updateChannel, getChannels, setCurrentChannelId,
} = channelsSlice.actions;

// По умолчанию экспортируется редьюсер сгенерированный слайсом
export default channelsSlice.reducer;
