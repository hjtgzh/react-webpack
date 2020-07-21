/*
 * @文件描述: 路由
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2020-07-09 16:01:50
 * @LastEditors: 黄建停
 * @LastEditTime: 2020-07-20 16:56:30
 */

import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import LazyLoad from '@/components/LazyLoad';

const Home = LazyLoad(() => import('./pages/home'));
const Login = LazyLoad(() => import('./pages/login'));

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
