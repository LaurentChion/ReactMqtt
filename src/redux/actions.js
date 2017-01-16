import { initConnection } from '../api/mqttApi';

export const changeTermAction = term => (
  {
    type: 'CHANGE_TERM',
    term,
  }
);

export const fetchingConnectAction = () => ({ type: 'FETCH_CONNECT' });

export const fetchingErrorAction = () => (
  {
    type: 'FETCH_ERROR',
    error: 'Une erreur est survenue ...',
  }
);
export const fetchingSuccessAction = client => (
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
        (resolve) => {
          setTimeout(() => (resolve(initConnection(address))), 1000);
        },
      ).then(
        (client) => {
          dispatch(fetchingSuccessAction(client));
        })
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

export const updateAction = (id, value) => (
  {
    type: 'UPDATE_SENSOR',
    id,
    value,
  }
);

export const selectAction = id => (
  {
    type: 'SELECT_SENSOR',
    id,
  }
);
