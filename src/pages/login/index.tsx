/*
 * @文件描述: 登录页面
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2020-07-09 15:57:37
 * @LastEditors: 黄建停
 * @LastEditTime: 2020-08-22 17:08:26
 */

import React, { useEffect } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import lscache from 'lscache';
// import { userService } from '@/services/user.service';
import { useHistory } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import styles from './style.less';

const FormItem = Form.Item;

// const { login } = userService;

interface LoginProps {
  location?: {
    query: {
      redirectUrl: string;
    };
  };
}

const Login: React.FC<LoginProps> = () => {
  const [form] = Form.useForm();
  const history = useHistory();

  const onFinish = async (values: any) => {
    const { username, password, remember } = values;
    if (remember) {
      lscache.set('username', username);
      lscache.set('password', password);
    }
    history.push('/home');
    // const result = await login(values);
    // if (result) {
    //   const { query } = props.location;
    //   if (query.redirectUrl) {
    //     history.push(query.redirectUrl);
    //   } else {
    //     history.push('/');
    //   }
    // }
  };

  useEffect(() => {
    const username = lscache.get('username');
    const password = lscache.get('password');
    if (username && password) {
      form.setFieldsValue({
        username,
        password,
        remember: true,
      });
    }
  }, [form]);

  return (
    <div className={styles.loginWrap}>
      <div className={styles.loginContent}>
        <img
          src={require('@/assets/login/logo.png')}
          alt=""
          className={styles.logo}
        />
        <strong className={styles.title}>测试系统</strong>
        <Form
          name="nest-messages"
          form={form}
          onFinish={onFinish}
          className={styles.loginForm}
        >
          <FormItem
            name="username"
            rules={[{ required: true, message: '账号不能为空' }]}
          >
            <Input
              placeholder="请输入账号"
              prefix={<UserOutlined />}
              className={styles.loginInput}
            />
          </FormItem>
          <FormItem
            name="password"
            rules={[{ required: true, message: '密码不能为空' }]}
          >
            <Input.Password
              placeholder="请输入密码"
              prefix={<LockOutlined />}
              className={styles.loginInput}
            />
          </FormItem>
          <Form.Item
            name="remember"
            valuePropName="checked"
            className={styles.remember}
          >
            <Checkbox>记住密码</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              shape="round"
              className={styles.btnItem}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
