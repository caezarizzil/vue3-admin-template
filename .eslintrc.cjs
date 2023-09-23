// @see https://eslint.bootcss.com/docs/rules/

module.exports = {
  // 指定代码运行的环境
  env: {
    browser: true, // 在浏览器环境中运行
    es2021: true, // 使用ES2021的语法
    node: true, // 在Node.js环境中运行
    jest: true, // 在Jest测试环境中运行
  },
  // 继承其他的配置规则
  extends: [
    "eslint:recommended", // 使用ESLint的推荐规则
    "plugin:@typescript-eslint/recommended", // 使用@typescript-eslint插件的推荐规则
    "plugin:vue/vue3-essential", // 使用Vue 3的必要规则
    "plugin:prettier/recommended", // 使用prettier插件的推荐规则
  ],
  // 针对特定文件的配置
  overrides: [
    {
      env: {
        node: true, // 只针对Node.js环境中的配置
      },
      files: [
        ".eslintrc.{js,cjs}", // 只针对.eslintrc.js和.eslintrc.cjs文件的配置
      ],
      parserOptions: {
        sourceType: "script", // 解析为脚本类型
      },
    },
  ],
  // 指定解析器
  parser: "vue-eslint-parser",
  // 解析器选项
  parserOptions: {
    ecmaVersion: "latest", // 使用最新的ECMAScript版本
    parser: "@typescript-eslint/parser", // 使用@typescript-eslint解析器
    sourceType: "module", // 使用模块类型
    jsxPragma: "React", // 使用React作为JSX的pragma
    ecmaFeatures: {
      jsx: true, // 启用JSX支持
    },
  },
  // 使用的插件
  plugins: [
    "@typescript-eslint", // 使用@typescript-eslint插件
    "vue", // 使用Vue插件
  ],
  /**
   * 指定规则
   * "off" 或 0    ==&gt;  关闭规则
   * "warn" 或 1   ==&gt;  打开的规则作为警告（不影响代码执行）
   * "error" 或 2  ==&gt;  规则作为一个错误（代码不能执行，界面报错）
   */
  rules: {
    // eslint（https://eslint.bootcss.com/docs/rules/）
    "no-var": "error", // 要求使用 let 或 const 而不是 var
    "no-multiple-empty-lines": ["warn", { max: 1 }], // 不允许多个空行
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off", // 在生产环境中禁止使用console
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off", // 在生产环境中禁止使用debugger
    "no-unexpected-multiline": "error", // 禁止空余的多行
    "no-useless-escape": "off", // 禁止不必要的转义字符

    // typeScript (https://typescript-eslint.io/rules/)
    "@typescript-eslint/no-unused-vars": "error", // 禁止定义未使用的变量
    "@typescript-eslint/prefer-ts-expect-error": "error", // 禁止使用 @ts-ignore
    "@typescript-eslint/no-explicit-any": "off", // 禁止使用 any 类型
    "@typescript-eslint/no-non-null-assertion": "off", // 允许使用非空断言
    "@typescript-eslint/no-namespace": "off", // 禁止使用自定义 TypeScript 模块和命名空间。
    "@typescript-eslint/semi": "off",

    // eslint-plugin-vue (https://eslint.vuejs.org/rules/)
    "vue/multi-word-component-names": "off", // 要求组件名称始终为 “-” 链接的单词
    "vue/script-setup-uses-vars": "error", // 防止<script setup>使用的变量<template>被标记为未使用
    "vue/no-mutating-props": "off", // 不允许组件 prop的改变
    "vue/attribute-hyphenation": "off", // 对模板中的自定义组件强制执行属性命名样式
  },
}
