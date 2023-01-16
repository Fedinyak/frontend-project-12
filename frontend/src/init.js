import React from 'react';
import './index.css';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import { Provider as ProviderRollbar, ErrorBoundary } from '@rollbar/react';
import 'react-toastify/dist/ReactToastify.css';
import leoProfanity from 'leo-profanity';
import { io } from 'socket.io-client';
import AuthProvider from './context/AuthProvider';
import SocketProvider from './context/SocketProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './slices/index.js';
import i18n from './locales/i18n';
import App from './App';
import ChatApi from './context/ChatApi';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ACCESS_TOKEN,
  environment: 'production',
  captureUncaught: true,
  captureUnhandledRejections: true,
};

const socketInit = io();
const init = () => {
  const socket = ChatApi(socketInit);
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
