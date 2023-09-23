module.exports = {
  extends: ['@commitlint/config-conventional'],
  // 校验规则
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能
        'fix', // 修复BUG
        'docs', // 文档修改
        'style', // 代码格式修改
        'refactor', // 重构
        'perf', // 性能优化
        'test', // 测试
        'chore', // 构建过程或辅助工具的变动
        'revert', // 撤销提交
        'build', // 构建系统或外部依赖项的变动
      ],
    ],
    'type-case': [0], // type字段大小写校验关闭
    'type-empty': [0], // type字段非空校验关闭
    'scope-empty': [0], // scope字段非空校验关闭
    'scope-case': [0], // scope字段大小写校验关闭
    'subject-full-stop': [0, 'never'], // subject句号校验关闭
    'subject-case': [0, 'never'], // subject大小写校验关闭
    'header-max-length': [0, 'always', 72], // header长度校验关闭
  },
}
