import { describe, expect, it } from 'vitest';
import {
  formatStagedFiles,
  getLintableStagedFiles,
  getStagedFiles,
  lintStagedFiles,
  validateCommitMessage,
} from '.';

describe('public barrel', () => {
  it('exports commit validators', () => {
    expect(validateCommitMessage('feat: add feature').valid).toBe(true);
  });

  it('exports staged file helpers', () => {
    expect(formatStagedFiles).toBeTypeOf('function');
    expect(getStagedFiles).toBeTypeOf('function');
    expect(lintStagedFiles).toBeTypeOf('function');
    expect(getLintableStagedFiles).toBeTypeOf('function');
  });
});
