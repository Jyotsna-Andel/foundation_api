#!/usr/bin/env node
// SessionStart: prints the "Current status" section of docs/PROGRESS.md.
// Whatever this prints on stdout is added to Claude's context at the start of each session.

import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

try {
  const projectDir = process.env.CLAUDE_PROJECT_DIR ?? resolve(import.meta.dirname, '..', '..');
  const progressFile = join(projectDir, 'docs', 'PROGRESS.md');
  if (!existsSync(progressFile)) process.exit(0);

  const text = readFileSync(progressFile, 'utf8');
  const match = text.match(/^## Current status\s*$([\s\S]*?)(?=^## |(?![\s\S]))/m);
  if (match) {
    process.stdout.write(
      `Project status from docs/PROGRESS.md (keep it updated after each completed step):\n${match[1].trim()}\n`,
    );
  }
} catch {
  // never block session start
}
process.exit(0);
