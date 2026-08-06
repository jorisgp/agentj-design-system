#!/usr/bin/env node
import { execFileSync } from 'node:child_process';
import { getLogMode, type LogMode } from '../log-mode/log-mode';

type ExecFileSync = typeof execFileSync;

export type GitflowBranchType = 'feature' | 'hotfix' | 'release';

interface BranchNameValidationResult {
  valid: boolean;
  message: string;
  examples: readonly string[];
}

export const GITFLOW_BASE_BRANCHES = ['main', 'develop'] as const;

export const GITFLOW_BRANCH_TYPES = ['feature', 'hotfix', 'release'] as const;

const branchSlugPattern = '[a-z0-9]+(?:-[a-z0-9]+)*';
const branchPathPattern = `${branchSlugPattern}(?:/${branchSlugPattern})*`;
const releaseVersionPattern =
  '\\d+\\.\\d+\\.\\d+(?:-[a-z0-9]+(?:\\.[a-z0-9]+)*)?';
const gitflowBranchPattern = new RegExp(
  `^(?:${GITFLOW_BASE_BRANCHES.join('|')}|(?:feature|hotfix)\\/${branchSlugPattern}|release\\/(?:${releaseVersionPattern}|${branchPathPattern}))$`,
);

export const branchNameExamples = [
  'main',
  'develop',
  'feature/add-login-form',
  'hotfix/restore-production-login',
  'release/1.4.0',
  'release/components/20260101-01',
] as const;

export const gitflowBranchDescriptions = [
  'main: production-ready code. Releases are tagged here.',
  'develop: integration branch for the next release.',
  'feature/*: individual features, branched from and merged into develop.',
  'release/*: final testing and stabilization, branched from develop, then merged into both main and develop.',
  'hotfix/*: urgent production fixes, branched from main, then merged into both main and develop.',
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
      'Use main, develop, feature/*, release/*, or hotfix/*.',
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
    log('\nAllowed branches:');
    gitflowBranchDescriptions.forEach((description) =>
      log(`  - ${description}`),
    );
    log('\nAllowed examples:');
    result.examples.forEach((example) => log(`  - ${example}`));
  } else {
    log(`Invalid branch name: ${branchName.trim()}`);
    log('Use Gitflow: main, develop, feature/name, release/name, hotfix/name.');
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
