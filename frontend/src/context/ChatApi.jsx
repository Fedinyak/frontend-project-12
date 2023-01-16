import store from '../slices/index';
import {
  addChannel,
  deleteChannel,
  setCurrentChannelId,
  updateChannel,
} from '../slices/channelsSlice';
import {
  addMessage,
} from '../slices/messagesSlice';

const ChatApi = (socket) => {
  const newMessage = ({ body, channelId, username }) => {
    console.log(body, channelId, username, 'usernam');
    socket.emit('newMessage', { body, channelId, username });
  };

  socket.on('newMessage', (payload) => {
    console.log(payload); // => { body: "new message", channelId: 7,id: 8, username: "admin" }
    store.dispatch(addMessage(payload));
  });

  const addNewChannel = (name) => {
    socket.emit('newChannel', { name });
    console.log(name, 'naaaaaame');
  };
  socket.on('newChannel', (payload) => {
    console.log(payload, '1 neeeeeew');

    store.dispatch(addChannel(payload));
    console.log(payload, '4 newChannel'); // { id: 6, name: "new channel", removable: true }
  });

  const addNewChannelId = () => {
    socket.on('newChannel', (payload) => {
      store.dispatch(setCurrentChannelId(payload.id));
    });
  };

  const removeChannel = (id) => {
    console.log(id, 'rem');
    socket.emit('removeChannel', { id });
  };
  socket.on('removeChannel', (payload) => {
    console.log(payload, 'removeChan payload'); // { id: 6 };
    store.dispatch(deleteChannel(payload));
  });

  const renameChannel = ({ id, name }) => {
    socket.emit('renameChannel', { id, name });
  };
  socket.on('renameChannel', (payload) => {
    console.log(
      { id: payload.id, changes: payload.name },
      'renameChan payload',
    ); // { id: 7, name: "new name channel", removable: true }
    store.dispatch(updateChannel({ id: payload.id, changes: payload }));
  });
  return {
    newMessage, addNewChannel, removeChannel, renameChannel, addNewChannelId,
  };
};
export default ChatApi;
