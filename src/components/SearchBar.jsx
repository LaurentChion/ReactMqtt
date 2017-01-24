import React from 'react';

import { connect } from 'react-redux';

import { withRouter } from 'react-router';

import TextField from 'material-ui/TextField';

import { changeTermAction } from '../redux/actions';

import iot from '../img/iot.jpg';

const style = {
  div: {
    background: `url(${iot}) center`,
    backgroundSize: 'cover',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    align: 'center',
    height: '100vh',
  },
  field: {
    margin: '50px 20px',
    flex: 1,
    maxWidth: '398px',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  hint: {
    color: '#bbbbbb',
  },
  input: {
    color: '#dddddd',
  },
};

const SearchBar = ({ term, changeInput, router }) => (
  <div style={ style.div }>
    <TextField
      style={ style.field }
      hintStyle={ style.hint }
      inputStyle={ style.input }
      hintText='URL du Brocker'
      onChange={
        (event) => {
          changeInput(event.target.value);
        }
      }
      onKeyPress={
        (event) => {
          if (event.key === 'Enter') {
            // aller à la page pour ce connecter
            router.push(`/${term}`);
          }
        }
      }
    />
  </div>
);

SearchBar.propTypes = {
  term: React.PropTypes.string,
  changeInput: React.PropTypes.func,
  handleEnterPress: React.PropTypes.func,
  router: React.PropTypes.object,
}.isRequired;

const mapStateToProps = state => (
  {
    term: state.get('searchTerm'),
  }
);

const mapDispatchToProps = dispatch => (
  {
    changeInput: (term) => {
      dispatch(changeTermAction(term));
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchBar));
