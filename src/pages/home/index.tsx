/*
 * @文件描述: home首页
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2020-07-09 15:58:20
 * @LastEditors: janko
 * @LastEditTime: 2021-08-27 17:15:33
 */

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, message } from 'antd';
// 只引用需要的部分
import isEmpty from 'lodash/isEmpty';
// import Counter from './Counter';
import { getHomeTableData } from '@/stores/home';
import Modal3D from '@/components/Modal3D';
import SqlEditor from '@/components/SqlEditor';
import { Encrypt, Decrypt } from '@/utils';
import { format } from 'sql-formatter';
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

  const [sqlValue, setSqlValue] = useState('');

  /* dispatch动作 */
  const dispatch = useDispatch();

  /* 页面首次加载 */
  useEffect(() => {
    dispatch(getHomeTableData({}));
    // console.log('1', Encrypt(123));
    // console.log('2', Decrypt(Encrypt(123)));
    // API..store.getInventory.request({});
    // console.log('API', API);
    API.authorization.resource.listResource
      .request({
        clientKey: '123',
      })
      .then((result) => console.log('result', result));
  }, [dispatch]);

  // sql格式化
  function sqlFormat() {
    if (!sqlValue) {
      message.info('请输入sql语句');
      return;
    }
    try {
      const formatSqlValue = format(sqlValue);
      setSqlValue(formatSqlValue);
    } catch (err) {
      message.error('无法格式化sql，请检查sql');
    }
  }

  return (
    <>
      <div className={styles.content}>
        {/* <Table
          columns={columns}
          dataSource={!isEmpty(list) && list}
          rowKey="userId"
          pagination={{
            hideOnSinglePage: true,
            current: page,
            total: total,
          }}
        /> */}
        <Button type="primary" onClick={sqlFormat}>
          SQL格式化
        </Button>
        <SqlEditor value={sqlValue} onChange={setSqlValue} />
      </div>
      {/* <Modal3D url="./dae/taurus/niu.dae" width={160} height={140} /> */}
    </>
  );
};

export default Home;
