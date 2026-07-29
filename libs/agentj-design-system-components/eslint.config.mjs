import nx from '@nx/eslint-plugin';
import { existsSync } from 'node:fs';
import { basename, dirname, join, relative, sep } from 'node:path';
import baseConfig from '../../eslint.config.mjs';

const componentBarrelRule = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Require component folders under src/lib to expose a root index.ts barrel.',
    },
    messages: {
      missingBarrel:
        'Component folder "{{ directory }}" must expose a root index.ts barrel.',
    },
    schema: [],
  },
  create(context) {
    return {
      Program(node) {
        const filename = context.filename ?? context.getFilename();

        if (
          filename === '<input>' ||
          filename.endsWith('.spec.ts') ||
          filename.endsWith('.stories.ts') ||
          basename(filename) === 'index.ts'
        ) {
          return;
        }

        const directory = dirname(filename);
        const relativeDirectory = relative(process.cwd(), directory);
        const pathParts = relativeDirectory.split(sep);
        const srcLibIndex = pathParts.join('/').indexOf('src/lib/');

        if (srcLibIndex === -1 || pathParts.length < 5) {
          return;
        }

        const componentRoot = pathParts.slice(-2);
        const isComponentDirectory =
          ['composites', 'features', 'primitives', 'ui-components'].includes(
            componentRoot[0],
          ) && componentRoot[1] !== undefined;

        if (!isComponentDirectory || existsSync(join(directory, 'index.ts'))) {
          return;
        }

        context.report({
          node,
          messageId: 'missingBarrel',
          data: {
            directory: relativeDirectory,
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
      'agentj-components': {
        rules: {
          'require-component-barrel': componentBarrelRule,
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
          ignoredFiles: ['{projectRoot}/eslint.config.{js,cjs,mjs,ts,cts,mts}'],
        },
      ],
    },
    languageOptions: {
      parser: await import('jsonc-eslint-parser'),
    },
  },
  ...nx.configs['flat/angular'],
  ...nx.configs['flat/angular-template'],
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'aac-all',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'aac-all',
          style: 'kebab-case',
        },
      ],
      'agentj-components/require-component-barrel': 'error',
    },
  },
  {
    files: ['**/*.spec.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@angular/core/testing',
              message:
                'Use Vitest with @testing-library/angular instead of direct Angular TestBed APIs.',
            },
          ],
          patterns: [
            {
              group: ['jasmine', 'karma', '@jest/*', 'jest', 'jest-*'],
              message:
                'Component specs must use Vitest with @testing-library/angular.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    // Override or add rules here
    rules: {},
  },
];
