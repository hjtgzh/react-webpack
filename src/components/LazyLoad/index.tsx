/*
 * @文件描述: 懒加载组件
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2020-07-20 16:54:41
 * @LastEditors: 黄建停
 * @LastEditTime: 2020-07-20 16:55:36
 */

import Loadable from 'react-loadable';
import Loading from '@/components/Loading';

export default (loader) =>
  Loadable({
    loader,
    loading: Loading,
  });
