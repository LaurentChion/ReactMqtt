import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

/*import { Router, Route, browserHistory } from 'react-router
import SensorList from './components/SensorList'
import Information from './components/Information'*/

const sensors = [];

const mountPoint = document.getElementById('root')

ReactDOM.render(
  <App/>,
  mountPoint
)

/*ReactDOM.render((
  <Router history={browserHistory}>
  <Route path="/" component={ ({children}, {params})=>(<App params={params} children={children} sensors={sensors}/>)} >
      <Route path="/:repoName" component={ ({params}) => ( <SensorList params={params} sensors={sensors}/> )}>
        <Route path="/:repoName/:sensorId" component={Information}/>
      </Route>
    </Route>
  </Router>), mountPoint
*/
