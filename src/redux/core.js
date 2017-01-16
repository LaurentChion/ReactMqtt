import { Map, List } from 'immutable';

import { close, listening } from '../api/mqttApi';

export const INITIAL_STATE = Map()
  .set('clientMQTT', {})
  .set('connect', 'OFF')
  .set('sensors', List())
  .set('searchTerm', '')
  .set('information', {
    id: '',
    data: '',
  })
  ;

export const changeTerm = (state, term) => state.set('searchTerm', term);

export const closeMqtt = (state) => {
  // déconnecter le client mqtt et vider le tableau de sensor
  close(state.get('clientMQTT'));
  return INITIAL_STATE;
};

export const listen = state => state.set('clientMQTT', listening(state.get('clientMQTT')));

export const addSensor = (state, sensor) => state.set('sensors', state.get('sensors').push(sensor));

export const selectSensor = (state, id) => {
  const sensor = [];
  state.get('sensors').map(
    (object, i) => {
      if (object.id === id) {
        sensor.id = object.id;
        sensor.data = object.data;
      }
    },
  );
  return state.set('information', sensor);
};

export const updateSensor = (state, id, value) => {
  let nextState = state;

  state.get('sensors').map(
    (object, i) => {
      if (object.id === id) {
        const sensor = state.get('sensors').get(i);
        sensor.data.value = value;
        const nextSensors = state.get('sensors').set(i, sensor);
        nextState = state.set('sensors', nextSensors);
      }
    },
  );
  // mettre a jour la vue information si l'id est le meme
  if (nextState.get('information').id === id) {
    return selectSensor(nextState, id);
  }
  return nextState;
};
