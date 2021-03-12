/*
 * @文件描述:
 * @公司: cloudwise
 * @作者: janko
 * @Date: 2020-11-09 15:03:36
 * @LastEditors: janko
 * @LastEditTime: 2021-02-23 18:28:23
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '@/stores';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import './api';
// dayjs中文包
import 'dayjs/locale/zh-cn';
import Routes from './router';

import './style.less';

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider locale={zh_CN}>
      <Routes />
    </ConfigProvider>
  </Provider>,
  document.getElementById('root'),
);
