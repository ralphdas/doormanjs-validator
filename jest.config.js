module.exports = {
  roots: ['<rootDir>/'],
  testMatch: ['**/test/*.spec.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  coverageReporters: ['json-summary'],
};
