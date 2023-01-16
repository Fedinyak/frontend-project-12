import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './init';
// import {
//   BrowserRouter as Router,
// } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { I18nextProvider } from 'react-i18next';
// import { ToastContainer } from 'react-toastify';
// import { Provider as ProviderRollbar, ErrorBoundary } from '@rollbar/react';
// import 'react-toastify/dist/ReactToastify.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import AuthProvider from './context/AuthProvider';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import store from './slices/index.js';
// import i18n from './locales/i18n';

// const rollbarConfig = {
//   accessToken: process.env.REACT_APP_ACCESS_TOKEN,
//   environment: 'production',
//   captureUncaught: true,
//   captureUnhandledRejections: true,
// };

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {/* <ProviderRollbar config={rollbarConfig}>
      <ErrorBoundary>

        <Router>
          <I18nextProvider i18n={i18n}>
            <ToastContainer />
            <Provider store={store}>
              <AuthProvider>
                <App />
              </AuthProvider>
            </Provider>

          </I18nextProvider>
        </Router>
      </ErrorBoundary>
    </ProviderRollbar> */}
  </React.StrictMode>,
);

// reportWebVitals();
