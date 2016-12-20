import {INITIAL_STATE, changeTerm, connectMqtt, addSensor, updateSensor, selectSensor} from './core.js'

export const reducer = (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case 'CHANGE_TERM' :
      return changeTerm(state, action.term);
      break;
    case 'CONNECT_MQTT' :
      return connectMqtt(state, action.address);
      break;
    case 'ADD_SENSOR':
      return addSensor(state, action.sensor);
      break;
    case 'UPDATE_SENSOR':
      return updateSensor(state, action.id, action.value);
      break;
    case 'SELECT_SENSOR':
      return selectSensor(state, action.id);
      break;

    default:
      return state;

  }
}
