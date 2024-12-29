import React from 'react';
import {StrictMode} from 'react';
import App from './App';
import {createRoot} from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss'

const rootElement = document.getElementById('chatApp');

const root = createRoot(rootElement);

root.render(
    <StrictMode>
      <App />
    </StrictMode>,
);