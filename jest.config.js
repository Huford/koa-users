module.exports = {
  preset: 'ts-jest/presets/js-with-babel',
  testEnvironment: 'node',
  collectCoverageFrom: ['src/**/*.{,ts}'],
  coverageReporters: ['json-summary', 'lcov'],
};
