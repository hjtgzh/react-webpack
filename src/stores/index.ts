/*
 * @文件描述: store
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2020-07-14 15:45:41
 * @LastEditors: 黄建停
 * @LastEditTime: 2020-07-14 16:09:12
 */

import { configureStore } from '@reduxjs/toolkit';
import homeReducer from './home';
import counterReducer from './counter';

export default configureStore({
  reducer: {
    home: homeReducer,
    counter: counterReducer,
  },
});
