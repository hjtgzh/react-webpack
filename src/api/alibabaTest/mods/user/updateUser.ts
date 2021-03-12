/**
     * @desc Updated user
This can only be done by the logged in user.
     */

import { initRequest } from '@/request';
import serverConfig from '../../../../../server.config';

export const init = undefined;

const backEndUrl = serverConfig()['alibabaTest'];

export async function request(data = {}, params = {}) {
  const request = await initRequest();
  const result: any = await request({
    url: backEndUrl + '/user/{username}',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
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
