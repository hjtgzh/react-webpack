/*
 * @文件描述: 路由
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2020-07-09 16:01:50
 * @LastEditors: janko
 * @LastEditTime: 2020-12-24 15:57:13
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

const Login = LazyLoad(() => import('./pages/login'));

export default (): React.ReactElement => (
  <Router>
    <Switch>
      <Route exact path="/">
        {true ? <Redirect to="/home" /> : <Redirect to="/login" />}
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <CLayout />
    </Switch>
  </Router>
);
