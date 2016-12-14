import React, {Component} from 'react'
import styles from './css/App.css'

import SearchBar from './components/SearchBar'
import SensorList from './components/SensorList'
import Information from './components/Information'

import Sensor from './model/Sensor'

import * as mqttApi from './api/mqttApi';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = ({
      sensors: [],
      information:{
        id: '',
        data: {
          value: '',
        },
      },
    });
    this.initConnection = this.initConnection.bind(this);
    this.addSensor = this.addSensor.bind(this);
    this.updateSensor = this.updateSensor.bind(this);
    this.getInformation = this.getInformation.bind(this);
  }

  initConnection(chemin) {
    mqttApi.initConnection(chemin, this.addSensor, this.updateSensor);
  }

  addSensor(sensor) {
    const copy = this.state.sensors;
    copy.push(sensor);
    this.setState({
      sensors: copy,
    })
  }
  updateSensor(sensor) {
    const copy = this.state.sensors
    for (let i=0; i<copy.length; i++) {
      if(copy[i].id === sensor.id) {
        copy[i].data.value = sensor.value;
        this.setState({
          sensors: copy,
        });
      }
    }
  }

  getInformation(id) {
    const copy = this.state.sensors;
    for (let i=0; i<copy.length; i++) {
      if(copy[i].id === id) {
        this.setState({
          information: copy[i],
        });
      }
    }
  }

  render() {
    return (
      <div className={styles.app}>
        <header><SearchBar
          initConnection={this.initConnection}
          addSensor={this.addSensor}
          updateSensor={this.updateSensor} />
        </header>
        <div className="AppContainer">
          <SensorList sensors={this.state.sensors} getInformation={this.getInformation}/>
          <Information information={this.state.information}/>
        </div>
      </div>
    );
  }
}

export default App
