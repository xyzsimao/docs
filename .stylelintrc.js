module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  plugins: ['stylelint-prettier', 'stylelint-scss'],
  rules: {
    'prettier/prettier': true,
    // 在這裡添加你的自訂規則
  },
};
