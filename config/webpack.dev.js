const { merge } = require('webpack-merge');
const webpackCommon = require('./webpack.common.js');
// 打包分析
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const path = require('path');

module.exports = merge(webpackCommon, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '../build'), // build在上级目录
    // 刷新后报 Cannot GET /
    historyApiFallback: true,
  },
  plugins: [
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
    }),
  ],
});
