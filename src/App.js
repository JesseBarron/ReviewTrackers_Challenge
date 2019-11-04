import React from 'react';
import {
  Router,
  Switch,
  Route,
} from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Main from './main';
import Home from './views/Home';
import Review from './views/Review';

import './App.css';

const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Main>
        <Switch>
          <Route exact path="/" component={Home}/> 
          <Route path="/review/:reviewId" component={Review}/>
        </Switch>
      </Main>
    </Router>
  );
}

export default App;
