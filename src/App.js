import React from 'react';
import styles from './css/App.css';

import SearchBar from './components/SearchBar';

const App = () => (
  <div className={ styles.app }>
    <header>
      <SearchBar />
    </header>
  </div>
);

export default App;
