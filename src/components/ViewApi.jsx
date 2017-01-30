import React from 'react';

import { withRouter } from 'react-router';

import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};

const ViewApi = ({ router }) => (
  <div>
    <RaisedButton
      onTouchTap={ () => {
        router.push('/sensors');
      } }
      label='Select All Sensor'
      primary={ true }
      style={ style }
    />
    <RaisedButton
      label='Select a sensor'
      primary={ true }
      style={ style }
    />

  </div>
);

export default withRouter(ViewApi);
