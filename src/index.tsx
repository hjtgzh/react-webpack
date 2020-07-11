import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
// dayjs中文包
import 'dayjs/locale/zh-cn';
import Routes from './router';

ReactDOM.render(
  <ConfigProvider locale={zh_CN}>
    <Routes />
  </ConfigProvider>,
  document.getElementById('root'),
);
