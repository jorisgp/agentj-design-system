#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import {
  getCompactErrorMessage,
  getLogMode,
  type LogMode,
} from '../log-mode/log-mode';

type ExecFileSync = typeof execFileSync;

export interface FormatStagedFilesDependencies {
  log: (message: string) => void;
  exec: ExecFileSync;
  mode?: LogMode;
}

const prettierFilePattern =
  /\.(css|html|js|json|jsx|md|mdx|mjs|scss|ts|tsx|yaml|yml)$/;

export function getStagedFiles(exec: ExecFileSync = execFileSync): string[] {
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
    .filter((file) => prettierFilePattern.test(file));
}

export function formatStagedFiles({
  log,
  exec,
  mode = 'compact',
}: FormatStagedFilesDependencies): void {
  const files = getStagedFiles(exec);

  if (files.length === 0) {
    if (mode === 'verbose') {
      log('No staged files to format with Prettier.');
    }

    return;
  }

  try {
    const stdio = mode === 'verbose' ? 'inherit' : 'pipe';

    exec('npx', ['prettier', '--write', ...files], { stdio });
    exec('git', ['add', ...files], { stdio });

    if (mode === 'verbose') {
      log(`Formatted ${files.length} staged file(s) with Prettier.`);
    }
  } catch (error) {
    log(`Prettier failed, continuing push: ${getCompactErrorMessage(error)}`);
  }
}

/* v8 ignore start */
if (require.main === module) {
  formatStagedFiles({
    log: console.log,
    exec: execFileSync,
    mode: getLogMode(process.argv),
  });
}
/* v8 ignore stop */
