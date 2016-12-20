import React from 'react'
import styles from '../css/SensorList.css'

import Sensor from './Sensor'

import {connect} from 'react-redux';

const SensorList = ({sensors}) => {
  return (
    <div className="SensorListContainer">
      <h2>Sensors</h2>
        {
          sensors.map(function(object, i) {
            return (<Sensor id={object.id} key={i} />);
          }
        )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    sensors: state.get('sensors'),
  }
}

export default connect(mapStateToProps, null)(SensorList)
