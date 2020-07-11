/*
 * @文件描述: 请求封装
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2020-05-29 11:48:32
 * @LastEditors: 黄建停
 * @LastEditTime: 2020-07-11 15:24:34
 */
import { message } from 'antd';
import http from './HttpClient';

type FetchType = 'get' | 'post' | 'postFormWithoutToken' | 'json' | 'postFile';
/**
 * 得到request的具体方法
 * @param type
 */
function getFetchMethod(type: FetchType) {
  switch (type) {
    case 'post':
      return 'postForm';

    case 'postFormWithoutToken':
      return 'postFormWithoutToken';

    case 'json':
      return 'postJSON';

    case 'postFile':
      return 'postFile';

    case 'get':
    default:
      return 'get';
  }
}

/**
 * 封装公共的发业务请求的方法
 * @param config 配置，包含要请求的url和默认值
 * @param params 请求的参数
 * @param type 请求的类型
 */
export async function fetchData<T>(
  config: { url: string; initialData?: T; errMsg?: string },
  params?: object,
  type: FetchType = 'get',
) {
  try {
    const method = getFetchMethod(type);
    const result = await http[method]<T>(config.url, params);
    if (result.success) {
      return result.data || result.result || config.initialData;
    }
    message.error(config.errMsg || '获取数据失败');
    return config.initialData || {};
  } catch (error) {
    message.error(error.message || '获取数据失败');
    return config.initialData || {};
  }
}

/**
 * 封装公共的提交数据的方法
 * @param config 配置，包含要请求的url和提示信息
 * @param params 请求的参数
 * @param type 请求的类型
 */
export async function fetchPostData<T>(
  config: { url: string; errMsg?: string },
  params?: object,
  type: FetchType = 'post',
): Promise<any> {
  try {
    const method = getFetchMethod(type);
    const result = await http[method]<T>(config.url, params);
    if (!result.success) {
      message.error(config.errMsg || '提交失败');
    }
    return result.result || result.success;
  } catch (error) {
    message.error(error.message || config.errMsg || '提交失败');
    return false;
  }
}
