import React from 'react';

import { connect } from 'react-redux';
import { selectAction } from '../redux/actions';

const Sensor = ({ id, selectSensor }) => (
  <div>
    <button onClick={ () => { selectSensor(id); } }>
      {id}
    </button>
  </div>
);

Sensor.propTypes = {
  id: React.PropTypes.string,
  selectSensor: React.PropTypes.func,
};

const mapDispatchToProps = dispatch => (
  {
    selectSensor: (id) => {
      dispatch(selectAction(id));
    },
  }
);

export default connect(null, mapDispatchToProps)(Sensor);
