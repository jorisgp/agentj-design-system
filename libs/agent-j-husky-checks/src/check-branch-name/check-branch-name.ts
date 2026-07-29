#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { getLogMode, type LogMode } from '../log-mode/log-mode';

type ExecFileSync = typeof execFileSync;

export type GitflowBranchType =
  | 'feature'
  | 'bugfix'
  | 'hotfix'
  | 'release'
  | 'support';

interface BranchNameValidationResult {
  valid: boolean;
  message: string;
  examples: readonly string[];
}

export const GITFLOW_BASE_BRANCHES = ['main', 'master', 'develop'] as const;

export const GITFLOW_BRANCH_TYPES = [
  'feature',
  'bugfix',
  'hotfix',
  'release',
  'support',
] as const;

const branchSlugPattern = '[a-z0-9]+(?:-[a-z0-9]+)*';
const releaseVersionPattern =
  '\\d+\\.\\d+\\.\\d+(?:-[a-z0-9]+(?:\\.[a-z0-9]+)*)?';
const gitflowBranchPattern = new RegExp(
  `^(?:${GITFLOW_BASE_BRANCHES.join('|')}|(?:feature|bugfix|hotfix|support)\\/${branchSlugPattern}|release\\/${releaseVersionPattern})$`,
);

export const branchNameExamples = [
  'main',
  'develop',
  'feature/add-login-form',
  'bugfix/fix-token-refresh',
  'hotfix/restore-production-login',
  'release/1.4.0',
  'support/node-24-upgrade',
] as const;

export interface BranchNameCheckDependencies {
  argv: string[];
  log: (message: string) => void;
  exit: (code: number) => never;
  getCurrentBranchName: () => string;
  mode?: LogMode;
}

function checkBranchName(branchName: string): BranchNameValidationResult {
  const normalizedBranchName = branchName.trim();

  if (gitflowBranchPattern.test(normalizedBranchName)) {
    return {
      valid: true,
      message: `Branch name "${normalizedBranchName}" follows Gitflow.`,
      examples: branchNameExamples,
    };
  }

  return {
    valid: false,
    message:
      `Branch name "${normalizedBranchName}" does not follow Gitflow. ` +
      'Use main, master, develop, or a typed branch with a lowercase kebab-case name.',
    examples: branchNameExamples,
  };
}

export function getCurrentBranchName(
  exec: ExecFileSync = execFileSync,
): string {
  return exec('git', ['symbolic-ref', '--short', '-q', 'HEAD'], {
    encoding: 'utf8',
  }).trim();
}

export function runBranchNameCheck({
  argv,
  log,
  exit,
  getCurrentBranchName,
  mode = getLogMode(argv),
}: BranchNameCheckDependencies): void {
  const branchName = argv[2] ?? getCurrentBranchName();
  const result = checkBranchName(branchName);

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
    log(`Invalid branch name: ${branchName.trim()}`);
    log(
      'Use Gitflow: feature/name, bugfix/name, hotfix/name, release/1.2.3, support/name.',
    );
  }

  exit(1);
}

/* v8 ignore start */
if (require.main === module) {
  runBranchNameCheck({
    argv: process.argv,
    log: console.log,
    exit: process.exit as (code: number) => never,
    getCurrentBranchName,
  });
}
/* v8 ignore stop */
