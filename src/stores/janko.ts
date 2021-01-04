/*
 * @文件描述: jankostore数据
 * @公司: cloudwise
 * @作者: janko
 * @Date: 2020-12-28 15:26:12
 * @LastEditors: janko
 * @LastEditTime: 2020-12-28 16:10:31
 */
import { createSlice } from '@reduxjs/toolkit';
import { fetchData, jsonp } from '@/utils/request';
import { GAODE_BACKEND_URL } from '@/common';

/* jankoSlice 创建一个slice，包含 createReducer、createAction的所有功能 */
const jankoSlice = createSlice({
  name: 'home',
  initialState: {
    districtsList: [],
  },
  reducers: {
    getDistrictsList: (state, action) => {
      state.districtsList = action.payload;
    },
  },
});

/* action 创建一个action，传入动作类型字符串，返回动作函数 */
const { getDistrictsList } = jankoSlice.actions;

/* 发送异步请求 dispatch action */
export const getJankoDistrictsList = (params?: any) => async (dispatch) => {
  const result: any = await jsonp(
    `${GAODE_BACKEND_URL}/v3/config/district`,
    params,
  );
  // console.log('result', result);
  if (result) {
    dispatch(getDistrictsList(result.districts));
  }
};

/* reducer 创建一个reducer，action type 映射到 case reducer 函数中，不用写switch-case，并集成immer */
export default jankoSlice.reducer;
