/*
 * @文件描述: 路由
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2020-07-09 16:01:50
 * @LastEditors: janko
 * @LastEditTime: 2020-12-09 15:57:10
 */

import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import CLayout from './layout';
import LazyLoad from '@/components/LazyLoad';

const Home = LazyLoad(() => import('./pages/home'));
const Login = LazyLoad(() => import('./pages/login'));

export default (): React.ReactElement => (
  <Router>
    <Switch>
      <Route exact path="/">
        {true ? <Home /> : <Redirect to="/login" />}
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <CLayout />
    </Switch>
  </Router>
);
