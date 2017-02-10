import React from 'react';

import { connect } from 'react-redux';

import { ListItem } from 'material-ui/List';

import { fetchSensor } from '../redux/actions';

const Sensor2 = ({ id, selectSensor, date, time, period }) => (
  <ListItem
    onClick={ () => { selectSensor(id, date, time, period); } }
  >
    { id }
  </ListItem>
);

Sensor2.propTypes = {
  id: React.PropTypes.string,
  selectSensor: React.PropTypes.func,
}.isRequired;

const mapStateToProps = state => (
  {
    date: state.get('date'),
    time: state.get('time'),
    period: state.get('period'),
  }
);

const mapDispatchToProps = dispatch => (
  {
    selectSensor: (id, date, time, period) => {
      const concat = new Date(date);
      concat.setTime(time);
      dispatch(fetchSensor(id, concat.toISOString(), period));
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Sensor2);
