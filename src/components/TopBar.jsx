import React from 'react';

import { connect } from 'react-redux';

import { Link } from 'react-router';

import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';

import { closeMqttAction } from '../redux/actions';

const TopBar = ({ back }) => (

  <AppBar
    title='IoT App'
    showMenuIconButton={ false }
    iconElementRight={
      <Link style={ { textDecoration: 'none' } } to='/'>
        <RaisedButton
          onTouchTap={ () => { back(); } }
          label='Disconnect'
        />
      </Link>
    }
  />
);

TopBar.PropTypes = {
  back: React.PropTypes.func,
}.isRequired;

const mapDispatchToProps = dispatch => (
  {
    back: () => {
      dispatch(closeMqttAction());
    },
  }
);


export default connect(null, mapDispatchToProps)(TopBar);
