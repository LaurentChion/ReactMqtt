import {
  INITIAL_STATE,
  changeTerm,
  connectMqtt,
  listen,
  closeMqtt,
  addSensor,
  updateSensor,
  selectSensor } from './core';

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
      return updateSensor(state, action.id, action.value);

    case 'SELECT_SENSOR':
      return selectSensor(state, action.id);

    default:
      return state;

  }
};
