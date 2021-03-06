import {
  INITIAL_STATE,
  changeTerm,
  connectMqtt,
  listen,
  closeMqtt,
  addSensor,
  updateSensor,
  selectSensor,
  fetchSensorsBdd,
  fetchSensorBdd } from './core';

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CHANGE_TERM' :
      return changeTerm(state, action.term);

    case 'CONNECT_MQTT' :
      return connectMqtt(state, action.address);

    case 'FETCH_CONNECT' :
      return state.set('connect', 'FETCHING');
    case 'FETCH_ERROR' :
      return state.set('connect', 'OFF');
    case 'FETCH_SUCCESS' :
      return state.set('connect', 'ON').set('clientMQTT', action.client);

    case 'SUBSCRIBE' :
      return listen(state);

    case 'CLOSE_MQTT' :
      return closeMqtt(state, action.address);

    case 'ADD_SENSOR':
      return addSensor(state, action.sensor);

    case 'UPDATE_SENSOR':
      return updateSensor(state, action.id, action.data);

    case 'SELECT_SENSOR':
      return selectSensor(state, action.id);

    case 'FETCHING_SENSORS':
      return state.set('fetching', true);

    case 'FETCH_SENSORS_ERROR':
      return state.set('fetching', false);

    case 'FETCH_SENSORS_SUCCESS':
      return fetchSensorsBdd(state, action.sensors);

    case 'FETCHING_SENSOR':
      return state.set('fetchingSensor', true);

    case 'FETCH_SENSOR_ERROR':
      return state.set('fetchingSensor', false);

    case 'FETCH_SENSOR_SUCCESS':
      return fetchSensorBdd(state, action.id, action.data);

    case 'CHANGE_DATE' :
      return state.set('date', action.date);

    case 'CHANGE_PERIOD' :
      return state.set('period', action.period);

    case 'CHANGE_TIME' :
      return state.set('time', action.time);

    default:
      return state;

  }
};
