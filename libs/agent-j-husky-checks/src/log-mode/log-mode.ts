export type LogMode = 'compact' | 'verbose';

export function getLogMode(argv: readonly string[]): LogMode {
  return argv.includes('--verbose') ? 'verbose' : 'compact';
}

export function getCompactErrorMessage(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error);
  const firstLine = message
    .split(/\r?\n/)
    .map((line) => line.trim())
    .find(Boolean);

  return firstLine ?? 'unknown error';
}
