import React from 'react';
import ReactDOM from 'react-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { Router, Route, browserHistory } from 'react-router';

import reducer from './redux/reducer';

import App from './App';
import Body from './components/Body';
/* //TODO : router vers information (:/sensor)
import Information from './components/Information';*/

import { INITIAL_STATE } from './redux/core';

injectTapEventPlugin();

// FIXME: export du store vers clientMqtt (un peu moche)
export const store = createStore(
  reducer,
  INITIAL_STATE,
  applyMiddleware(thunk),
);

const mountPoint = document.getElementById('root');

ReactDOM.render(
  <Provider store={ store }>
    <MuiThemeProvider>
      <Router history={ browserHistory }>
        <Route path='/' component={ App } />
        <Route path='/(:adresse)' component={ Body } >
          {/*<Route path='/(:adresse)/(:sensor)' component={ Information } />*/}
        </Route>
      </Router>
    </MuiThemeProvider>
  </Provider>,
  mountPoint,
);
