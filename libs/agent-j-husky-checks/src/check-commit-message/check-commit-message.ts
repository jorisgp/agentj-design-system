#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { getLogMode, type LogMode } from '../log-mode/log-mode';

type ReadFileSync = typeof readFileSync;

export interface CommitMessageValidationResult {
  valid: boolean;
  message: string;
  examples: readonly string[];
}

export const CONVENTIONAL_COMMIT_TYPES = [
  'build',
  'chore',
  'ci',
  'docs',
  'feat',
  'fix',
  'perf',
  'refactor',
  'release',
  'revert',
  'style',
  'test',
] as const;

const conventionalCommitPattern = new RegExp(
  `^(?:${CONVENTIONAL_COMMIT_TYPES.join('|')})(?:\\([a-z0-9-]+\\))?!?: [a-z0-9].+`,
);

export const commitMessageExamples = [
  'feat(auth): add login form',
  'fix(api): handle expired tokens',
  'hotfix is represented as fix(scope): description',
  'release: publish 1.4.0',
  'chore(deps): update angular',
] as const;

export interface CommitMessageCheckDependencies {
  argv: string[];
  log: (message: string) => void;
  exit: (code: number) => never;
  readCommitMessage: (path: string) => string;
  mode?: LogMode;
}

export function validateCommitMessage(
  commitMessage: string,
): CommitMessageValidationResult {
  const firstLine = commitMessage.trim().split(/\r?\n/, 1)[0];

  if (conventionalCommitPattern.test(firstLine)) {
    return {
      valid: true,
      message: `Commit message "${firstLine}" follows the convention.`,
      examples: commitMessageExamples,
    };
  }

  return {
    valid: false,
    message:
      `Commit message "${firstLine}" does not follow the convention. ` +
      'Use <type>(optional-scope): <description> with an allowed Conventional Commit type.',
    examples: commitMessageExamples,
  };
}

export function readCommitMessage(
  path: string,
  read: ReadFileSync = readFileSync,
): string {
  return read(path, 'utf8');
}

export function runCommitMessageCheck({
  argv,
  log,
  exit,
  readCommitMessage,
  mode = getLogMode(argv),
}: CommitMessageCheckDependencies): void {
  const commitMessageSource = argv[2];
  const commitMessage = commitMessageSource
    ? readCommitMessage(commitMessageSource)
    : '';
  const result = validateCommitMessage(commitMessage);

  if (result.valid) {
    if (mode === 'verbose') {
      log(result.message);
    }

    return;
  }

  if (mode === 'verbose') {
    log(result.message);
    log('\nAllowed examples:');
    result.examples.forEach((example) => log(`  - ${example}`));
  } else {
    const firstLine = commitMessage.trim().split(/\r?\n/, 1)[0];

    log(`Invalid commit message: ${firstLine}`);
    log('Use Conventional Commits: feat(scope): description.');
  }

  exit(1);
}

/* v8 ignore start */
if (require.main === module) {
  runCommitMessageCheck({
    argv: process.argv,
    log: console.log,
    exit: process.exit as (code: number) => never,
    readCommitMessage,
  });
}
/* v8 ignore stop */
