const ChatApi = (socket) => {
  const newMessage = ({ body, channelId, username }) => {
    socket.emit('newMessage', { body, channelId, username });
  };

  const addNewChannel = (name) => {
    socket.emit('newChannel', { name });
  };

  const removeChannel = (id) => {
    socket.emit('removeChannel', { id });
  };

  const renameChannel = ({ id, name }) => {
    socket.emit('renameChannel', { id, name });
  };

  return {
    newMessage, addNewChannel, removeChannel, renameChannel,
  };
};
export default ChatApi;
