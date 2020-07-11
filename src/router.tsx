import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';

export default (): React.ReactElement => (
  <Router>
    <Switch>
      <Route exact path="/">
        {true ? <Redirect to="/login" /> : <Home />}
      </Route>
      <Route path="/home">
        <Home />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
    </Switch>
  </Router>
);
