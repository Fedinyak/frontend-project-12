import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { io } from 'socket.io-client';
import runApp from './init';

const socket = io();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {runApp(socket)}
  </React.StrictMode>,
);

// reportWebVitals();
