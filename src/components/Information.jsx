import React from 'react'
import styles from '../css/Information.css'

import {connect} from 'react-redux';

const Information = ({id, value}) => {
  return (
    <div className="InformationContainer">
      <h2>Nom : {id}</h2>
      <h3>Valeur : {value}</h3>
      <h3>Historique : en construction </h3>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    id: state.get('information').id,
    value: state.get('information').data.value,
  }
}

export default connect(mapStateToProps, null)(Information)
