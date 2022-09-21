import path from 'path';
const rootDirector = path.resolve(__dirname);

export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  coverageThreshold: {
    global: {
      branches: 70,
      function: 80,
      lines: 80,
      statements: 80,
    },
  },
  globals: {
    'ts-jest': {
      tsconfig: path.resolve(__dirname, 'tsconfig.json'),
    },
  },
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
      "@server(.*)$": `${rootDirector}/src$1`,
      "@tests(.*)$": `${rootDirector}/__tests__$1`,
      "@config(.*)$": `${rootDirector}/src/config$1`,
      "@handlers(.*)$": `${rootDirector}/src/handlers$1`,
      "@libs(.*)$": `${rootDirector}/src/libs$1`,
      "@middleware(.*)$": `${rootDirector}/src/middleware$1`,
      "@models(.*)$": `${rootDirector}/src/dao/models$1`,
      "@routes(.*)$": `${rootDirector}/src/routes$1`,
      "@utils(.*)$": `${rootDirector}/src/utils$1`,
      "@dao(.*)$": `${rootDirector}/src/dao$1`
  },
  reporters: [
    'default',
    [
      path.resolve(__dirname, 'node_modules', 'jest-html-reporter'),
      {
        pageTitle: 'Demo test Report',
        outputPath: 'test-report.html',
      },
    ],
  ],
  rootDir: rootDirector,
  roots: [rootDirector],
  setupFilesAfterEnv: [`${rootDirector}/__tests__/setup.ts`],
  testPathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/build',
    `${rootDirector}/__tests__/fixtures`,
    `${rootDirector}/__tests__/setup.ts`,
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testRegex: ['((/__tests__/.*)|(\\.|/)(test|spec))\\.tsx?$'],
};
