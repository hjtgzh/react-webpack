/*
 * @文件描述: 加载组件
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2019-05-31 10:35:10
 * @LastEditors: 黄建停
 * @LastEditTime: 2020-07-20 09:59:19
 */

import * as React from 'react';
import { Spin } from 'antd';

export default function Loading() {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Spin size="large" />
    </div>
  );
}
