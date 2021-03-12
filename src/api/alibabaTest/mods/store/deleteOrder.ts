/**
     * @desc Delete purchase order by ID
For valid response try integer IDs with positive integer value. Negative or non-integer values will generate API errors
     */

import { initRequest } from '@/request';
import serverConfig from '../../../../../server.config';

export const init = undefined;

const backEndUrl = serverConfig()['alibabaTest'];

export async function request(params = {}) {
  const request = await initRequest();
  const result: any = await request({
    url: backEndUrl + '/store/order/{orderId}',
    method: 'DELETE',
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
