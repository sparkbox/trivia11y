module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 'latest',
  },
  ignorePatterns: ['dist', 'node_modules'],
};
