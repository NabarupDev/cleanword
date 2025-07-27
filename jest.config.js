module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/Test/**/*.test.js'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};