/*
 * @文件描述: 根据pont-config.json文件获取到对应的后端请求地址
 * @公司: cloudwise
 * @作者: janko
 * @Date: 2021-02-23 15:00:40
 * @LastEditors: janko
 * @LastEditTime: 2021-02-23 16:34:37
 */
import pontConfig from './pont-config.json';

export default function () {
  const result: { [key: string]: string } = {};
  pontConfig.origins.forEach((origin) => {
    const { name, originUrl } = origin;
    result[name] = originUrl.replace(/\/v[0-9]{1,}\/api-docs/, '');
  });
  return result;
}
