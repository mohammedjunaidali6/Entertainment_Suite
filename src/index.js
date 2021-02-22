import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import AppRoute from './routes/route';
import store from './store/store';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-responsive-modal/styles.css';
import './index.css';
import './assets/css/base.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRoute />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
