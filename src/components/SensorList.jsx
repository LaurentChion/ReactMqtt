import React, {Component} from 'react'
import styles from '../css/SensorList.css'

import Sensor from './Sensor'
import Home from './Home'

class SensorList extends React.Component{
  render() {
    let rows = [];
    for (var i=0; i < this.props.sensors.length; i++) {
      const id = this.props.sensors[i].id;
      rows.push(<Sensor id={id} getInformation={this.props.getInformation} key={i}/>);
    }

    return (
      <div className="SensorListContainer">
        <h2>Sensors</h2>
          {/* Afficher la liste de sensors*/}
          {rows}
      </div>
    );
  }
}

export default SensorList
