import type { Config } from '@jest/types';
import { jsWithTs } from 'ts-jest/presets';

const config: Config.InitialOptions = {
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '<rootDir>/coverage/unit',
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['js', 'json', 'ts'],

  roots: ['<rootDir>/src'],

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  testEnvironment: 'node',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    ...jsWithTs.transform,
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};

export default config;
