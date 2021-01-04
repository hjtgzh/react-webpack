/*
 * @文件描述: 公共模块
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2020-07-11 14:20:20
 * @LastEditors: janko
 * @LastEditTime: 2020-12-28 15:37:25
 */

export const PAGE = 1;
export const PAGE_SIZE = 10;
export const TOTAL = 0;

// 接口请求地址
export const BACKEND_URL = process.env.MOCK ? '' : '正式地址'; // mock地址/正式地址

// 高德地图接口地址
export const GAODE_BACKEND_URL = 'https://restapi.amap.com'; // mock地址/正式地址
