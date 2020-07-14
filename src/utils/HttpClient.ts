/*
 * @文件描述: HTTP请求封装
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2020-07-11 13:58:27
 * @LastEditors: 黄建停
 * @LastEditTime: 2020-07-14 16:40:17
 */

import qs from 'qs';
import Axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { message as AdMessage } from 'antd';
import user from './user';

interface AjaxResponse<T> {
  code: number;
  data: T;
  result?: T;
  message: string;
  success: boolean;
  status?: string;
  regeocode?: T;
}

function handleSuccess(response: AxiosResponse) {
  return response.data;
}

/**
 * 异常处理函数
 * @param error
 */
async function handleError(error: AxiosError) {
  const { response, message } = error;
  let errorMsg = '';
  if (response) {
    switch (response.status) {
      case 400:
        errorMsg = response.data ? response.data.message : '';
        break;
      case 500:
      case 501:
      case 502:
        errorMsg = response.data ? response.data.message : '服务器内部错误';
        break;
    }
    // 判断token是否有效
    if (response.data.code === 40001) {
      const res = user.isLogin();
      !res && AdMessage.error('登录过期，请重新登录');
    }
    return Promise.reject({
      code: response.status,
      success: false,
      data: null,
      message: errorMsg,
    });
  } else if (message === 'cancel') {
    return Promise.reject({
      code: 50000,
      success: false,
      message: null,
    });
  }
  return Promise.reject({
    code: 50000,
    success: false,
    message: '对不起，服务出错了',
  });
}

// 暂时隐藏---2020/2/10
// function createFlag(config: AxiosRequestConfig) {
//   const { baseURL = '', url = '', method = '', data, params } = config;
//   let flag = baseURL + url + '&' + method;
//   if (data) {
//     flag += `&${data}`;
//   }
//   if (params) {
//     flag += `&${JSON.stringify(params)}`;
//   }
//   return flag;
// }

// function removePending(config: AxiosRequestConfig) {
//   for (const p in pendingArr) {
//     if (pendingArr.hasOwnProperty(p)) {
//       const pending = pendingArr[p];
//       if (pending.url === createFlag(config)) {
//         pending.cancelFn('cancel');
//         pendingArr.splice(+p, 1);
//       }
//     }
//   }
// }

// const pendingArr: { url: string; cancelFn: (message?: string) => void }[] = [];
// const CancelToken = Axios.CancelToken;

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

// 暂时隐藏---2020/2/10
// axios.interceptors.request.use(
//   config => {
//     removePending(config);
//     config.cancelToken = new CancelToken(cancelFn => {
//       pendingArr.push({
//         url: createFlag(config),
//         cancelFn,
//       });
//     });
//     return config;
//   },
//   err => {
//     return Promise.reject(err);
//   },
// );
/**
 * 添加默认的请求拦截器，请求之前把token加到header中
 */
axios.interceptors.request.use(
  (config) => {
    const { headers, ...rest } = config;
    // const accessToken = user.getToken();
    const accessToken = 'a0ad78571733a6f49360d76ba5225bb0';
    return {
      ...rest,
      headers: {
        ...headers,
        accessToken,
      },
    };
  },
  (error) => Promise.reject(error),
);

// 暂时隐藏---2020/2/10
// axios.interceptors.response.use(
//   response => {
//     removePending(response.config);
//     return response;
//   },
//   err => {
//     pendingArr = [];
//     return Promise.reject(err);
//   },
// );

// post---headers里面有token
function post<T>(
  url: string,
  data?: string | object,
  option?: AxiosRequestConfig,
): Promise<AjaxResponse<T>> {
  return axios
    .post<T>(url, data, option)
    .then(handleSuccess)
    .catch(handleError);
}

// postFile---headers里面没有token
function postWithoutToken<T>(
  url: string,
  data?: string | object,
  option?: AxiosRequestConfig,
): Promise<AjaxResponse<T>> {
  return Axios.post<T>(url, data, option)
    .then(handleSuccess)
    .catch(handleError);
}

export default {
  get: function <T>(url: string, data?: object): Promise<AjaxResponse<T>> {
    return axios
      .get<T>(url, {
        params: data,
      })
      .then(handleSuccess)
      .catch(handleError);
  },
  put: function <T>(
    url: string,
    data?: object,
    option?: AxiosRequestConfig,
  ): Promise<AjaxResponse<T>> {
    return axios
      .put<T>(url, data, option)
      .then(handleSuccess)
      .catch(handleError);
  },
  postForm: function <T>(url: string, data?: object): Promise<AjaxResponse<T>> {
    return post<T>(url, qs.stringify(data || {}), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  },
  postFormWithoutToken: function <T>(
    url: string,
    data?: object,
  ): Promise<AjaxResponse<T>> {
    return postWithoutToken<T>(url, qs.stringify(data || {}), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  },
  postJSON: function <T>(url: string, data?: object): Promise<AjaxResponse<T>> {
    return post<T>(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  postFile: function <T>(url: string, data?: object): Promise<AjaxResponse<T>> {
    return postWithoutToken<T>(`${url}?access_token=${user.getToken()}`, data);
  },
};

export interface HttpProps {
  get: <T>(
    url: string,
    option?: AxiosRequestConfig,
  ) => Promise<AjaxResponse<T>>;
  put: <T>(
    url: string,
    data?: object,
    option?: AxiosRequestConfig,
  ) => Promise<AjaxResponse<T>>;
  postForm: <T>(url: string, data?: object) => Promise<AjaxResponse<T>>;
  postJSON: <T>(url: string, data?: object) => Promise<AjaxResponse<T>>;
  postFile: <T>(url: string, data: FormData) => Promise<AjaxResponse<T>>;
}
