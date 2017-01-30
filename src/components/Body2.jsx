import React from 'react';

import { connect } from 'react-redux';

import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';

import SensorList2 from './SensorList2';
import Information2 from './Information2';

import { fetchSensors } from '../redux/actions';

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
          title='IoT App'
          showMenuIconButton={ false }
          iconElementRight={
            <RaisedButton
              onTouchTap={ () => {
                this.props.router.push('/');
              } }
              label='Back to menu'
            />
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
  }
);

const mapDispatchToProps = dispatch => (
  {
    fetch: () => {
      dispatch(fetchSensors());
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Body2);
