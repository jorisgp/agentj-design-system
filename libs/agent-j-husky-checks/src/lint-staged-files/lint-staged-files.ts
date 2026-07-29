#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import {
  getCompactErrorMessage,
  getLogMode,
  type LogMode,
} from '../log-mode/log-mode';

type ExecFileSync = typeof execFileSync;

export interface LintStagedFilesDependencies {
  log: (message: string) => void;
  exec: ExecFileSync;
  mode?: LogMode;
}

const lintFilePattern = /\.(js|jsx|mjs|ts|tsx)$/;

export function getLintableStagedFiles(
  exec: ExecFileSync = execFileSync,
): string[] {
  const output = exec(
    'git',
    ['diff', '--cached', '--name-only', '--diff-filter=ACMR'],
    {
      encoding: 'utf8',
    },
  );

  return output
    .split(/\r?\n/)
    .map((file) => file.trim())
    .filter((file) => lintFilePattern.test(file));
}

export function lintStagedFiles({
  log,
  exec,
  mode = 'compact',
}: LintStagedFilesDependencies): void {
  const files = getLintableStagedFiles(exec);

  if (files.length === 0) {
    if (mode === 'verbose') {
      log('No staged files to lint with ESLint.');
    }

    return;
  }

  try {
    const stdio = mode === 'verbose' ? 'inherit' : 'pipe';

    exec('npx', ['eslint', '--fix', ...files], { stdio });
    exec('git', ['add', ...files], { stdio });

    if (mode === 'verbose') {
      log(`Linted ${files.length} staged file(s) with ESLint.`);
    }
  } catch (error) {
    log(`ESLint failed, continuing push: ${getCompactErrorMessage(error)}`);
  }
}

/* v8 ignore start */
if (require.main === module) {
  lintStagedFiles({
    log: console.log,
    exec: execFileSync,
    mode: getLogMode(process.argv),
  });
}
/* v8 ignore stop */
