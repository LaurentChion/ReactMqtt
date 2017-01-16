import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { Router, Route, browserHistory } from 'react-router';

import reducer from './redux/reducer';

import App from './App';
import Body from './components/Body';

import { INITIAL_STATE } from './redux/core';

// FIXME: export du store vers clientMqtt (un peu moche)
export const store = createStore(
  reducer,
  INITIAL_STATE,
  applyMiddleware(thunk),
);

const mountPoint = document.getElementById('root');

ReactDOM.render(
  <Provider store={ store }>
    <Router history={ browserHistory }>
      <Route path='/' component={ App } />
      <Route path='/(:adresse)' component={ Body } />
    </Router>
  </Provider>,
  mountPoint,
);
