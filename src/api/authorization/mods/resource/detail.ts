/**
 * @desc 查询ResourceDetails
 */
import * as defs from '../../baseClass';
import { initRequest } from '@/request';
import serverConfig from '../../../../../server.config';

export const init = new defs.authorization.ResourceDetails();

const backEndUrl = serverConfig()['authorization'];

export async function request(params = {}) {
  const request = await initRequest();
  const result: any = await request({
    url: backEndUrl + '/resource/detail',
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
