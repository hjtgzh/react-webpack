// webpack 4.0以后，官方推荐使用mini-css-extract-plugin插件来打包css文件（将CSS提取为独立的文件的插件）
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// html模板
const HtmlWebpackPlugin = require('html-webpack-plugin');

// antd-dayjs-webpack-plugin 插件，无需对现有代码做任何修改直接将antd里的 Moment.js 替换成 Day.js
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

// 通常用在我们打包的时候，将一些文件放到指定的文件夹下
const CopyWebpackPlugin = require('copy-webpack-plugin');
// 注入的脚本或链接标签来增强html-webpack-plugin
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');

// 这个优化会导致部分antd样式有问题
// const PurifyCSSPlugin = require('purifycss-webpack');
// const glob = require('glob-all');

const path = require('path');
// mocule、chunk、bundle区别： https://www.cnblogs.com/skychx/p/webpack-module-chunk-bundle.html
module.exports = {
  // 没有从entry打包的chunk文件，都会以1，2，3...的文件命名方式输出
  // 对象中一个字段就会产生一个Chunk，没有key，也会默认给生成的Chunk一个main的名称
  entry: './src/index.tsx',
  output: {
    // publicPath解析：https://juejin.cn/post/6844903601060446221
    // publicPath:'./',
    // 只是指示输出的目录，对应一个绝对路径
    path: path.resolve(__dirname, '../build'), // build在上级目录
    filename: 'js/[name].[chunkhash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].js', // 设置按需加载后的chunk名字
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../src/static'),
          to: path.resolve(__dirname, '../build'),
        },
        {
          from: path.resolve(__dirname, '../env.config.js'),
          to: path.resolve(__dirname, '../build'),
        },
      ],
    }),
    new HtmlWebpackTagsPlugin({
      tags: ['env.config.js'],
      // true表示在webpack增加的标签后添加，false表示在webpack增加的标签前添加
      append: false,
      hash: true,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
      favicon: path.resolve(__dirname, '../src/assets/favicon.ico'),
    }),
    new AntdDayjsWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: 'css/[id].[hash].css',
    }),
    // new PurifyCSSPlugin({
    //   paths: glob.sync([
    //     path.resolve(__dirname, '../src/*.html'),
    //     path.resolve(__dirname, '../src/*.js'),
    //   ]),
    //   minimize: true,
    //   // 添加白名单 https://github.com/purifycss/purifycss
    //   purifyOptions: {
    //     whitelist: ['*purify*', '*ant*', '*bf*', 'a'],
    //     info: true,
    //   },
    // }),
  ],
  // 引用文件省略后缀名
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.less'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.m?(js|jsx|ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        // 1、使用 typescript 把 ts 代码编译到 ES6，保留 jsx
        // 2、使用 babel 把 ES6 代码 和 jsx 编译到 ES5
        use: ['babel-loader', 'ts-loader'],
      },
      // 处理css的loader
      {
        test: /\.css$/, // 正则匹配以.css结尾的文件
        // 需要用的loader，一定是这个顺序，因为调用loader是从右往左编译的
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // 这里可以指定一个 publicPath
              // 默认使用 webpackOptions.output中的publicPath
              publicPath: '../',
            },
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      // 由于antd 和 Css Modules 不能混用，也可能与其他样式包不能混用，所以要针对/node_modules单独配置一条loader规则，
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // 这里可以指定一个 publicPath
              // 默认使用 webpackOptions.output中的publicPath
              publicPath: '../',
            },
          },
          // 'style-loader', // 跟MiniCssExtractPlugin冲突
          // 'typings-for-css-modules-loader',less-module自动为样式生成对应的d.ts文件，以方便使用ts开发
          '@teamsupercell/typings-for-css-modules-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: 'purify_[local]___[hash:base64:5]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          'less-loader',
        ],
      },
      // antd /node_modules/ less 单独设置，解决antd样式不生效的问题
      {
        test: /\.less$/,
        include: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader', // 跟MiniCssExtractPlugin冲突
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      // 它将图片文件转换为base64 URI
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              esModule: false,
              limit: 8192,
              outputPath: 'images/',
            },
          },
        ],
      },
    ],
  },
};
