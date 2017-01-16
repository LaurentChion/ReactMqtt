import React from 'react';

import { connect } from 'react-redux';

import { withRouter } from 'react-router';

import styles from '../css/SearchBar.css';

import { changeTermAction, connectMqttAction } from '../redux/actions';

const SearchBar = ({ term, changeInput, handleEnterPress, router }) => (
  <div className='SearchBarContainer'>
    <h3>URL du Brocker:</h3>
    <input
      onChange={
        (event) => {
          changeInput(event.target.value);
        }
      }
      onKeyPress={
        (event) => {
          if (event.key === 'Enter') {
            // verifier si le chemin est bon
            router.push(`/${term}`);
            handleEnterPress(term);
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
};

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
    handleEnterPress: (term) => {
      dispatch(connectMqttAction(term));
    },
  }
);


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchBar));
