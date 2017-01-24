import { initConnection } from '../api/mqttApi';

export const changeTermAction = term => (
  {
    type: 'CHANGE_TERM',
    term,
  }
);

export const fetchingConnectAction = () => ({ type: 'FETCH_CONNECT' });

const fetchingErrorAction = () => (
  {
    type: 'FETCH_ERROR',
    error: 'Une erreur est survenue ...',
  }
);
const fetchingSuccessAction = client => (
  {
    type: 'FETCH_SUCCESS',
    client,
  }
);

export const connectMqttAction = address => (
  (dispatch) => {
    dispatch(fetchingConnectAction());
    return (
      new Promise(
        (resolve) => { setTimeout(() => (resolve(initConnection(address))), 3000); })
        .then((client) => { dispatch(fetchingSuccessAction(client)); })
        .catch(() => { dispatch(fetchingErrorAction()); })
    );
  }
);

export const closeMqttAction = () => ({ type: 'CLOSE_MQTT' });

export const subscribeAction = () => ({ type: 'SUBSCRIBE' });

export const addAction = sensor => (
  {
    type: 'ADD_SENSOR',
    sensor,
  }
);

export const updateAction = (id, data) => (
  {
    type: 'UPDATE_SENSOR',
    id,
    data,
  }
);

export const selectAction = id => (
  {
    type: 'SELECT_SENSOR',
    id,
  }
);
