// // import { io } from 'socket.io-client';
// // import { useDispatch } from 'react-redux';
// // import { useContext } from 'react';
// import store from '../slices/index';
// import {
//   addChannel,
//   setCurrentChannelId,
//   deleteChannel,
//   updateChannel,
// } from '../slices/channelsSlice';
// import {
//   addMessage,
//   // addMessages,
// } from '../slices/messagesSlice';
// // import SocketContext from './SocketContext';

// const ChatApi = (socket) => {
//   // const socket = useContext(SocketContext);
//   // const socket = io();

//   const newMessage = ({ body, channelId, username }) => {
//     console.log(body, channelId, username, 'usernam');
//     socket.emit('newMessage', { body, channelId, username });

//     socket.on('newMessage', (payload) => {
//       console.log(payload); // => { body: "new message", channelId: 7,id: 8, username: "admin" }
//       // const dispatch = useDispatch();
//       // dispatch(addMessage(payload));
//       store.dispatch(addMessage(payload));
//     });
//   };

//   const addNewChannel = (name) => {
//     socket.emit('newChannel', { name });
//     console.log(name, 'naaaaaame');

//     socket.on('newChannel', (payload) => {
//       console.log(payload, '1 neeeeeew');

//       store.dispatch(setCurrentChannelId(payload.id));
//       store.dispatch(addChannel(payload));
//       console.log(payload, '4 newChannel'); // { id: 6, name: "new channel", removable: true }
//     });
//   };

//   const removeChannel = (id) => {
//     console.log(id, 'rem');
//     socket.emit('removeChannel', { id });

//     socket.on('removeChannel', (payload) => {
//       console.log(payload, 'removeChan payload'); // { id: 6 };
//       store.dispatch(deleteChannel(payload));
//     });
//   };

//   const renameChannel = ({ id, name }) => {
//     socket.emit('renameChannel', { id, name });
//     socket.on('renameChannel', (payload) => {
//       console.log(
//         { id: payload.id, changes: payload.name },
//         'renameChan payload',
//       ); // { id: 7, name: "new name channel", removable: true }
//       store.dispatch(updateChannel({ id: payload.id, changes: payload }));
//     });
//   };
//   return {
//     newMessage, addNewChannel, removeChannel, renameChannel,
//   };
// };
// export default ChatApi;

// import { io } from 'socket.io-client';
// // import { useDispatch } from 'react-redux';
// // import { useContext } from 'react';
// import store from '../slices/index';
// import {
//   addChannel,
//   setCurrentChannelId,
//   deleteChannel,
//   updateChannel,
// } from '../slices/channelsSlice';
// import {
//   addMessage,
//   // addMessages,
// } from '../slices/messagesSlice';
// // import SocketContext from './SocketContext';

// // const socket = useContext(SocketContext);
// const socket = io();
// const ChatApi = {

//   newMessage: ({ body, channelId, username }) => {
//     console.log(body, channelId, username, 'usernam');
//     socket.emit('newMessage', { body, channelId, username });

//     socket.on('newMessage', (payload) => {
//       console.log(payload); // => { body: "new message", channelId: 7,id: 8, username: "admin" }
//       // const dispatch = useDispatch();
//       // dispatch(addMessage(payload));
//       store.dispatch(addMessage(payload));
//     });
//   },

//   addNewChannel: (name) => {
//     socket.emit('newChannel', { name });
//     console.log(name, 'naaaaaame');

//     socket.on('newChannel', (payload) => {
//       console.log(payload, '1 neeeeeew');

//       store.dispatch(setCurrentChannelId(payload.id));
//       store.dispatch(addChannel(payload));
//       console.log(payload, '4 newChannel'); // { id: 6, name: "new channel", removable: true }
//     });
//   },

//   removeChannel: (id) => {
//     console.log(id, 'rem');
//     socket.emit('removeChannel', { id });

//     socket.on('removeChannel', (payload) => {
//       console.log(payload, 'removeChan payload'); // { id: 6 };
//       store.dispatch(deleteChannel(payload));
//     });
//   },

//   renameChannel: ({ id, name }) => {
//     socket.emit('renameChannel', { id, name });
//     socket.on('renameChannel', (payload) => {
//       console.log(
//         { id: payload.id, changes: payload.name },
//         'renameChan payload',
//       ); // { id: 7, name: "new name channel", removable: true }
//       store.dispatch(updateChannel({ id: payload.id, changes: payload }));
//     });
//   },

// };
// export default ChatApi;

// import { io } from 'socket.io-client';
// // import { useDispatch } from 'react-redux';
// import { useContext } from 'react';
// import store from '../slices/index';
// import {
//   addChannel,
//   setCurrentChannelId,
//   deleteChannel,
//   updateChannel,
// } from '../slices/channelsSlice';
// import {
//   addMessage,
//   // addMessages,
// } from '../slices/messagesSlice';
// import SocketContext from './SocketContext';

// // const socket = useContext(SocketContext);
// // const socket = io();

// export const newMessage = ({ body, channelId, username }) => {
//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   const { socket } = useContext(SocketContext);
//   console.log(body, channelId, username, 'usernam');
//   socket.emit('newMessage', { body, channelId, username });

//   socket.on('newMessage', (payload) => {
//     console.log(payload); // => { body: "new message", channelId: 7,id: 8, username: "admin" }
//     // const dispatch = useDispatch();
//     // dispatch(addMessage(payload));
//     store.dispatch(addMessage(payload));
//   });
// };

// export const addNewChannel = (name) => {
//   const socket = io();
//   socket.emit('newChannel', { name });
//   console.log(name, 'naaaaaame');

//   socket.on('newChannel', (payload) => {
//     console.log(payload, '1 neeeeeew');

//     store.dispatch(setCurrentChannelId(payload.id));
//     store.dispatch(addChannel(payload));
//     console.log(payload, '4 newChannel'); // { id: 6, name: "new channel", removable: true }
//   });
// };

// export const removeChannel = (id) => {
//   const socket = io();
//   console.log(id, 'rem');
//   socket.emit('removeChannel', { id });

//   socket.on('removeChannel', (payload) => {
//     console.log(payload, 'removeChan payload'); // { id: 6 };
//     store.dispatch(deleteChannel(payload));
//   });
// };

// export const renameChannel = ({ id, name }) => {
//   const socket = io();
//   socket.emit('renameChannel', { id, name });
//   socket.on('renameChannel', (payload) => {
//     console.log(
//       { id: payload.id, changes: payload.name },
//       'renameChan payload',
//     ); // { id: 7, name: "new name channel", removable: true }
//     store.dispatch(updateChannel({ id: payload.id, changes: payload }));
//   });
// };

// import { io } from 'socket.io-client';
// import { useDispatch } from 'react-redux';
// import { useContext } from 'react';
import store from '../slices/index';
import {
  addChannel,
  // setCurrentChannelId,
  deleteChannel,
  // getNewChannelId,
  setCurrentChannelId,
  updateChannel,
} from '../slices/channelsSlice';
import {
  addMessage,
  // addMessages,
} from '../slices/messagesSlice';
// import SocketContext from './SocketContext';

const ChatApi = (socket) => {
  // const socket = useContext(SocketContext);
  // const socket = io();

  const newMessage = ({ body, channelId, username }) => {
    console.log(body, channelId, username, 'usernam');
    socket.emit('newMessage', { body, channelId, username });
  };

  socket.on('newMessage', (payload) => {
    console.log(payload); // => { body: "new message", channelId: 7,id: 8, username: "admin" }
    // const dispatch = useDispatch();
    // dispatch(addMessage(payload));
    store.dispatch(addMessage(payload));
  });

  const addNewChannel = (name) => {
    socket.emit('newChannel', { name });
    console.log(name, 'naaaaaame');
  };
  socket.on('newChannel', (payload) => {
    console.log(payload, '1 neeeeeew');

    // store.dispatch(setCurrentChannelId(payload.id));
    // store.dispatch(getNewChannelId(payload.id));
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
  // return (
  //   <SocketContext.Provider value={{
  //     newMessage, addNewChannel, removeChannel, renameChannel,
  //   }}
  //   >
  //     {children}
  //   </SocketContext.Provider>
  // );
};
export default ChatApi;
