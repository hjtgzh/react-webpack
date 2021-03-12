/**
 * @desc 获取用户已绑定的ResourceRole
 */

import { initRequest } from '@/request';
import serverConfig from '../../../../../server.config';

export const init = [];

const backEndUrl = serverConfig()['authorization'];

export async function request(params = {}) {
  const request = await initRequest();
  const result: any = await request({
    url: backEndUrl + '/role/resource/listByUserId',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    params,
  });
  if (result) {
    if (!result.success) {
      throw new Error(JSON.stringify(result));
    } else {
      return result.data;
    }
  } else {
    throw new Error(JSON.stringify({ message: '接口未响应' }));
  }
}
