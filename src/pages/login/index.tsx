/*
 * @文件描述: 登录页面
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2020-07-09 15:57:37
 * @LastEditors: 黄建停
 * @LastEditTime: 2020-07-11 17:13:52
 */

import React from 'react';
import { Form, Input, Button, Checkbox, DatePicker } from 'antd';
import { useHistory } from 'react-router-dom';
import styles from './style.less';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface Iprops {
  name?: string;
}

const Login: React.FC<Iprops> = () => {
  const history = useHistory();
  const onFinish = () => {
    // console.log(1);
    history.push('/home');
  };

  const onFinishFailed = () => {
    console.log(1);
  };

  return (
    <div className={styles.content}>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item label="DatePicker" name="time">
          <DatePicker />
        </Form.Item>
        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
