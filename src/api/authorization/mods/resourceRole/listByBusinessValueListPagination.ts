/**
 * @desc 根据业务拓展字段查询角色(带分页)
 */
import * as defs from '../../baseClass';
import { initRequest } from '@/request';
import serverConfig from '../../../../../server.config';

export const init = new defs.authorization.PagingEntity();

const backEndUrl = serverConfig()['authorization'];

export async function request(data = {}) {
  const request = await initRequest();
  const result: any = await request({
    url: backEndUrl + '/role/resource/listByBusinessValueListPagination',
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
