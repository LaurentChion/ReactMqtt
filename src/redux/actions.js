import { initConnection } from '../api/mqttApi';

import fetch from '../api/fetch';

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

/* Partie Mongo */

const fetchingSensors = () => (
  {
    type: 'FETCHING_SENSORS',
  }
);

const fetchSensorsError = () => (
  {
    type: 'FETCH_SENSORS_ERROR',
  }
);
const fetchSensorsSuccess = sensors => (
  {
    type: 'FETCH_SENSORS_SUCCESS',
    sensors,
  }
);

export const fetchSensors = () => (
  (dispatch) => {
    dispatch(fetchingSensors());

    const fError = (error) => {
      dispatch(fetchSensorsError(error));
    };

    const fSuccess = (response) => {
      dispatch(fetchSensorsSuccess(response));
    };

    return (
       new Promise(
         (resolve) => {
           resolve(fetch('http://localhost:8090/v0/sensors/', fError, fSuccess));
         })
    );
  }
);


export const fetchSensorError = error => (
  {
    type: 'FETCH_SENSOR_ERROR',
    error,
  }
);

export const fetchSensorSuccess = (id, data) => (
  {
    type: 'FETCH_SENSOR_SUCCESS',
    id,
    data,
  }
);

export const fetchSensor = (id, dateDebut = -1, duree = -1) => (
  (dispatch) => {
    dispatch({ type: 'FETCHING_SENSOR' });

    const fError = (error) => {
      dispatch(fetchSensorError(error));
    };

    const fSuccess = (response) => {
      dispatch(fetchSensorSuccess(id, response));
    };

    return (
      new Promise(
        (resolve) => {
          resolve(fetch(`http://localhost:8090/v0/sensor/${id}`, fError, fSuccess));
        })
    );
  }
);
