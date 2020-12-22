module.exports = {
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['<rootDir>/(tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx))'],
  watchPathIgnorePatterns: [
    '/node_modules/',
  ],
  setupFiles: [
    '<rootDir>/tests/unit/config/setup-globals.js',
  ],
};
