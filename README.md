<!--
 * @文件描述: readMe
 * @公司: thundersdata
 * @作者: 黄建停
 * @Date: 2020-07-10 16:43:54
 * @LastEditors: janko
 * @LastEditTime: 2020-12-11 17:48:17
-->

## 项目简介

react、webpack 从零开始搭建

## 技术栈

react@16.13.1 + react-router-dom@5.2.0 + webpack@4.43.0 + less@3.11.3 + antd@4.4.1 + typescript@3.9.6 + @reduxjs/toolkit@1.4.0 + react-redux@7.2.0

## 运行

```
git clone --depth 1 https://github.com/hjtgzh/react-webpack.git

cd react (进入项目)

npm install (安装依赖包)

npm start (启动服务)

```

### 建议使用 npm 下载，不推荐 cnpm

## 代码提交前检测

使用 lint-staged 和 husky 搭配，如果代码提交前没有检测，重新安装 husky

## 构建

```
npm run build (正式环境的打包部署)

```

## 是否开启 mock

1. 先运行 npm start (启动服务) ，然后另起一个终端运行 npm run mock (启动 express 服务)
2. 打开 webpack.dev.js 文件，设置：

```
new webpack.DefinePlugin({
    // 设置环境变量
    'process.env.MOCK': JSON.stringify(true), // 是否开启mock数据
}),

```

3. 添加 mock 数据，具体可以参考内部实例代码
4. [mock 具体文档请参考：](http://mockjs.com)

## webpack 优化

1. antd 按需加载---babel-plugin-import
2. js 压缩---terser-webpack-plugin
3. dayjs 替换 moment---dayjs
4. 模块懒加载---react-loadable
5. 图片文件转换为 base64---url-loader
6. 第三方库从主要的包里分离出来---splitChunks
7. lodash 按需引入，如 import isEmpty from 'lodash/isEmpty'
8. mini-css-extract-plugin 插件来打包 css 文件（将 CSS 提取为独立的文件的插件）
9. optimize-css-assets-webpack-plugin 插件可以对 css 进行压缩
10. filename 和 chunkFilename 采用 hash 命名，解决浏览器缓存问题
