import { describe, expect, it, vi } from 'vitest';
import {
  type BranchNameCheckDependencies,
  getCurrentBranchName,
  runBranchNameCheck,
} from './check-branch-name';

function createDependencies(
  overrides: Partial<BranchNameCheckDependencies> & {
    argv?: string[];
    currentBranchName?: string;
  } = {},
) {
  return {
    argv: overrides.argv ?? ['node', 'agentj-check-branch-name'],
    log: vi.fn(),
    exit: vi.fn((code: number) => {
      throw new Error(`exit:${code}`);
    }),
    getCurrentBranchName: vi.fn(
      () => overrides.currentBranchName ?? 'feature/add-login-form',
    ),
    mode: overrides.mode,
  };
}

describe('runBranchNameCheck', () => {
  it('validates the branch name passed as an argument', () => {
    const dependencies = createDependencies({
      argv: ['node', 'agentj-check-branch-name', 'develop'],
    });

    runBranchNameCheck(dependencies);

    expect(dependencies.getCurrentBranchName).not.toHaveBeenCalled();
    expect(dependencies.log).not.toHaveBeenCalled();
    expect(dependencies.exit).not.toHaveBeenCalled();
  });

  it('reads the current branch when no branch argument is passed', () => {
    const dependencies = createDependencies({
      currentBranchName: 'release/1.4.0',
    });

    runBranchNameCheck(dependencies);

    expect(dependencies.getCurrentBranchName).toHaveBeenCalledOnce();
    expect(dependencies.log).not.toHaveBeenCalled();
  });

  it('prints valid branch messages in verbose mode', () => {
    const dependencies = createDependencies({
      argv: ['node', 'agentj-check-branch-name', 'develop', '--verbose'],
    });

    runBranchNameCheck(dependencies);

    expect(dependencies.log).toHaveBeenCalledWith(
      'Branch name "develop" follows Gitflow.',
    );
  });

  it('prints a compact error and exits when the branch name is invalid', () => {
    const dependencies = createDependencies({
      argv: ['node', 'agentj-check-branch-name', 'invalid_branch'],
    });

    expect(() => runBranchNameCheck(dependencies)).toThrow('exit:1');

    expect(dependencies.log).toHaveBeenCalledWith(
      'Invalid branch name: invalid_branch',
    );
    expect(dependencies.log).toHaveBeenCalledWith(
      'Use Gitflow: main, develop, feature/name, release/name, hotfix/name.',
    );
    expect(dependencies.exit).toHaveBeenCalledWith(1);
  });

  it('prints examples for invalid branch names in verbose mode', () => {
    const dependencies = createDependencies({
      argv: ['node', 'agentj-check-branch-name', 'invalid_branch'],
      mode: 'verbose',
    });

    expect(() => runBranchNameCheck(dependencies)).toThrow('exit:1');

    expect(dependencies.log).toHaveBeenCalledWith('\nAllowed examples:');
    expect(dependencies.log).toHaveBeenCalledWith('  - feature/add-login-form');
    expect(dependencies.log).toHaveBeenCalledWith(
      '  - main: production-ready code. Releases are tagged here.',
    );
    expect(dependencies.exit).toHaveBeenCalledWith(1);
  });
});

describe('runBranchNameCheck branch validation', () => {
  it.each([
    'main',
    'develop',
    'feature/add-login-form',
    'hotfix/restore-production-login',
    'release/1.4.0',
    'release/1.4.0-beta.1',
    'release/components/20260101-01',
  ])('accepts %s', (branchName) => {
    const dependencies = createDependencies({
      argv: ['node', 'agentj-check-branch-name', branchName],
    });

    runBranchNameCheck(dependencies);

    expect(dependencies.exit).not.toHaveBeenCalled();
  });

  it.each([
    '',
    'master',
    'feature',
    'feature/Add-login-form',
    'feature/add_login_form',
    'bugfix/fix-token-refresh',
    'fix/token-refresh',
    'release/v1.4.0',
    'release/one_four_zero',
    'support/node-24-upgrade',
    'develop/something',
  ])('rejects %s', (branchName) => {
    const dependencies = createDependencies({
      argv: ['node', 'agentj-check-branch-name', branchName],
    });

    expect(() => runBranchNameCheck(dependencies)).toThrow('exit:1');
    expect(dependencies.exit).toHaveBeenCalledWith(1);
  });
});

describe('getCurrentBranchName', () => {
  it('reads and trims the current git branch name', () => {
    const exec = vi.fn(() => 'feature/add-login-form\n');

    expect(getCurrentBranchName(exec)).toBe('feature/add-login-form');
    expect(exec).toHaveBeenCalledWith(
      'git',
      ['symbolic-ref', '--short', '-q', 'HEAD'],
      { encoding: 'utf8' },
    );
  });
});
