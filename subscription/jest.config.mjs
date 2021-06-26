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

  // An array of file extensions your modules use
  moduleFileExtensions: [
    'mjs',
    'js',
    'jsx',
    'ts',
    'tsx',
    'json',
    'node',
  ],
  preset: '@shelf/jest-mongodb',
  testEnvironment: 'jest-environment-node',
  testMatch: [
    '**/__tests__/**/*.(mj|[jt])s?(x)',
    '**/?(*.)+(spec|test).(mj|[jt])s?(x)',
  ],
  watchPathIgnorePatterns: ['globalConfig'],
};
