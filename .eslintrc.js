module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
  },
  extends: [
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    'plugin:react/recommended',
    'prettier/react',
  ],
  plugins: ['react-hooks'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  parserOptions: {
    ecmaVersion: 2018, // specify the version of ECMAScript syntax you want to use: 2015 => (ES6)
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true, // enable JSX
      modules: true, // 解决 The keyword 'import' is reserved
    },
  },
  rules: {
    'no-unused-vars': 2,
    'no-console': 1,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/display-name': 'off',
    'react/no-deprecated': 'warn',
  },
};
