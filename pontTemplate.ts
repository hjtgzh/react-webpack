/*
 * @文件描述: pont模版文件（pont精华）
 * @公司: cloudwise
 * @作者: janko
 * @Date: 2021-02-22 09:32:42
 * @LastEditors: janko
 * @LastEditTime: 2021-02-25 14:58:56
 */
import { Interface, BaseClass, Property, CodeGenerator } from 'pont-engine';

export default class MyGenerator extends CodeGenerator {
  // inter是这个请求的详细参数对象，我们要使用的 params,method,response 都在其中
  // 模版生成定义部分，用于生成请求方法定义文件：api.d.ts
  getInterfaceContentInDeclaration(inter: Interface) {
    // const requestParams = inter.getRequestParams();
    // 获取接口定义的请求参数，即是url中的query部分，一般get请求是必须的，post请求看情况。
    const paramsCode = inter.getParamsCode('Params');
    // post请求的body参数，需要用inter.getBodyParamsCode()获取
    const bodyParamsCode = inter.getBodyParamsCode();
    // 判断是否有params参数
    const hasGetParams = !!inter.parameters.filter(
      (param) => param.in !== 'body',
    ).length;
    let requestParams = bodyParamsCode
      ? `bodyParams: ${bodyParamsCode}, params: Params`
      : `params: Params`;

    if (!hasGetParams) {
      requestParams = bodyParamsCode ? `bodyParams: ${bodyParamsCode}` : '';
    }

    return `
      export ${paramsCode}

      export type Response = ${inter.responseType}

      export const init: Response;

      export function request(${requestParams}): Promise<Response>;
    `;
  }

  getBaseClassInDeclaration(base: BaseClass) {
    const originProps = base.properties;

    base.properties = base.properties.map((prop) => {
      return new Property({
        ...prop,
        required: false,
      });
    });

    const result = super.getBaseClassInDeclaration(base);
    base.properties = originProps;

    return result;
  }

  // 获取请求参数对象
  getRequest(bodyParamsCode: string, method: string) {
    // 为避免method匹配不上，全部转化为大写
    const upperMethod = method.toUpperCase();
    const fetchMethod = bodyParamsCode ? `${upperMethod}:JSON` : upperMethod;

    let methodTemp = '';
    let contentType = 'application/json';
    switch (fetchMethod) {
      case 'GET':
      default:
        methodTemp = 'get';
        break;
      case 'PUT':
        methodTemp = 'put';
        break;
      case 'DELETE':
        methodTemp = 'delete';
        break;
      case 'POST':
        methodTemp = 'post';
        contentType = 'application/x-www-form-urlencoded';
        break;
      case 'PUT:JSON':
        methodTemp = 'put';
        break;
      case 'POST:JSON':
        methodTemp = 'post';
        break;
    }
    return {
      method: methodTemp,
      contentType,
    };
  }

  getInterfaceContent(inter: Interface) {
    const method = inter.method.toUpperCase();
    // const requestParams = inter.getRequestParams(this.surrounding);
    // const paramsCode = inter.getParamsCode('Params', this.surrounding);
    // post请求的body参数，需要用inter.getBodyParamsCode()获取
    const bodyParamsCode = inter.getBodyParamsCode();
    let requestParams = bodyParamsCode
      ? `data = {}, params = {}`
      : `params = {}`;

    const requestObj = this.getRequest(bodyParamsCode, inter.method);

    // 判断是否有params参数
    const hasGetParams = !!inter.parameters.filter(
      (param) => param.in !== 'body',
    ).length;
    let requestStr = bodyParamsCode ? `data, params` : `params`;
    if (!hasGetParams) {
      requestParams = bodyParamsCode ? `data = {}` : 'params = {}';
      requestStr = bodyParamsCode ? `data` : 'params';
    }

    let defsStr = '';
    if (inter.response.isDefsType) {
      defsStr = "import * as defs from '../../baseClass';";
    }

    return `
    /**
     * @desc ${inter.description}
     */
    ${defsStr}
    import { initRequest } from '@/request';
    import serverConfig from '../../../../../server.config';

    export const init = ${inter.response.getInitialValue()};

    const backEndUrl = serverConfig()['${this.dataSource.name}'];

    export async function request(${requestParams}) {
      const request = await initRequest();
      const result: any = await request({
        url: backEndUrl + '${inter.path}',
        method: '${method}',
        headers: {
          'Content-Type': '${requestObj.contentType}',
        },
        ${requestStr}
      });
      if (result) {
        if (!result.success)  {
          throw new Error(JSON.stringify(result));
        } else {
          return result.data;
        }
      } else {
        throw new Error(JSON.stringify({ message: '接口未响应' }));
      }
    }
   `;
  }
}
