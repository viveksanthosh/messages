import App from './App';
import React from 'react';
import { hydrate } from 'react-dom';
let state;
try {
  state = window.__INITIAL_DATA__;
  delete window.__INITIAL_DATA__
} catch (e) {

}
hydrate(
  <App state={state} />,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
