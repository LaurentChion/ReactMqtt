import React from 'react';

import { connect } from 'react-redux';

import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';

import Sensor2 from './Sensor2';

const style = {
  paper: {
    flex: 1,
    margin: '10px',
  },
};

const SensorList2 = ({ sensors }) => (
  <Paper style={ style.paper } zDepth={ 0 } >
    <List >
      <Subheader>Sensors</Subheader>
      <Divider />
      { sensors.map(sensor => <Sensor2 id={ sensor.id } key={ sensor.id } />) }
    </List>
  </Paper>
);

SensorList2.propTypes = {
  sensors: React.PropTypes.object,
}.isRequired;

const mapStateToProps = state => (
  {
    sensors: state.get('sensors'),
  }
);

export default connect(mapStateToProps, null)(SensorList2);
