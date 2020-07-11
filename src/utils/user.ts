/*
 * @文件描述: 用户操作封装
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2020-07-11 13:58:27
 * @LastEditors: 黄建停
 * @LastEditTime: 2020-07-11 14:19:10
 */

import lscache from 'lscache';

/**
 * 保存和操作用户登录信息
 * @class User
 */
class User {
  /**
   * 保存token 到cookie中
   * @param accessToken
   */
  saveToken(accessToken: string) {
    lscache.set('accessToken', accessToken);
  }

  /**
   * 保存登录接口返回的姓名和手机号
   * @param name
   * @param phone
   */
  saveUserInfo(userInfo: any) {
    lscache.set('userInfo', userInfo);
  }

  /**
   * 从cookie中获取姓名
   */
  getUserInfo() {
    return lscache.get('userInfo') || {};
  }

  /**
   * 判断用户是否登录
   *
   * @memberof User
   */
  isLogin() {
    return !!lscache.get('accessToken');
  }

  /** 获取token */
  getToken() {
    return lscache.get('accessToken');
  }
  /**
   * 用户退出登录
   *
   * @memberof User
   */
  logout() {
    lscache.remove('accessToken');
    lscache.remove('userInfo');
  }
}
export default new User();
