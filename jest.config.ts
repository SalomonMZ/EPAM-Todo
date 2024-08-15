import type { Config } from "jest";

const config: Config = {
  testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],
  clearMocks: true,
  verbose: true,
  roots: ["<rootDir>/src"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Handling CSS imports
  },
  collectCoverage: true,
  coverageDirectory: "coverage",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", // Transpile TS/TSX files with ts-jest
    "^.+\\.(js|jsx)$": "babel-jest", // Transpile JS/JSX files with babel-jest
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};

export default config;
