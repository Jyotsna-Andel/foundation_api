#!/usr/bin/env node
// PostToolUse formatter: runs the project's Prettier (from api/node_modules) on files Claude edits.
// Never blocks: any failure exits 0 so a formatting problem can't interrupt work.

import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';

const FORMATTABLE = new Set(['.ts', '.tsx', '.js', '.mjs', '.cjs', '.json', '.md']);
const SKIP = /[\\/](node_modules|dist|coverage|generated|migrations)[\\/]/;

let raw = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => (raw += chunk));
process.stdin.on('end', () => {
  try {
    const input = JSON.parse(raw || '{}');
    const file = input.tool_input?.file_path ?? input.tool_response?.filePath;
    if (!file || !FORMATTABLE.has(extname(file).toLowerCase()) || SKIP.test(file)) process.exit(0);

    const projectDir = process.env.CLAUDE_PROJECT_DIR ?? resolve(import.meta.dirname, '..', '..');
    const prettier = join(projectDir, 'api', 'node_modules', 'prettier', 'bin', 'prettier.cjs');
    if (!existsSync(prettier) || !existsSync(file)) process.exit(0);

    spawnSync(process.execPath, [prettier, '--write', '--log-level', 'warn', file], {
      cwd: join(projectDir, 'api'),
      stdio: ['ignore', 'ignore', 'inherit'],
      timeout: 20_000,
    });
  } catch {
    // ignore: formatting is best-effort
  }
  process.exit(0);
});
