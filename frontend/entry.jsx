import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from './store/store.js';

import Root from './components/root';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById("main");

  let store = configureStore();
  ReactDOM.render(<Root store={store}/>, root);

  // window.store = store;
});
