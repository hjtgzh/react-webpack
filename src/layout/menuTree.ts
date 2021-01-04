/*
 * @文件描述: menuTree
 * @公司: cloudwise
 * @作者: janko
 * @Date: 2020-12-09 16:48:35
 * @LastEditors: janko
 * @LastEditTime: 2020-12-25 15:03:12
 */
import {
  UserOutlined,
  VideoCameraOutlined,
  SettingOutlined,
} from '@ant-design/icons';

export const menuTree = [
  {
    title: 'home',
    key: 'home',
    icon: UserOutlined,
    link: '/home',
  },
  {
    key: 'janko',
    title: 'janko',
    icon: SettingOutlined,
    children: [
      {
        title: 'taskList',
        key: '/janko/taskList',
        icon: VideoCameraOutlined,
        link: '/janko/taskList',
      },
      {
        title: 'editor',
        key: '/janko/editor',
        icon: SettingOutlined,
        link: '/janko/editor',
      },
      {
        title: 'color',
        key: '/janko/color',
        icon: SettingOutlined,
        link: '/janko/color',
      },
      {
        title: 'map',
        key: '/janko/map',
        icon: SettingOutlined,
        link: '/janko/map',
      },
    ],
  },
];
