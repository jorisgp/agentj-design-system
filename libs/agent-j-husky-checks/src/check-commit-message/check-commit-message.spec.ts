import { describe, expect, it, vi } from 'vitest';
import {
  type CommitMessageCheckDependencies,
  readCommitMessage,
  runCommitMessageCheck,
  validateCommitMessage,
} from './check-commit-message';

function createDependencies(
  overrides: Partial<CommitMessageCheckDependencies> & {
    argv?: string[];
    commitMessage?: string;
  } = {},
) {
  return {
    argv: overrides.argv ?? ['node', 'agentj-check-commit-message'],
    log: vi.fn(),
    exit: vi.fn((code: number) => {
      throw new Error(`exit:${code}`);
    }),
    readCommitMessage: vi.fn(
      () => overrides.commitMessage ?? 'feat(auth): add login form',
    ),
    mode: overrides.mode,
  };
}

describe('runCommitMessageCheck', () => {
  it('reads and validates the commit message file', () => {
    const dependencies = createDependencies({
      argv: ['node', 'agentj-check-commit-message', '.git/COMMIT_EDITMSG'],
    });

    runCommitMessageCheck(dependencies);

    expect(dependencies.readCommitMessage).toHaveBeenCalledWith(
      '.git/COMMIT_EDITMSG',
    );
    expect(dependencies.log).not.toHaveBeenCalled();
    expect(dependencies.exit).not.toHaveBeenCalled();
  });

  it('prints valid commit messages in verbose mode', () => {
    const dependencies = createDependencies({
      argv: [
        'node',
        'agentj-check-commit-message',
        '.git/COMMIT_EDITMSG',
        '--verbose',
      ],
    });

    runCommitMessageCheck(dependencies);

    expect(dependencies.log).toHaveBeenCalledWith(
      'Commit message "feat(auth): add login form" follows the convention.',
    );
  });

  it('treats a missing commit message file argument as invalid input', () => {
    const dependencies = createDependencies();

    expect(() => runCommitMessageCheck(dependencies)).toThrow('exit:1');

    expect(dependencies.readCommitMessage).not.toHaveBeenCalled();
    expect(dependencies.log).toHaveBeenCalledWith('Invalid commit message: ');
    expect(dependencies.log).toHaveBeenCalledWith(
      'Use Conventional Commits: feat(scope): description.',
    );
    expect(dependencies.exit).toHaveBeenCalledWith(1);
  });

  it('prints a compact error and exits when the commit message is invalid', () => {
    const dependencies = createDependencies({
      argv: ['node', 'agentj-check-commit-message', '.git/COMMIT_EDITMSG'],
      commitMessage: 'feature: add login form',
    });

    expect(() => runCommitMessageCheck(dependencies)).toThrow('exit:1');

    expect(dependencies.log).toHaveBeenCalledWith(
      'Invalid commit message: feature: add login form',
    );
    expect(dependencies.exit).toHaveBeenCalledWith(1);
  });

  it('prints examples for invalid commit messages in verbose mode', () => {
    const dependencies = createDependencies({
      argv: ['node', 'agentj-check-commit-message', '.git/COMMIT_EDITMSG'],
      commitMessage: 'feature: add login form',
      mode: 'verbose',
    });

    expect(() => runCommitMessageCheck(dependencies)).toThrow('exit:1');

    expect(dependencies.log).toHaveBeenCalledWith('\nAllowed examples:');
    expect(dependencies.log).toHaveBeenCalledWith(
      '  - feat(auth): add login form',
    );
    expect(dependencies.exit).toHaveBeenCalledWith(1);
  });
});

describe('validateCommitMessage', () => {
  it.each([
    'feat(auth): add login form',
    'fix: handle expired tokens',
    'docs(readme): update usage',
    'release: publish 1.4.0',
    'feat(api)!: remove deprecated endpoint',
    'chore(deps): update angular\n\nBody text is ignored by the first-line check.',
  ])('accepts %s', (commitMessage) => {
    expect(validateCommitMessage(commitMessage).valid).toBe(true);
  });

  it.each([
    '',
    'feature: add login form',
    'feat(auth) add login form',
    'feat(Auth): add login form',
    'feat(auth): Add login form',
    'fix:',
    'merge branch develop',
  ])('rejects %s', (commitMessage) => {
    expect(validateCommitMessage(commitMessage).valid).toBe(false);
  });
});

describe('readCommitMessage', () => {
  it('reads a commit message file as utf8', () => {
    const read = vi.fn(() => 'fix: handle expired tokens');

    expect(readCommitMessage('.git/COMMIT_EDITMSG', read)).toBe(
      'fix: handle expired tokens',
    );
    expect(read).toHaveBeenCalledWith('.git/COMMIT_EDITMSG', 'utf8');
  });
});
