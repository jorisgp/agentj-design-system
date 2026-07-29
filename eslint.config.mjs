import nx from '@nx/eslint-plugin';

export default [
  {
    files: ['**/*.json'],
    // Override or add rules here
    rules: {},
    languageOptions: {
      parser: await import('jsonc-eslint-parser'),
    },
  },
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist', '**/out-tsc', '**/vitest.config.*.timestamp*'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: false,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
          depConstraints: [
            {
              sourceTag: 'scope:common',
              onlyDependOnLibsWithTags: ['scope:common'],
            },
            {
              sourceTag: 'scope:lib',
              onlyDependOnLibsWithTags: ['scope:common', 'scope:lib'],
            },
            {
              sourceTag: 'scope:app',
              onlyDependOnLibsWithTags: [
                'scope:common',
                'scope:lib',
                'scope:app',
              ],
            },
          ],
        },
      ],
    },
  },
  {
    files: [
      '**/*.{spec,test}.ts',
      '**/*.{spec,test}.tsx',
      '**/*.{spec,test}.js',
      '**/*.{spec,test}.jsx',
    ],
    rules: {
      'no-restricted-globals': [
        'error',
        {
          name: 'afterAll',
          message: 'Import Vitest test APIs from "vitest".',
        },
        {
          name: 'afterEach',
          message: 'Import Vitest test APIs from "vitest".',
        },
        {
          name: 'beforeAll',
          message: 'Import Vitest test APIs from "vitest".',
        },
        {
          name: 'beforeEach',
          message: 'Import Vitest test APIs from "vitest".',
        },
        {
          name: 'describe',
          message: 'Import Vitest test APIs from "vitest".',
        },
        {
          name: 'expect',
          message: 'Import Vitest test APIs from "vitest".',
        },
        {
          name: 'it',
          message: 'Import Vitest test APIs from "vitest".',
        },
        {
          name: 'test',
          message: 'Import Vitest test APIs from "vitest".',
        },
        {
          name: 'vi',
          message: 'Import Vitest test APIs from "vitest".',
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@angular/core/testing',
              message:
                'Use Vitest with @testing-library/angular instead of direct Angular TestBed APIs.',
            },
            {
              name: '@playwright/test',
              message: 'Use Vitest for tests in this repository.',
            },
            {
              name: 'node:test',
              message: 'Use Vitest for tests in this repository.',
            },
            {
              name: '@jest/globals',
              message: 'Use Vitest for tests in this repository.',
            },
            {
              name: 'jest',
              message: 'Use Vitest for tests in this repository.',
            },
            {
              name: 'jasmine',
              message: 'Use Vitest for tests in this repository.',
            },
            {
              name: 'cypress',
              message: 'Use Vitest for tests in this repository.',
            },
          ],
          patterns: [
            {
              group: ['@jest/*', 'jest-*', 'karma', 'karma-*', 'cypress-*'],
              message:
                'Use Vitest and @testing-library/angular for tests in this repository.',
            },
          ],
        },
      ],
    },
  },
  {
    files: [
      '**/*.ts',
      '**/*.tsx',
      '**/*.cts',
      '**/*.mts',
      '**/*.js',
      '**/*.jsx',
      '**/*.cjs',
      '**/*.mjs',
    ],
    // Override or add rules here
    rules: {},
  },
];
