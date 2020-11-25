module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: ['plugin:vue-libs/recommended'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['jest'],
  rules: {
    strict: 0,
  },
};
