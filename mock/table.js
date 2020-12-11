/*
 * @文件描述: table mock数据
 * @公司: cloudwise
 * @作者: janko
 * @Date: 2020-12-11 10:59:17
 * @LastEditors: janko
 * @LastEditTime: 2020-12-11 15:42:46
 */
// 使用 Mock
const Mock = require('mockjs');

module.exports = function (_req, res) {
  const data = Mock.mock({
    success: true,
    message: '成功',
    data: {
      // 属性 list 的值是一个数组，其中含有 1 到 5 个元素
      'list|1-5': [
        {
          // 属性 userId 是一个5位的随机码
          'userId|5': '',
          'name|+1': ['janko', 'zihan', 'caihua'],
          'phone|+1': ['17682305203', '15538275203'],
          'address|+1': ['河南永城', '河南郑州'],
          'action|+1': ['德玛西亚万岁', '真正的大师永远保持一颗学徒的心'],
        },
      ],
      page: 1,
      pageSize: 10,
      total: 5,
    },
  });
  return res.json(data);
};
