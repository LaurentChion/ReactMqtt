import React from 'react';

import { connect } from 'react-redux';

import { ListItem } from 'material-ui/List';

import { fetchSensor } from '../redux/actions';

const Sensor2 = ({ id, selectSensor }) => (
  <ListItem
    onClick={ () => { selectSensor(id); } }
  >
    { id }
  </ListItem>
);

Sensor2.propTypes = {
  id: React.PropTypes.string,
  selectSensor: React.PropTypes.func,
}.isRequired;

const mapDispatchToProps = dispatch => (
  {
    selectSensor: (id) => {
      dispatch(fetchSensor(id));
    },
  }
);

export default connect(null, mapDispatchToProps)(Sensor2);
