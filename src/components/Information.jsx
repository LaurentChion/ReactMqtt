import React from 'react';
import { connect } from 'react-redux';

import styles from '../css/Information.css';

const Information = ({ id, value }) => (
  <div className='InformationContainer'>
    <h2>Nom : { id }</h2>
    <h3>Valeur : { value }</h3>
    <h3>Historique : en construction </h3>
  </div>
);

const mapStateToProps = state => (
  {
    id: state.get('information').id,
    value: state.get('information').data.value,
  }
);

Information.propTypes = {
  id: React.PropTypes.string,
  value: React.PropTypes.string,
};

export default connect(mapStateToProps, null)(Information)
