import React from 'react';

import { connect } from 'react-redux';

import { withRouter } from 'react-router';

import styles from '../css/SearchBar.css';

import { changeTermAction } from '../redux/actions';

const SearchBar = ({ term, changeInput, router }) => (
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
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchBar));
