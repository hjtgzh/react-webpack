/*
 * @文件描述: store
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2020-07-14 15:45:41
 * @LastEditors: janko
 * @LastEditTime: 2020-12-28 15:33:29
 */

import { configureStore } from '@reduxjs/toolkit';
import homeReducer from './home';
import jankoReducer from './janko';
import counterReducer from './counter';

export default configureStore({
  reducer: {
    home: homeReducer,
    janko: jankoReducer,
    counter: counterReducer,
  },
});
