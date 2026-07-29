import baseConfig from '../../eslint.config.mjs';
import { existsSync } from 'node:fs';
import { basename, dirname, extname, join, relative } from 'node:path';

const requireSpecRule = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Require every source TypeScript file to have a colocated spec file.',
    },
    messages: {
      missingSpec:
        'Source file "{{ file }}" must have a colocated "{{ specFile }}" test file.',
    },
    schema: [],
  },
  create(context) {
    return {
      Program(node) {
        const filename = context.filename ?? context.getFilename();
        const normalizedFilename = filename.replaceAll('\\', '/');

        if (
          filename === '<input>' ||
          !normalizedFilename.includes('/src/') ||
          extname(filename) !== '.ts' ||
          filename.endsWith('.d.ts') ||
          filename.endsWith('.spec.ts') ||
          filename.endsWith('.test.ts')
        ) {
          return;
        }

        const specFile = `${basename(filename, '.ts')}.spec.ts`;

        if (existsSync(join(dirname(filename), specFile))) {
          return;
        }

        context.report({
          node,
          messageId: 'missingSpec',
          data: {
            file: relative(process.cwd(), filename),
            specFile,
          },
        });
      },
    };
  },
};

export default [
  ...baseConfig,
  {
    plugins: {
      'agent-j-husky-checks': {
        rules: {
          'require-colocated-spec': requireSpecRule,
        },
      },
    },
  },
  {
    files: ['**/*.json'],
    rules: {
      '@nx/dependency-checks': [
        'error',
        {
          ignoredDependencies: ['@nx/vite', 'vitest'],
          ignoredFiles: [
            '{projectRoot}/eslint.config.{js,cjs,mjs,ts,cts,mts}',
            '{projectRoot}/vite.config.{js,ts,mjs,mts}',
          ],
        },
      ],
    },
    languageOptions: {
      parser: await import('jsonc-eslint-parser'),
    },
  },
  {
    files: ['src/**/*.ts'],
    rules: {
      'agent-j-husky-checks/require-colocated-spec': 'error',
    },
  },
  {
    files: ['**/*.{spec,test}.ts'],
    rules: {
      'no-restricted-globals': [
        'error',
        {
          name: 'afterAll',
          message:
            'Import Vitest test APIs from "vitest" instead of using globals.',
        },
        {
          name: 'afterEach',
          message:
            'Import Vitest test APIs from "vitest" instead of using globals.',
        },
        {
          name: 'beforeAll',
          message:
            'Import Vitest test APIs from "vitest" instead of using globals.',
        },
        {
          name: 'beforeEach',
          message:
            'Import Vitest test APIs from "vitest" instead of using globals.',
        },
        {
          name: 'describe',
          message:
            'Import Vitest test APIs from "vitest" instead of using globals.',
        },
        {
          name: 'expect',
          message:
            'Import Vitest test APIs from "vitest" instead of using globals.',
        },
        {
          name: 'it',
          message:
            'Import Vitest test APIs from "vitest" instead of using globals.',
        },
        {
          name: 'test',
          message:
            'Import Vitest test APIs from "vitest" instead of using globals.',
        },
        {
          name: 'vi',
          message:
            'Import Vitest test APIs from "vitest" instead of using globals.',
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'node:test',
              message: 'Use Vitest for tests in this package.',
            },
            {
              name: '@jest/globals',
              message: 'Use Vitest for tests in this package.',
            },
            {
              name: 'jest',
              message: 'Use Vitest for tests in this package.',
            },
            {
              name: 'jasmine',
              message: 'Use Vitest for tests in this package.',
            },
          ],
          patterns: [
            {
              group: ['@jest/*', 'jest-*', 'karma', 'karma-*'],
              message: 'Use Vitest for tests in this package.',
            },
          ],
        },
      ],
    },
  },
];
