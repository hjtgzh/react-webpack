/*
 * @文件描述: date处理方法
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2020-07-11 13:58:27
 * @LastEditors: 黄建停
 * @LastEditTime: 2020-07-11 15:20:28
 */

import dayjs from 'dayjs';
export const DATE_FORMAT_DAY_WITHOUT_HYPHEN = 'YYYYMMDD';
export const DATE_FORMAT_DAY_WITH_HYPHEN = 'YYYY-MM-DD';
export const DATE_FORMAT_WITH_SECONDS = 'YYYY-MM-DD HH:mm:ss';
export const DAY_FORMAT_WITH_SECONDS = 'HH:mm:ss';
export const DATE_FORMAT_MONTH_CN = 'YYYY年MM月';
export const DATE_FORMAT_MONTH_WITH_HYPHEN = 'YYYY-MM';
export const DATE_FORMAT_DAY_CN = 'YYYY年MM月DD日';

export const formatDate = (
  date: number | string | Date,
  format?: string,
): string => {
  return dayjs(date).format(format || DATE_FORMAT_DAY_WITH_HYPHEN);
};
