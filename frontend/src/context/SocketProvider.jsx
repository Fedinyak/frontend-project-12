import SocketContext from './SocketContext';

const SocketProvider = ({ socket, children }) => {
  console.log(socket, 'api');
  const {
    newMessage, addNewChannel, removeChannel, renameChannel,
  } = socket;

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <SocketContext.Provider value={{
      newMessage, addNewChannel, removeChannel, renameChannel,
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
