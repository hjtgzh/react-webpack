/*
 * @文件描述: layout布局
 * @公司: cloudwise
 * @作者: janko
 * @Date: 2020-12-08 10:16:01
 * @LastEditors: janko
 * @LastEditTime: 2020-12-25 14:24:38
 */
import React, { useState, useEffect } from 'react';
import { Route, Link, useHistory } from 'react-router-dom';
import { Layout, Menu, Dropdown } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { menuTree } from './menuTree';
import { routes } from '../router.config';
import styles from './style.less';

const { SubMenu } = Menu;

const { Header, Sider, Content } = Layout;

// submenu keys of first level
const rootSubmenuKeys = menuTree
  .filter((item) => item.children && item.children.length > 0)
  .map((item) => item.key);

const CLayout: React.FC = () => {
  const [openKeys, setOpenKeys] = React.useState(['']);
  const [selectedKeys, setSelectedKeys] = useState(['/home']);
  const [collapsed, setCollapsed] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const { pathname } = history.location;
    const firstLevel = pathname.split('/')[1];
    if (rootSubmenuKeys.indexOf(firstLevel) > -1) {
      setOpenKeys([firstLevel]);
      setSelectedKeys([pathname]);
    } else {
      setSelectedKeys([firstLevel]);
    }
  }, [history]);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  function toggle() {
    setCollapsed(!collapsed);
  }

  function menuSelect({ selectedKeys }: any) {
    console.log('selectedKeys', selectedKeys);
    setSelectedKeys(selectedKeys);
  }

  function signout() {
    history.push('/login');
  }

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className={styles['layout-side']}
      >
        {/* logo */}
        {collapsed ? (
          <div className={styles['logo-small']} />
        ) : (
          <div className={styles.logo} />
        )}
        {/* 左侧menu配置 */}
        <Menu
          mode="inline"
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          selectedKeys={selectedKeys}
          onSelect={menuSelect}
        >
          {menuTree.map((menu) => {
            if (menu.children && menu.children.length > 0) {
              return (
                <SubMenu key={menu.key} icon={<menu.icon />} title={menu.title}>
                  {menu.children.map((child) => (
                    <Menu.Item key={child.key} icon={<child.icon />}>
                      <Link to={child.link}>{child.title}</Link>
                    </Menu.Item>
                  ))}
                </SubMenu>
              );
            } else {
              return (
                <Menu.Item key={menu.key} icon={<menu.icon />}>
                  <Link to={menu.link || ''}>{menu.title}</Link>
                </Menu.Item>
              );
            }
          })}
        </Menu>
      </Sider>
      <Layout className={styles['site-layout']}>
        <Header className={styles['site-layout-header']}>
          {collapsed ? (
            <MenuUnfoldOutlined className={styles.trigger} onClick={toggle} />
          ) : (
            <MenuFoldOutlined className={styles.trigger} onClick={toggle} />
          )}
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item onClick={signout}>退出登陆</Menu.Item>
              </Menu>
            }
          >
            <span className={styles.handleBt}>操作</span>
          </Dropdown>
        </Header>
        <Content className={styles['site-layout-content']}>
          {routes.map((route) => (
            <Route key={route.path} path={route.path}>
              <route.component />
            </Route>
          ))}
        </Content>
      </Layout>
    </Layout>
  );
};

export default CLayout;
