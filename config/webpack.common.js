// html模板
const HtmlWebpackPlugin = require('html-webpack-plugin');

// antd-dayjs-webpack-plugin 插件，无需对现有代码做任何修改直接将antd里的 Moment.js 替换成 Day.js
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

const path = require('path');
module.exports = {
  entry: path.resolve(__dirname, '../src/index.tsx'),
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: '[name].js',
    chunkFilename: '[name].js', // 设置按需加载后的chunk名字
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new AntdDayjsWebpackPlugin(),
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
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // 由于antd 和 Css Modules 不能混用，也可能与其他样式包不能混用，所以要针对/node_modules单独配置一条loader规则，
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          // 'typings-for-css-modules-loader',
          '@teamsupercell/typings-for-css-modules-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]___[hash:base64:5]',
              },
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
          'style-loader',
          'css-loader',
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
            },
          },
        ],
      },
    ],
  },
};
