/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  clearMocks: true,
  coverageProvider: 'v8',
  moduleDirectories: [
    '__mocks__',
    'node_modules',
  ],

  moduleFileExtensions: [
    'mjs',
    'js',
    'jsx',
    'ts',
    'tsx',
    'json',
    'node',
  ],

  testEnvironment: 'jest-environment-node',

  testMatch: [
    '**/__tests__/**/*.(mj|[jt])s?(x)',
    '**/?(*.)+(spec|test).(mj|[jt])s?(x)',
  ],
};
