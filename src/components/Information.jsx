import React from 'react';

import { connect } from 'react-redux';

import TempHistory from './TempHistory';

const style = {
  paper: {
    flex: 2,
  },
};

const Information = ({ id, type, value }) => {

  let history;
  switch (type) {
    case 'POSITIVE_NUMBER' :
      history = <TempHistory />;
      break;
    default :
      history = <p>Pas de vues disponible pour ce type de sensors.</p>;
  }

  return (
    <div style={ style.paper } >
      <h2>Nom : { id }</h2>
      <h3>Type : { type }</h3>
      <h3>Valeur : { value }</h3>
      { history }
    </div>
  );
};

const mapStateToProps = state => (
  {
    id: state.get('information').id,
    type: state.get('information').type,
    value: state.get('information').data,
  }
);

Information.propTypes = {
  id: React.PropTypes.string,
  type: React.PropTypes.string,
  value: React.PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, null)(Information);
