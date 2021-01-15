/*
 * @文件描述: 路由
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2020-07-09 16:01:50
 * @LastEditors: janko
 * @LastEditTime: 2021-01-11 14:21:52
 */

import React from 'react';
import {
  HashRouter as Router,
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
