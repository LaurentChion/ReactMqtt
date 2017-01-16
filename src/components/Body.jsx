import React from 'react';

import { connect } from 'react-redux';

import SensorList from './SensorList';
import Information from './Information';
import TopBar from './TopBar';

import { connectMqttAction } from '../redux/actions';

class Body extends React.Component {
  constructor({ connectTo, params }) {
    super();
    connectTo(params.adresse);
  }

  render() {
    let contents = (
      <div className='AppContainer'>
        <SensorList />
        <Information />
      </div>
    );
    if (this.props.isConnect === 'OFF') {
      contents = 'MQTT is disconnect (Error ?)';
    } else if (this.props.isConnect === 'FETCHING') {
      contents = 'Loading';
    }
    return (
      <div>
        <TopBar />
        {contents}
      </div>
    );
  }
}

Body.propTypes = {
  isConnect: React.PropTypes.string,
};

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
