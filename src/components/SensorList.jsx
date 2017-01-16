import React from 'react';

import { connect } from 'react-redux';

import styles from '../css/SensorList.css';

import Sensor from './Sensor';


const SensorList = ({ sensors }) => (
  <div className='SensorListContainer'>
    <h2>Sensors</h2>
    {sensors.map(object => (<Sensor id={ object.id } key={ object.id } />)) }
  </div>
);

SensorList.propTypes = {
  sensors: React.PropTypes.object,
};

const mapStateToProps = state => (
  {
    sensors: state.get('sensors'),
  }
);

export default connect(mapStateToProps, null)(SensorList)
