import { Map, List } from 'immutable';

import { close, listening } from '../api/mqttApi';

export const INITIAL_STATE = Map()
  .set('clientMQTT', {})
  .set('connect', 'OFF')
  .set('sensors', List())
  .set('searchTerm', '')
  .set('information', {
    id: '',
    type: '',
    data: '',
    history: List(),
  })
  .set('fetching', false)
  .set('fetchingSensor', false)
  .set('date', '')
  .set('time', '')
  .set('period', 'now')
  ;

export const changeTerm = (state, term) => state.set('searchTerm', term);

export const closeMqtt = (state) => {
  // déconnecter le client mqtt et vider le tableau de sensor
  close(state.get('clientMQTT'));
  return INITIAL_STATE;
};

export const listen = state => state.set('clientMQTT', listening(state.get('clientMQTT')));

export const addSensor = (state, sensor) => {
  const newSensor = {
    id: sensor.id,
    type: sensor.type,
    data: sensor.data.value,
    history: List(),
  };

  return state.set('sensors', state.get('sensors').push(newSensor));
};

// FIXME: pourquoi obligé de repassé à {} ?
export const selectSensor = (state, id) => (
  state.set('information', {})
  .set('information', state.get('sensors').find(s => (s.id === id)))
);

export const updateSensor = (state, id, data) => {
  const sensors = state.get('sensors');
  const sensor = sensors.find(s => (s.id === id));

  sensor.history = sensor.history.push({
    data: sensor.data,
    date: new Date(),
  });
  sensor.data = data.value;
  const index = sensor.history.count();
  if (index >= 10) {
    sensor.history = sensor.history.slice(-10);
  }

  const nextSensors = state.get('sensors').set(sensors.findKey(s => (s.id === id)), sensor);
  const nextState = state.set('sensors', nextSensors);

  // mettre a jour la vue information si l'id est le meme
  if (nextState.get('information').id === id) {
    return selectSensor(nextState, id);
  }
  return nextState;
};

// FIXME: gérer le JSON et l'ajouté à la liste de sensor
export const fetchSensorsBdd = (state, sensors) => {
  const data = List(sensors.data);
  let nextSensor = List();

  data.map(
    (object) => {
      nextSensor = nextSensor.push({
        id: object._id,
        type: object.type,
      });
    },
  );

  return state.set('fetching', false).set('sensors', new List(nextSensor));
};

export const fetchSensorBdd = (state, id, result) => {
  const data = List(result.data);
  let nextHistory = List();

  data.map(
    (object) => {
      nextHistory = nextHistory.push({
        date: new Date(object.date),
        data: object.value,
      });
    },
  );

  const sensor = state.get('sensors').find(obj => obj.id === id);

  const nextInformation = {
    id,
    type: sensor.type,
    data: sensor.data,
    history: nextHistory,
  };

  return state.set('fetchingSensor', false).set('information', {}).set('information', nextInformation);
};
