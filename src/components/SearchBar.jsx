import React, {Component} from 'react'

import styles from '../css/SearchBar.css'

class SearchBar extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      searchTerm: event.target.value,
    });
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      // faire la connexion au serveur mqtt
      this.props.initConnection(this.state.searchTerm);
    }
  }

  render() {
    return (
      <div className="SearchBarContainer">
        <h3>URL du Brocker:</h3>
        <input
          onChange={this.handleInputChange}
          onKeyPress={this.handleKeyPress}
          />
      </div>
    );
  }
}

export default SearchBar
