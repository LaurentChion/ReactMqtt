import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {reducer} from './redux/reducer';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

// export du store vers clientMqtt (un peu moche)
export const store = createStore(reducer);

const mountPoint = document.getElementById('root')

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  mountPoint
)
