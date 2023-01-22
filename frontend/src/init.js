import React from 'react';
import './index.css';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import { Provider as ProviderRollbar, ErrorBoundary } from '@rollbar/react';
import 'react-toastify/dist/ReactToastify.css';
import leoProfanity from 'leo-profanity';
import AuthProvider from './context/AuthProvider';
import SocketProvider from './context/SocketProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './slices/index.js';
import i18n from './locales/i18n';
import App from './App';
import ChatApi from './context/ChatApi';
import { addMessage } from './slices/messagesSlice';
import {
  addChannel, deleteChannel, updateChannel, addNewChannelId,
} from './slices/channelsSlice';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ACCESS_TOKEN,
  environment: 'production',
  captureUncaught: true,
  captureUnhandledRejections: true,
};

const init = (socketInit) => {
  const socket = ChatApi(socketInit);

  socketInit.on('newMessage', (payload) => {
    console.log(payload); // => { body: "new message", channelId: 7,id: 8, username: "admin" }
    store.dispatch(addMessage(payload));
  });

  socketInit.on('newChannel', (payload) => {
    console.log(payload, '1 neeeeeew');
    store.dispatch(addChannel(payload));
    store.dispatch(addNewChannelId(payload.id));
    console.log(payload, '4 newChannel'); // { id: 6, name: "new channel", removable: true }
  });

  socketInit.on('removeChannel', (payload) => {
    // console.log(payload, 'removeChan payload'); // { id: 6 };
    store.dispatch(deleteChannel(payload));
  });

  socketInit.on('renameChannel', (payload) => {
    // console.log(
    //   { id: payload.id, changes: payload.name },
    //   'renameChan payload',
    // ); // { id: 7, name: "new name channel", removable: true }
    store.dispatch(updateChannel({ id: payload.id, changes: payload }));
  });

  console.log(socket, 'socketttt');
  leoProfanity.clearList();
  leoProfanity.add(leoProfanity.getDictionary('en'));
  leoProfanity.add(leoProfanity.getDictionary('ru'));

  return (
    <ProviderRollbar config={rollbarConfig}>
      <ErrorBoundary>
        <SocketProvider socket={socket}>
          <I18nextProvider i18n={i18n}>
            <ToastContainer />
            <Provider store={store}>
              <AuthProvider>
                <App />
              </AuthProvider>
            </Provider>
          </I18nextProvider>
        </SocketProvider>
      </ErrorBoundary>
    </ProviderRollbar>
  );
};

export default init;
