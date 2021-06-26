module.exports = {
  env: {
    es2021: true,
    node: true,
    'jest/globals': true,
  },
  extends: [
    'airbnb-base',
    'plugin:jest/recommended',
    'plugin:jest/style',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['jest'],
  rules: {
    'import/extensions': 0,
    'consistent-return': 0,
    'import/no-extraneous-dependencies': ['error', { devDependencies: true, optionalDependencies: false, peerDependencies: false }],
    'no-plusplus': 0,
    'no-console': 0,
    'no-underscore-dangle': 0,
    'jest/valid-title': 0,
    'no-await-in-loop': 0,
    'no-continue': 0,
    'no-restricted-syntax': 0,
  },
};
