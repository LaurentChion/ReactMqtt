import React from 'react';

import { Tabs, Tab } from 'material-ui/Tabs';
import WebIcon from 'material-ui/svg-icons/action/language';
import BddIcon from 'material-ui/svg-icons/device/storage';

import SwipeableViews from 'react-swipeable-views';

import SearchBar from './components/SearchBar';
import ViewApi from './components/ViewApi';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
  }

  render() {
    return (
      <div>
        <Tabs
          value={ this.state.slideIndex }
          onChange={ value => this.setState({
            slideIndex: value,
          }) }
        >
          <Tab
            label='Live'
            icon={ <WebIcon /> }
            value={ 0 }
          />
          <Tab
            label='API'
            icon={ <BddIcon /> }
            value={ 1 }
          />
        </Tabs>
        <SwipeableViews
          index={ this.state.slideIndex }
          onChangeIndex={ this.handleChange }
        >
          <div style={ styles.slide }>
            <SearchBar />
          </div>
          <div style={ styles.slide }>
            <div>
              <ViewApi />
            </div>
          </div>
        </SwipeableViews>
      </div>
    );
  }
}

export default App;
