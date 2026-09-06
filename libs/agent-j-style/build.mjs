import { copyFileSync, mkdirSync } from 'node:fs';

const source = new URL('./', import.meta.url);
const output = new URL('../../dist/libs/agent-j-style/', import.meta.url);
mkdirSync(new URL('src/', output), { recursive: true });
for (const file of [
  'package.json',
  'README.md',
  'tailwind-preset.cjs',
  'src/tokens.css',
]) {
  copyFileSync(new URL(file, source), new URL(file, output));
}
