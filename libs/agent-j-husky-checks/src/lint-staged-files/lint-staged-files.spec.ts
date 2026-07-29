import { describe, expect, it, vi } from 'vitest';
import { getLintableStagedFiles, lintStagedFiles } from './lint-staged-files';

describe('getLintableStagedFiles', () => {
  it('returns staged files supported by ESLint', () => {
    const exec = vi.fn(() =>
      [
        'src/index.ts',
        'src/component.tsx',
        'scripts/check.mjs',
        'README.md',
        'styles.scss',
        '',
      ].join('\n'),
    );

    expect(getLintableStagedFiles(exec)).toEqual([
      'src/index.ts',
      'src/component.tsx',
      'scripts/check.mjs',
    ]);
    expect(exec).toHaveBeenCalledWith(
      'git',
      ['diff', '--cached', '--name-only', '--diff-filter=ACMR'],
      { encoding: 'utf8' },
    );
  });
});

describe('lintStagedFiles', () => {
  it('lints and re-stages supported staged files', () => {
    const exec = vi
      .fn()
      .mockReturnValueOnce('src/index.ts\nsrc/component.tsx\n')
      .mockReturnValue('');
    const log = vi.fn();

    lintStagedFiles({ log, exec });

    expect(exec).toHaveBeenNthCalledWith(
      2,
      'npx',
      ['eslint', '--fix', 'src/index.ts', 'src/component.tsx'],
      { stdio: 'pipe' },
    );
    expect(exec).toHaveBeenNthCalledWith(
      3,
      'git',
      ['add', 'src/index.ts', 'src/component.tsx'],
      { stdio: 'pipe' },
    );
    expect(log).not.toHaveBeenCalled();
  });

  it('prints success messages and streams output in verbose mode', () => {
    const exec = vi
      .fn()
      .mockReturnValueOnce('src/index.ts\nsrc/component.tsx\n')
      .mockReturnValue('');
    const log = vi.fn();

    lintStagedFiles({ log, exec, mode: 'verbose' });

    expect(exec).toHaveBeenNthCalledWith(
      2,
      'npx',
      ['eslint', '--fix', 'src/index.ts', 'src/component.tsx'],
      { stdio: 'inherit' },
    );
    expect(log).toHaveBeenCalledWith('Linted 2 staged file(s) with ESLint.');
  });

  it('does nothing quietly when no supported files are staged', () => {
    const exec = vi.fn(() => 'README.md\nstyles.scss\n');
    const log = vi.fn();

    lintStagedFiles({ log, exec });

    expect(exec).toHaveBeenCalledOnce();
    expect(log).not.toHaveBeenCalled();
  });

  it('prints no-op messages in verbose mode', () => {
    const exec = vi.fn(() => 'README.md\nstyles.scss\n');
    const log = vi.fn();

    lintStagedFiles({ log, exec, mode: 'verbose' });

    expect(log).toHaveBeenCalledWith('No staged files to lint with ESLint.');
  });

  it('continues with a compact message when ESLint fails', () => {
    const exec = vi
      .fn()
      .mockReturnValueOnce('src/index.ts\n')
      .mockImplementationOnce(() => {
        throw new Error('\neslint failed\nmore lint noise');
      });
    const log = vi.fn();

    expect(() => lintStagedFiles({ log, exec })).not.toThrow();
    expect(log).toHaveBeenCalledWith(
      'ESLint failed, continuing push: eslint failed',
    );
  });

  it('continues when ESLint throws a non-error value', () => {
    const exec = vi
      .fn()
      .mockReturnValueOnce('src/index.ts\n')
      .mockImplementationOnce(() => {
        throw 'eslint failed';
      });
    const log = vi.fn();

    expect(() => lintStagedFiles({ log, exec })).not.toThrow();
    expect(log).toHaveBeenCalledWith(
      'ESLint failed, continuing push: eslint failed',
    );
  });
});
