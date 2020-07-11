/*
 * @文件描述: regex封装
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2019-05-31 10:35:10
 * @LastEditors: 黄建停
 * @LastEditTime: 2020-07-11 14:02:31
 */

export default {
  /**
   * 检验是否是手机号
   */
  isPhone: function (value: string): boolean {
    const reg = /^0?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
    return reg.test(value);
  },

  /**
   * 检验是否是座机
   */
  isLandline: function (value: string): boolean {
    const reg = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/;
    return reg.test(value);
  },

  /**
   * 检验是否是电话
   */
  isTel: function (value: string): boolean {
    return this.isPhone(value) || this.isLandline(value);
  },

  /**
   * 检验是否是邮箱
   */
  isEmail: function (value: string): boolean {
    const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
    return reg.test(value);
  },

  /**
   * 检验是否是数字
   */
  isNumber: function (value: string): boolean {
    const reg = /^[0-9]+.?[0-9]*/;
    return reg.test(value);
  },

  /* 是否是身份证号码 */
  isIdentity: function (value: string): boolean {
    const reg = /^(\d{15,15}|\d{18,18}|\d{17}(\d|X|x))$/;
    return reg.test(value);
  },

  /* 是否是纳税人识别码 */
  isTax: function (value: string): boolean {
    if (!(value.length == 15 || value.length == 18 || value.length == 20)) {
      return false;
    } else {
      const reg = /^[0-9A-Z]$/;
      return reg.test(value);
    }
  },
};
