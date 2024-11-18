// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu({
  stylistic: false,
}).append({
  rules: {
    // Ignore rules clashing with Prettier
    'vue/html-closing-bracket-newline': 'off',
    'vue/html-indent': 'off',
    'vue/html-self-closing': 'off',
    'vue/singleline-html-element-content-newline': 'off',
  },
})
