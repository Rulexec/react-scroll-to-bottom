module.exports = {
  collectCoverageFrom: [
    '<rootDir>/packages/*/src/**/*.js',
    '!<rootDir>/*.{spec,test}.js',
    '!<rootDir>/node_modules/**'
  ],
  coverageReporters: ['json', 'lcov', 'text-summary', 'clover', 'cobertura'],
  globals: {
    npm_package_version: '0.0.0-0.jest'
  },
  moduleDirectories: ['node_modules', 'packages'],
  setupFilesAfterEnv: ['<rootDir>/packages/testharness/lib/jest/setupJest.js'],
  testPathIgnorePatterns: ['<rootDir>/packages/testharness'],
  transform: {
    '\\.js$': './babel-jest-config.js'
  }
};
