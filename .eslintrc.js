/*
 * @Author: Donnie
 * @LastEditors: Donnie
 * @Date: 2022-10-10 15:43:39
 * @LastEditTime: 2022-10-10 15:55:04
 * @FilePath: /super-page-web/.eslintrc.js
 */
module.exports = {
  root: true,
  parserOptions: {
    sourceType: "module",
    parser: "@typescript-eslint/parser",
  },
  parser: "vue-eslint-parser",
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    "no-console": "off",
  },
};
