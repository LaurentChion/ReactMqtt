import React from 'react';

import { connect } from 'react-redux';

import CircularProgress from 'material-ui/CircularProgress';
import MenuItem from 'material-ui/MenuItem';

import AppBar from 'material-ui/AppBar';

import SelectField from 'material-ui/SelectField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';

import SensorList2 from './SensorList2';
import Information2 from './Information2';

import {
  fetchSensors,
  changeDateAction,
  changePeriodAction,
  changeTimeAction } from '../redux/actions';

const style = {
  div: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    align: 'center',
  },
  divLoading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    align: 'center',
    height: '85vh', // faire le calcul
  },
  menu: {
    display: 'flex',
    flexDirection: 'row',
  },
  element: {
    flex: 1,
  },
};

class Body2 extends React.Component {
  constructor({ fetch }) {
    super();
    fetch();
  }

  render() {
    let showInformation = <Information2 />;

    if (this.props.fetchingSensor === true) {
      showInformation = (
        <div style={ style.divLoading }>
          <CircularProgress size={ 50 } thickness={ 5 } />
        </div>
      );
    }

    let contents = (
      <div style={ style.div }>
        <SensorList2 />
        { showInformation }
      </div>
    );
    if (this.props.fetching === true) {
      contents = (
        <div style={ style.divLoading }>
          <CircularProgress size={ 150 } thickness={ 10 } />
        </div>
      );
    }
    return (
      <div>
        <AppBar
          iconElementLeft={
            <div style={ style.menu }>
              <DatePicker
                style={ style.element }
                floatingLabelText='Min Date'
                hintText='Date'
                value={ this.props.date }
                onChange={ (event, newDate) => {
                  this.props.changeDate(newDate);
                } }
              />
              <TimePicker
                style={ style.element }
                format='24hr'
                floatingLabelText='Time'
                hintText='Time'
                value={ this.props.time }
                onChange={ (event, time) => {
                  this.props.changeTime(time);
                } }
              />
              <SelectField
                style={ style.element }
                floatingLabelText='Period'
                value={ this.props.period }
                onChange={ (event, index, value) => this.props.changePeriod(value) }
                >
                  <MenuItem value={ 'now' } primaryText='Till Now' />
                  <MenuItem value={ 'hour' } primaryText='An Hour' />
                  <MenuItem value={ 'day' } primaryText='A Day' />
                  <MenuItem value={ 'week' } primaryText='A Week' />
                </SelectField>
            </div>
          }
        />
        <div>
          { contents }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    fetching: state.get('fetching'),
    fetchSensor: state.get('fetchingSensor'),
    date: state.get('date'),
    period: state.get('period'),
    time: state.get('time'),
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetch: () => {
      dispatch(fetchSensors());
    },
    changeDate: (date) => {
      dispatch(changeDateAction(date));
    },
    changePeriod: (period) => {
      dispatch(changePeriodAction(period));
    },
    changeTime: (time) => {
      dispatch(changeTimeAction(time));
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Body2);
