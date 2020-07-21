module.exports = function (api) {
  api.cache(true);

  const presets = [
    [
      '@babel/preset-env',
      {
        targets: {
          // 大于相关浏览器版本无需用到 preset-env
          edge: 17,
          firefox: 60,
          chrome: 67,
        },
      },
    ],
    '@babel/preset-react',
  ];
  const plugins = [
    '@babel/plugin-transform-runtime',
    [
      'import',
      {
        libraryName: 'antd',
        style: true,
      },
    ],
  ];

  if (process.env['NODE_ENV'] === 'development') {
    plugins.push('dynamic-import-node');
  }

  return {
    presets,
    plugins,
  };
};
