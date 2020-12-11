const webpack = require('webpack');
const { merge } = require('webpack-merge');
const webpackCommon = require('./webpack.common.js');
// 打包分析
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const path = require('path');

module.exports = merge(webpackCommon, {
  mode: 'development',
  devtool: 'source-map',
  output: {
    // 解决 Webpack + react-loadable +嵌套路由: Refused to apply style from '*/css/main.css' because its MIME type ('text/html')
    publicPath: 'http://localhost:8080/',
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../build'), // build在上级目录
    // 刷新后报 Cannot GET /
    historyApiFallback: true,
    // 解决mock数据跨域问题
    proxy: {
      '/api/*': {
        target: 'http://localhost:3333',
        secure: false,
      },
    },
  },
  plugins: [
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
    }),
    new webpack.DefinePlugin({
      // 设置环境变量
      'process.env.MOCK': JSON.stringify(true), // 是否开启mock数据
    }),
  ],
});
