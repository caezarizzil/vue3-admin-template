// @see https://stylelint.bootcss.com/

module.exports = {
  extends: [
    'stylelint-config-standard', // 使用标准的stylelint配置
    'stylelint-config-html/vue', // 配置 Vue 中 template 的样式格式化
    'stylelint-config-standard-scss', // 配置 Scss 的样式格式化
    'stylelint-config-recommended-vue/scss', // 配置 Vue 中 Scss 的样式格式化
    'stylelint-config-recess-order', // 配置 CSS 属性书写顺序插件
    'stylelint-config-prettier', // 与 prettier 兼容的 stylelint 配置
  ],
  overrides: [
    {
      files: ['**/*.(scss|css|vue|html)'], // 针对 Scss、CSS、Vue 和 HTML 文件
      customSyntax: 'postcss-scss', // 使用 postcss-scss 解析语法
    },
    {
      files: ['**/*.(html|vue)'], // 针对 HTML 和 Vue 文件
      customSyntax: 'postcss-html', // 使用 postcss-html 解析语法
    },
  ],
  ignoreFiles: [
    '**/*.js', // 忽略 JS 文件
    '**/*.jsx', // 忽略 JSX 文件
    '**/*.tsx', // 忽略 TypeScript 的 TSX 文件
    '**/*.ts', // 忽略 TypeScript 的 TS 文件
    '**/*.json', // 忽略 JSON 文件
    '**/*.md', // 忽略 Markdown 文件
    '**/*.yaml', // 忽略 YAML 文件
  ],
  /**
   * null  => 关闭该规则
   * always => 必须
   */
  rules: {
    'value-keyword-case': null, // 在 CSS 中使用 v-bind，不报错
    'no-descending-specificity': null, // 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器
    'function-url-quotes': 'always', // 要求或禁止 URL 的引号 "always"（必须加上引号）|"never"（没有引号）
    'no-empty-source': null, // 关闭禁止空源码
    'selector-class-pattern': null, // 关闭强制选择器类名的格式
    'property-no-unknown': null, // 禁止未知的属性（true 为不允许）
    'block-opening-brace-space-before': 'always', // 大括号之前必须有一个空格或不能有空白符
    'value-no-vendor-prefix': null, // 关闭属性值前缀 --webkit-box
    'property-no-vendor-prefix': null, // 关闭属性前缀 -webkit-mask
    'selector-pseudo-class-no-unknown': [
      // 不允许未知的伪类选择器
      true,
      {
        ignorePseudoClasses: ['global', 'v-deep', 'deep'], // 忽略属性，修改 element 默认样式时可使用
      },
    ],
  },
}
