const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig");
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  maxWorkers: 1,
  coveragePathIgnorePatterns: ["gcpLogging.ts", "/node_modules/", "envIcon.ts"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/",
  }),
};
