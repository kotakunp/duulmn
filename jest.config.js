module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/server/test/**/*.test.ts'],
  collectCoverageFrom: [
    'server/**/*.{ts,tsx}',
    '!server/test/**/*',
    '!**/node_modules/**',
  ],
};