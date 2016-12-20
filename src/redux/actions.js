export const changeTermAction = (term) => {
  return {
    type: 'CHANGE_TERM',
    term: term,
  }
}

export const connectMqtt = (address) => {
  return {
    type: 'CONNECT_MQTT',
    address: address,
  }
}

export const addAction = (s) => {
  return {
    type: 'ADD_SENSOR',
    sensor: s,
  }
}

export const updateAction = (id, value) => {
  return {
    type: 'UPDATE_SENSOR',
    id,
    value,
  }
}

export const selectAction = (id) => {
  return {
    type: 'SELECT_SENSOR',
    id,
  }
}
