/*
 * @文件描述:
 * @公司: cloudwise
 * @作者: janko
 * @Date: 2021-02-22 15:01:07
 * @LastEditors: janko
 * @LastEditTime: 2021-02-23 16:31:44
 */
import Axios from 'axios';
import qs from 'qs';
// import { LoginFailure } from './enums';

const codeMessage: Record<number, string> = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
  405: 'xxxx',
};

export function errorHandler(error: any) {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;

    throw new Error(
      JSON.stringify({
        message: errorText,
        description: `请求错误 ${status}: ${url}`,
      }),
    );
  }
  throw error;
}

const getToken = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      const token = localStorage.getItem('accessToken');
      resolve(token);
    }, 0);
  });

const axios = Axios.create({
  baseURL: '/',
  // 查询对象序列化函数
  paramsSerializer(params) {
    return qs.stringify(params);
  },
  // 请求后的数据处理
  transformResponse: [
    function (data) {
      return data;
    },
  ],
  // 跨域是否带token
  // withCredentials: true,
  responseType: 'json',
  // xsrf 设置
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  validateStatus(status) {
    return status >= 200 && status < 300;
  },
});

/**
 * 添加默认的请求拦截器，请求之前把token加到header中
 */
axios.interceptors.request.use((config) => {
  const { headers, ...rest } = config;
  // const accessToken = 'a0ad78571733a6f49360d76ba5225bb0';
  return {
    ...rest,
    headers: {
      ...headers,
      // accessToken,
    },
  };
}, errorHandler);

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (err) => {
    return Promise.reject(err);
  },
);

export const initRequest = () => {
  return axios;
};
