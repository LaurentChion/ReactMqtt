import React from 'react';

import {connect} from 'react-redux';
import {selectAction} from '../redux/actions';

const Sensor = ({id, selectSensor}) => {
  return (
    <div>
      <button onClick={ () => {selectSensor(id)}}>
        {id}
      </button>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectSensor: (id) => {
      dispatch(selectAction(id))
    }
  }
}

export default connect(null, mapDispatchToProps)(Sensor);
