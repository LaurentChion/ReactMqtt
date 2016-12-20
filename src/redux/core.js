import {Map, List} from 'immutable';

import {initConnection} from '../api/mqttApi'

export const INITIAL_STATE = Map()
  .set('sensors', List())
  .set('searchTerm', List())
  .set('information', {
    id: '',
    data:'',
  })
  .set('test', false)
  ;

export const changeTerm = (state, term) => {
  return state.set('searchTerm', term);
}

export const connectMqtt = (state, address) => {
  initConnection(address);
  return state;
}

export const addSensor = (state, sensor) => {
  return state.set('sensors', state.get('sensors').push(sensor));
}

export const updateSensor = (state, id, value) => {
  // TODO : à implémenter
  let nextState = state;

  state.get('sensors').map(
    (object, i) => {
      if (object.id === id) {
        const sensor = state.get('sensors').get(i);
        sensor.data.value = value;
        const nextSensors = state.get('sensors').set(i, sensor);
        nextState = state.set('sensors', nextSensors);
      }
    }
  );
  // mettre a jour la vue information si l'id est le meme
  if (nextState.get('information').id === id) {
    return selectSensor(nextState, id);
  }
  return nextState;
}

export const selectSensor = (state, id) => {
  let sensor = [];
  state.get('sensors').map(
    (object, i) => {
      if (object.id === id) {
        sensor = object;
      }
    }
  );
  return state.set('information', sensor).set('test', !state.get('test'));
}
