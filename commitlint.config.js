module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 100],
    // 'scope-case': [2, 'always', 'lower-case'], // 默认
    'scope-case': [0, 'never'],
    'subject-case': [0, 'never'],
    'subject-empty': [2, 'never'],
    // 'type-case': [2, 'always', 'lower-case'], // 默认
    'type-empty': [2, 'never'],
    'type-enum': [
      2,
      'always',
      [
        'build', // 主要目的是修改项目构建系统(例如 glup，webpack，rollup 的配置等)的提交
        'ci', // 主要目的是修改项目继续集成流程(例如 Travis，Jenkins，GitLab CI，Circle等)的提交
        'docs', // 文档更新
        'feat', // 新增功能
        'fix', // bug 修复
        'perf', // 性能优化
        'refactor', // 重构代码(既没有新增功能，也没有修复 bug)
        'revert', // 回滚某个更早之前的提交
        'style', // 不影响程序逻辑的代码修改(修改样式、空白字符，补全缺失的分号等)
        'test', // 新增测试用例或是更新现有测试
        'chore', // 不属于以上类型的其他类型
      ], // 默认
    ],
  },
};
