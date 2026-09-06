import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, renameSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { readRawVersionPlans } from 'nx/src/command-line/release/config/version-plans.js';

const [groupName, command, ...args] = process.argv.slice(2);
const config = JSON.parse(readFileSync('nx.json', 'utf8'));
const group = config.release.groups[groupName];
if (!group || !['version', 'changelog'].includes(command)) {
  throw new Error(
    'Usage: node scripts/release-group.mjs <group> <version|changelog> [...args]',
  );
}
const allowedKeys = new Set([groupName, ...group.projects]);
const plans = await readRawVersionPlans();
const unrelated = [];
for (const plan of plans) {
  const keys = Object.keys(plan.content);
  const matching = keys.filter((key) => allowedKeys.has(key));
  if (matching.length && matching.length !== keys.length) {
    throw new Error(
      `Split ${plan.fileName} into separate plans per release group before releasing.`,
    );
  }
  if (!matching.length) unrelated.push(plan);
}
const backup = mkdtempSync(join(tmpdir(), 'agent-j-release-plans-'));
const moved = [];
try {
  for (const plan of unrelated) {
    const saved = join(backup, plan.fileName);
    renameSync(plan.absolutePath, saved);
    moved.push([saved, plan.absolutePath]);
  }
  const result = spawnSync(
    'pnpm',
    ['nx', 'release', command, ...args, '--groups', groupName],
    {
      stdio: 'inherit',
    },
  );
  if (result.error) throw result.error;
  process.exitCode = result.status ?? 1;
} finally {
  for (const [saved, original] of moved) renameSync(saved, original);
  rmSync(backup, { recursive: true });
}
