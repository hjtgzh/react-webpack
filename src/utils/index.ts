/*
 * @文件描述: 通用方法
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2020-07-11 13:58:27
 * @LastEditors: 黄建停
 * @LastEditTime: 2020-07-11 15:24:01
 */

// 获取input上传图片的base64数据
export const getBase64 = (file: File): Promise<any> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
