import React from 'react';

import { connect } from 'react-redux';

import CircularProgress from 'material-ui/CircularProgress';

import SensorList from './SensorList';
import TopBar from './TopBar';
import Information from './Information';

import { connectMqttAction } from '../redux/actions';

const style = {
  div: {
    display: 'flex',
    flex: 1,
    height: '85vh', // faire le calcul
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
};

class Body extends React.Component {
  constructor({ connectTo, params }) {
    super();
    connectTo(params.adresse);
  }

  render() {
    let contents = (
      <div style={ style.div }>
        <SensorList />
        <Information />
      </div>
    );
    if (this.props.isConnect === 'OFF') {
      contents = 'MQTT is disconnect (Error ?)';
    } else if (this.props.isConnect === 'FETCHING') {
      contents = (
        <div style={ style.divLoading }>
          <CircularProgress size={ 150 } thickness={ 10 } />
        </div>
      );
    }
    return (
      <div>
        <TopBar />
        <div>
          { contents }
        </div>
      </div>
    );
  }
}

Body.propTypes = {
  isConnect: React.PropTypes.string,
}.isRequired;

const mapStateToProps = state => (
  {
    isConnect: state.get('connect'),
  }
);

const mapDispatchToProps = dispatch => (
  {
    connectTo: (term) => {
      dispatch(connectMqttAction(term));
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Body);
