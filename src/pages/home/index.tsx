/*
 * @文件描述: home首页
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2020-07-09 15:58:20
 * @LastEditors: janko
 * @LastEditTime: 2020-12-11 17:32:03
 */

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table } from 'antd';
// 只引用需要的部分
import isEmpty from 'lodash/isEmpty';
// import Counter from './Counter';
import { getHomeTableData } from '@/stores/home';
import Modal3D from '@/components/Modal3D';
import styles from './style.less';

const columns = [
  {
    title: 'Id',
    dataIndex: 'userId',
    key: 'userId',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
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
      {/* <Counter /> */}
      <div className={styles.content}>
        <Table
          columns={columns}
          dataSource={!isEmpty(list) && list}
          rowKey="userId"
          pagination={{
            hideOnSinglePage: true,
            current: page,
            total: total,
          }}
        />
      </div>
      <Modal3D url="./dae/taurus/niu.dae" width={160} height={140} />
    </>
  );
};

export default Home;
