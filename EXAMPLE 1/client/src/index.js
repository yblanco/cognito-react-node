import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import * as serviceWorker from './serviceWorker';

import './assets/css/index.css';

ReactDOM.render(
  <BrowserRouter>
    <Route key={0} path="/" component={App} />
  </BrowserRouter>,
  document.getElementById('root')
);
serviceWorker.unregister();
