import { describe, expect, it, vi } from 'vitest';
import { formatStagedFiles, getStagedFiles } from './format-staged-files';

describe('getStagedFiles', () => {
  it('returns staged files supported by Prettier', () => {
    const exec = vi.fn(() =>
      ['src/index.ts', 'README.md', 'dist/output.js.map', 'image.png', ''].join(
        '\n',
      ),
    );

    expect(getStagedFiles(exec)).toEqual(['src/index.ts', 'README.md']);
    expect(exec).toHaveBeenCalledWith(
      'git',
      ['diff', '--cached', '--name-only', '--diff-filter=ACMR'],
      { encoding: 'utf8' },
    );
  });
});

describe('formatStagedFiles', () => {
  it('formats and re-stages supported staged files', () => {
    const exec = vi
      .fn()
      .mockReturnValueOnce('src/index.ts\npackage.json\n')
      .mockReturnValue('');
    const log = vi.fn();

    formatStagedFiles({ log, exec });

    expect(exec).toHaveBeenNthCalledWith(
      2,
      'npx',
      ['prettier', '--write', 'src/index.ts', 'package.json'],
      { stdio: 'pipe' },
    );
    expect(exec).toHaveBeenNthCalledWith(
      3,
      'git',
      ['add', 'src/index.ts', 'package.json'],
      { stdio: 'pipe' },
    );
    expect(log).not.toHaveBeenCalled();
  });

  it('prints success messages and streams output in verbose mode', () => {
    const exec = vi
      .fn()
      .mockReturnValueOnce('src/index.ts\npackage.json\n')
      .mockReturnValue('');
    const log = vi.fn();

    formatStagedFiles({ log, exec, mode: 'verbose' });

    expect(exec).toHaveBeenNthCalledWith(
      2,
      'npx',
      ['prettier', '--write', 'src/index.ts', 'package.json'],
      { stdio: 'inherit' },
    );
    expect(log).toHaveBeenCalledWith(
      'Formatted 2 staged file(s) with Prettier.',
    );
  });

  it('does nothing quietly when no supported files are staged', () => {
    const exec = vi.fn(() => 'image.png\n');
    const log = vi.fn();

    formatStagedFiles({ log, exec });

    expect(exec).toHaveBeenCalledOnce();
    expect(log).not.toHaveBeenCalled();
  });

  it('prints no-op messages in verbose mode', () => {
    const exec = vi.fn(() => 'image.png\n');
    const log = vi.fn();

    formatStagedFiles({ log, exec, mode: 'verbose' });

    expect(log).toHaveBeenCalledWith(
      'No staged files to format with Prettier.',
    );
  });

  it('continues with a compact message when Prettier fails', () => {
    const exec = vi
      .fn()
      .mockReturnValueOnce('src/index.ts\n')
      .mockImplementationOnce(() => {
        throw new Error('\nprettier failed\nmore formatter noise');
      });
    const log = vi.fn();

    expect(() => formatStagedFiles({ log, exec })).not.toThrow();
    expect(log).toHaveBeenCalledWith(
      'Prettier failed, continuing push: prettier failed',
    );
  });

  it('continues when Prettier throws a non-error value', () => {
    const exec = vi
      .fn()
      .mockReturnValueOnce('src/index.ts\n')
      .mockImplementationOnce(() => {
        throw 'prettier failed';
      });
    const log = vi.fn();

    expect(() => formatStagedFiles({ log, exec })).not.toThrow();
    expect(log).toHaveBeenCalledWith(
      'Prettier failed, continuing push: prettier failed',
    );
  });
});
