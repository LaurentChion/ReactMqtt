import React from 'react';

import { connect } from 'react-redux';

import { Link } from 'react-router';

import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import { closeMqttAction, subscribeAction } from '../redux/actions';

const TopBar = ({ back, subscribe }) => (

  <AppBar
    title='IoT App'
    showMenuIconButton={ false }
    iconElementRight={
      <IconMenu
        iconButtonElement={ <IconButton><MoreVertIcon /></IconButton> }

        targetOrigin={ { horizontal: 'right', vertical: 'top' } }
        anchorOrigin={ { horizontal: 'right', vertical: 'top' } }
      >
        <MenuItem primaryText='Subscribe' onClick={ () => { subscribe(); } } />
        <Link style={ { textDecoration: 'none' } } to='/'>
          <MenuItem primaryText='Disconnect' onClick={ () => { back(); } } />
        </Link>
      </IconMenu>
    }
  />
);

TopBar.PropTypes = {
  back: React.PropTypes.func,
  subscribe: React.PropTypes.func,
}.isRequired;

const mapDispatchToProps = dispatch => (
  {
    back: () => {
      dispatch(closeMqttAction());
    },
    subscribe: () => {
      dispatch(subscribeAction());
    },
  }
);


export default connect(null, mapDispatchToProps)(TopBar);
