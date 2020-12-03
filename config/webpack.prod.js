const { merge } = require('webpack-merge');
const webpackCommon = require('./webpack.common.js');
// 在下一次打包时清除之前打包的文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// js压缩，支持es6语法
const TerserPlugin = require('terser-webpack-plugin');
// 打包分析
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//   .BundleAnalyzerPlugin;
// 通过optimize-css-assets-webpack-plugin插件可以对css进行压缩
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(webpackCommon, {
  mode: 'production',
  // devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(),
    // new BundleAnalyzerPlugin({
    //   openAnalyzer: false,
    // }),
    new OptimizeCssAssetsPlugin(),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true, // 是否并行打包
        cache: true, // 是否缓存
        extractComments: false, // 删除多余.LICENSE.txt文件
      }),
    ],
    splitChunks: {
      chunks: 'all', // initial、async和all
      minSize: 30000, // 形成一个新代码块最小的体积
      maxAsyncRequests: 5, // 按需加载时候最大的并行请求数
      maxInitialRequests: 3, // 最大初始化请求数
      automaticNameDelimiter: '~', // 打包分割符
      name: true,
      cacheGroups: {
        vendors: {
          chunks: 'all',
          // 打包两个页面的公共代码
          minChunks: 2, // 引入两次及以上被打包
          name: 'vendors', // 分离包的名字
        },
      },
    },
  },
});
