/**
 * @desc uploads an image
 */
import * as defs from '../../baseClass';
import { initRequest } from '@/request';
import serverConfig from '../../../../../server.config';

export const init = new defs.alibabaTest.ApiResponse();

const backEndUrl = serverConfig()['alibabaTest'];

export async function request(params = {}) {
  const request = await initRequest();
  const result: any = await request({
    url: backEndUrl + '/pet/{petId}/uploadImage',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
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
