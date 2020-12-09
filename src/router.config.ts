/*
 * @文件描述: 路由
 * @公司: cloudwise
 * @作者: janko
 * @Date: 2020-12-09 11:26:36
 * @LastEditors: janko
 * @LastEditTime: 2020-12-09 17:16:45
 */
import LazyLoad from '@/components/LazyLoad';

export const routes = [
  { path: '/home', component: LazyLoad(() => import('./pages/home')) },
  {
    path: '/janko/taskList',
    component: LazyLoad(() => import('./pages/janko/taskList')),
  },
  {
    path: '/janko/editor',
    component: LazyLoad(() => import('./pages/janko/editor')),
  },
];

// module.exports = [
//   // home
//   {
//     path: '/',
//     name: 'home',
//     component: './layouts',
//     routes: [
//       { path: '/home', component: LazyLoad(() => import('./pages/home')) },
//       {
//         path: '/janko/taskList',
//         component: LazyLoad(() => import('./pages/janko/taskList')),
//       },
//       {
//         path: '/janko/editor',
//         component: LazyLoad(() => import('./pages/janko/editor')),
//       },
//     ],
//   },
// ];
