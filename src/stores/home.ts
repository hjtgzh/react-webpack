/*
 * @文件描述: home
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2020-07-14 16:07:59
 * @LastEditors: 黄建停
 * @LastEditTime: 2020-07-14 18:01:16
 */
import { createSlice } from '@reduxjs/toolkit';
import { fetchData } from '@/utils/request';
import { BACKEND_URL } from '@/common';
import { defaultListData } from './defaultData';

/* homeSlice 创建一个slice，包含 createReducer、createAction的所有功能 */
const homeSlice = createSlice({
  name: 'home',
  initialState: {
    homeTableData: {
      list: [],
      total: 0,
      page: 1,
    },
  },
  reducers: {
    getTableData: (state, action) => {
      state.homeTableData = action.payload;
    },
  },
});

/* action 创建一个action，传入动作类型字符串，返回动作函数 */
const { getTableData } = homeSlice.actions;

/* 发送异步请求 dispatch action */
export const getHomeTableData = (params?: any) => async (dispatch) => {
  const result = await fetchData(
    {
      url: `${BACKEND_URL}/service/customer/listByPage`,
      initialData: defaultListData,
    },
    params,
    'json',
  );
  dispatch(getTableData(result));
};

/* reducer 创建一个reducer，action type 映射到 case reducer 函数中，不用写switch-case，并集成immer */
export default homeSlice.reducer;
