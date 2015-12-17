import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from '../stores';
import App from './Main';

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
