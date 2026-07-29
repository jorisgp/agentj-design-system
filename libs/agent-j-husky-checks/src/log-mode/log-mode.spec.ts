import { describe, expect, it } from 'vitest';
import { getCompactErrorMessage, getLogMode } from './log-mode';

describe('getLogMode', () => {
  it('uses compact logs by default', () => {
    expect(getLogMode(['node', 'agentj-check-branch-name'])).toBe('compact');
  });

  it('uses verbose logs when requested', () => {
    expect(getLogMode(['node', 'agentj-check-branch-name', '--verbose'])).toBe(
      'verbose',
    );
  });
});

describe('getCompactErrorMessage', () => {
  it('keeps only the first meaningful error line', () => {
    expect(
      getCompactErrorMessage(new Error('\nfirst failure\nmore logs')),
    ).toBe('first failure');
  });

  it('handles non-error values', () => {
    expect(getCompactErrorMessage('plain failure')).toBe('plain failure');
  });

  it('falls back for empty messages', () => {
    expect(getCompactErrorMessage(new Error(''))).toBe('unknown error');
  });
});
