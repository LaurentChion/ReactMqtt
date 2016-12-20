import React from 'react'
import styles from './css/App.css'

import SearchBar from './components/SearchBar'
import SensorList from './components/SensorList'
import Information from './components/Information'

const App = () => {
  return (
    <div className={styles.app}>
      <header>
        <SearchBar />
      </header>
      <div className="AppContainer">
        <SensorList/>
        <Information/>
      </div>
    </div>
  );
}

export default App;
