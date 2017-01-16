import React from 'react';
import styles from '../css/TopBar.css'

import {connect} from 'react-redux';
import {closeMqttAction, subscribeAction} from '../redux/actions';

import {Link} from 'react-router';

const TopBar = ({back, subscribe}) => {
  return (
    <div className="TopBar">
        <button onClick={ () => {subscribe()}} >
          Subscribe
        </button>
      <Link to="/">
        <button onClick={ () => {back()}} >
          Retour
        </button>
      </Link>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    back: () => {
      dispatch(closeMqttAction())
    },
    subscribe: () => {
      dispatch(subscribeAction())
    }
  }
}

export default connect(null, mapDispatchToProps)(TopBar);
