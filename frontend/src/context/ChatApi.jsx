// import { useCallback } from 'react';
// import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import store from '../slices/index';
import {
  // fetchContent,
  // fetchContent,
  addChannel,
  // getChannels,
  setCurrentChannelId,
  deleteChannel,
  updateChannel,
} from '../slices/channelsSlice';
import {
  // getMessages
  addMessage,
} from '../slices/messagesSlice';

// const socket = io('ws://localhost:3000');
const socket = io();

export const newMessage = ({ body, channelId, username }) => {
  console.log(body, channelId, username, 'usernam');
  // emit new message
  socket.emit('newMessage', { body, channelId, username });

  socket.on('newMessage', (payload) => {
    // const dispatch = useDispatch();
    console.log(payload); // => { body: "new message", channelId: 7, id: 8, username: "admin" }
    // store.dispatch(getMessages(payload));
    store.dispatch(addMessage(payload));
    // dispatch(fetchContent());
  });
};

export const addNewChannel = (name) => {
  socket.emit('newChannel', { name });
  console.log(name, 'naaaaaame');

  // subscribe new channel
  socket.on('newChannel', (payload) => {
    console.log(payload, '1 neeeeeew');
    // const dispatch = useDispatch();
    // useCallback(() => dispatch(setCurrentChannelId(payload.id)), []);

    // useCallback(() => dispatch(getChannels(payload)), []);
    store.dispatch(setCurrentChannelId(payload.id));
    store.dispatch(addChannel(payload));
    // store.dispatch(getChannels(payload));
    console.log(payload, '4 newChannel'); // { id: 6, name: "new channel", removable: true }
    // store.dispatch(fetchContent());
  });
};

export const removeChannel = (id) => {
  // emit remove channel
  console.log(id, 'rem');
  socket.emit('removeChannel', { id });

  // subscribe remove channel
  socket.on('removeChannel', (payload) => {
    console.log(payload, 'removeChan payload'); // { id: 6 };
    // store.dispatch(setCurrentChannelId(1));
    store.dispatch(deleteChannel(payload));
    // store.dispatch(getChannels(payload));
    // store.dispatch(fetchContent());
  });
};

// export const renameChannel = (data) => {
export const renameChannel = ({ id, name }) => {
  // emit rename channel
  // socket.emit('renameChannel', { id: 7, name: "new name channel" });
  socket.emit('renameChannel', { id, name });
  // console.log(data, 'renameChannel emit'); //
  // subscribe rename channel
  // socket.on('renameChannel', (payload) => {
  socket.on('renameChannel', (payload) => {
    console.log({ id: payload.id, changes: payload.name }, 'renameChan payload'); // { id: 7, name: "new name channel", removable: true }
    store.dispatch(updateChannel({ id: payload.id, changes: payload }));
    // store.dispatch(updateChannel(payload));
  });
};
