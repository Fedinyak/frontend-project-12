import { io } from 'socket.io-client';
import store from '../slices/index';
import {
  addChannel,
  setCurrentChannelId,
  deleteChannel,
  updateChannel,
} from '../slices/channelsSlice';
import {
  addMessage,
} from '../slices/messagesSlice';

const socket = io();

export const newMessage = ({ body, channelId, username }) => {
  console.log(body, channelId, username, 'usernam');
  socket.emit('newMessage', { body, channelId, username });

  socket.on('newMessage', (payload) => {
    console.log(payload); // => { body: "new message", channelId: 7, id: 8, username: "admin" }
    store.dispatch(addMessage(payload));
  });
};

export const addNewChannel = (name) => {
  socket.emit('newChannel', { name });
  console.log(name, 'naaaaaame');

  socket.on('newChannel', (payload) => {
    console.log(payload, '1 neeeeeew');

    store.dispatch(setCurrentChannelId(payload.id));
    store.dispatch(addChannel(payload));
    console.log(payload, '4 newChannel'); // { id: 6, name: "new channel", removable: true }
  });
};

export const removeChannel = (id) => {
  console.log(id, 'rem');
  socket.emit('removeChannel', { id });

  socket.on('removeChannel', (payload) => {
    console.log(payload, 'removeChan payload'); // { id: 6 };
    store.dispatch(deleteChannel(payload));
  });
};

export const renameChannel = ({ id, name }) => {
  socket.emit('renameChannel', { id, name });
  socket.on('renameChannel', (payload) => {
    console.log({ id: payload.id, changes: payload.name }, 'renameChan payload'); // { id: 7, name: "new name channel", removable: true }
    store.dispatch(updateChannel({ id: payload.id, changes: payload }));
  });
};
