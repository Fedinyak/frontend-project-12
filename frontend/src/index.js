import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { ToastContainer } from 'react-toastify';
import { Provider as ProviderRollbar, ErrorBoundary } from '@rollbar/react';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AuthProvider from './context/AuthProvider';
// import bootstrap from 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
// import store from './redux/store';
import store from './slices/index.js';
import i18n from './locales/i18n';

const rollbarConfig = {
  accessToken: process.env.REACT_APP_ACCESS_TOKEN,
  environment: 'production',
  captureUncaught: true,
  captureUnhandledRejections: true,
  // accessToken: 'f413f3937d804f07b1f2c6d7990ae28e',
  // environment: 'testenv',
};

// function TestError() {
//   const a = null;
//   return a.hello();
// }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProviderRollbar config={rollbarConfig}>
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
        {/* <TestError /> */}
      </ErrorBoundary>
    </ProviderRollbar>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
