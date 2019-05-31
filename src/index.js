import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { ActionTypes } from './actions';
import App from './components/app';
import reducers from './reducers';

// this creates the store with the reducers,
// and does some other stuff to initialize devtools

const store = createStore(reducers, {}, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
));

const token = localStorage.getItem('token');
const username = localStorage.getItem('username');
const email = localStorage.getItem('email');
const user = { username, email };

if (token && username && email) {
  store.dispatch({ type: ActionTypes.AUTH_USER, payload: user });
}

// we now wrap App in a Provider
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('main'),
);
