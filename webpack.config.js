// html模板
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 在下一次打包时清除之前打包的文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// js压缩，支持es6语法
const TerserPlugin = require('terser-webpack-plugin');
// 打包分析
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

// antd-dayjs-webpack-plugin 插件，无需对现有代码做任何修改直接将antd里的 Moment.js 替换成 Day.js
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

const path = require('path');
module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].js',
    chunkFilename: '[name].js', // 设置按需加载后的chunk名字
  },
  // 开发环境使用devtool，生产环境不使用
  devtool: process.env.NODE_ENV === 'development' ? 'inline-source-map' : false,
  devServer: {
    // contentBase: './build',
    // 刷新后报 Cannot GET /
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new CleanWebpackPlugin(),
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
    }),
    new AntdDayjsWebpackPlugin(),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true, // 是否并行打包
        cache: true, // 是否缓存
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
          // 打包两个页面的公共代码
          minChunks: 2, // 引入两次及以上被打包
          name: 'vendors', // 分离包的名字
          chunks: 'all',
        },
      },
    },
  },
  // 引用文件省略后缀名
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.less'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
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
