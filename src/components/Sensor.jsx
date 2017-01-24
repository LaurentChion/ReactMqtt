import React from 'react';

import { connect } from 'react-redux';
/* //TODO : router vers information (:/sensor)
import { Link } from 'react-router';*/
import { ListItem } from 'material-ui/List';

import { selectAction } from '../redux/actions';

const Sensor = ({ id, selectSensor }) => (
  <ListItem
    onClick={ () => { selectSensor(id); } }
  >
    { id }
  </ListItem>
);

Sensor.propTypes = {
  id: React.PropTypes.string,
  selectSensor: React.PropTypes.func,
}.isRequired;

const mapDispatchToProps = dispatch => (
  {
    selectSensor: (id) => {
      dispatch(selectAction(id));
    },
  }
);

export default connect(null, mapDispatchToProps)(Sensor);
