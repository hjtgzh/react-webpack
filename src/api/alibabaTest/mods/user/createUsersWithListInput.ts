/**
 * @desc Creates list of users with given input array
 */

import { initRequest } from '@/request';
import serverConfig from '../../../../../server.config';

export const init = undefined;

const backEndUrl = serverConfig()['alibabaTest'];

export async function request(data = {}) {
  const request = await initRequest();
  const result: any = await request({
    url: backEndUrl + '/user/createWithList',
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
