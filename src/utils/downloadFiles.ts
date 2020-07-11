/*
 * @文件描述: 文件下载
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2020-07-11 13:58:27
 * @LastEditors: 黄建停
 * @LastEditTime: 2020-07-11 15:22:11
 */

import axios from 'axios';
import { Modal, message } from 'antd';
import { BACKEND_URL } from '@/common';
import user from './user';

export const downloadExcel = (
  url: string,
  params: object,
  name: string,
): void => {
  const modal = Modal.confirm({
    title: '确定要导出列表内容吗？',
    centered: true,
    okText: '确定',
    cancelText: '取消',
    onOk: () => {
      modal.update({
        okButtonProps: { loading: true },
        cancelButtonProps: { disabled: true },
      });
      return httpRequest(url, params, name);
    },
  });
};
export const httpRequest = async (
  url: string,
  params: object,
  name: string,
): Promise<boolean> => {
  try {
    const success = await axios({
      method: 'get',
      baseURL: BACKEND_URL,
      url: url,
      params: params,
      headers: {
        accessToken: user.getToken(),
      },
      responseType: 'blob',
    })
      .then((response) => {
        const blob = new Blob([response.data], {
          type: 'application/vnd.ms-excel;charset=utf-8;',
        });
        const downloadElement = document.createElement('a');
        const href = window.URL.createObjectURL(blob); //创建下载的链接
        downloadElement.href = href;
        downloadElement.download = `${name}.xlsx`; //下载后文件名
        document.body.appendChild(downloadElement);
        downloadElement.click(); //点击下载
        document.body.removeChild(downloadElement); //下载完成移除元素
        window.URL.revokeObjectURL(href); //释放掉blob对象
        return true;
      })
      .catch((error) => {
        throw error;
      });
    return success;
  } catch (error) {
    const data = error.response.data;
    function uploadFile(file: any) {
      return new Promise(function (resolve) {
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function () {
          resolve(JSON.parse(this.result as string));
        };
      });
    }
    const res: any = await uploadFile(data);
    message.error(res?.message || '下载失败');
    return false;
  }
};
