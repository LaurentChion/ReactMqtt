import React from 'react'

import styles from '../css/SearchBar.css'

import {connect} from 'react-redux';
import {changeTermAction, connectMqtt} from '../redux/actions';

const SearchBar = ({term, changeInput, handleEnterPress}) => {
  return (
    <div className="SearchBarContainer">
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
              handleEnterPress(term)
            }
          }
        }
        />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    term: state.get('searchTerm'),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeInput: (term) => {
      dispatch(changeTermAction(term))
    },
    handleEnterPress: (term) => {
      dispatch(connectMqtt(term))
    },
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
