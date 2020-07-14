/*
 * @文件描述: home首页
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2020-07-09 15:58:20
 * @LastEditors: 黄建停
 * @LastEditTime: 2020-07-14 17:01:33
 */

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Space } from 'antd';
import { Link } from 'react-router-dom';
import Counter from './Counter';
import { getHomeTableData } from '@/stores/home';
import styles from './style.less';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Phone',
    dataIndex: 'contactPhone',
    key: 'contactPhone',
  },
  {
    title: 'Address',
    dataIndex: 'customerAddress',
    key: 'customerAddress',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_text, record) => (
      <Space size="middle">
        <a>{record.name}</a>
        <Link to="/login">Delete</Link>
      </Space>
    ),
  },
];

/* 定义props类型 */
interface Iprops {
  name?: string;
}

const Home: React.FC<Iprops> = () => {
  /* store里面数据 */
  const {
    homeTableData: { list, page, total },
  } = useSelector((state) => state.home);

  /* dispatch动作 */
  const dispatch = useDispatch();

  /* 页面首次加载 */
  useEffect(() => {
    dispatch(getHomeTableData({}));
  }, [dispatch]);

  return (
    <>
      <Counter />
      <div className={styles.content}>
        <Table
          columns={columns}
          dataSource={list}
          pagination={{
            hideOnSinglePage: true,
            current: page,
            total: total,
          }}
        />
      </div>
    </>
  );
};

export default Home;
