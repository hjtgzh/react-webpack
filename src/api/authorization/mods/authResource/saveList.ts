/**
 * @desc 批量添加资源
 */

import { initRequest } from '@/request';
import serverConfig from '../../../../../server.config';

export const init = undefined;

const backEndUrl = serverConfig()['authorization'];

export async function request(data = {}) {
  const request = await initRequest();
  const result: any = await request({
    url: backEndUrl + '/auth/resource/saveList',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
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
