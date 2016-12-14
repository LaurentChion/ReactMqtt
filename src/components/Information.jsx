import React, {Component} from 'react'
import styles from '../css/Information.css'

class Information extends React.Component{

  render() {
    return (
      <div className="InformationContainer">
        <h2>{this.props.information.id}</h2>
        <h3>Valeur : {this.props.information.data.value}</h3>
        <h3>Historique : en construction </h3>
      </div>
    );
  }
}

export default Information
