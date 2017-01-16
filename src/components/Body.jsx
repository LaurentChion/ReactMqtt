import React from 'react';

import { connect } from 'react-redux';

import SensorList from './SensorList';
import Information from './Information';
import TopBar from './TopBar';


const Body = ({ isConnect }) => {
  let contents = (
    <div className='AppContainer'>
      <SensorList />
      <Information />
    </div>
  );
  if (isConnect !== 'ON') {
    contents = 'Loading';
  }
  return (
    <div>
      <TopBar />
      {contents}
    </div>
  );
};

Body.propTypes = {
  isConnect: React.PropTypes.string,
};

const mapStateToProps = state => (
  {
    isConnect: state.get('connect'),
  }
);

export default connect(mapStateToProps, null)(Body);
