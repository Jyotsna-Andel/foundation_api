#!/usr/bin/env node
// PreToolUse guard: blocks access to secret files and destructive commands.
// Exit code 2 = block the tool call; the message on stderr is shown to Claude.

import { basename } from 'node:path';

const ENV_FILE = /^\.env(\..+)?$/i;
const isSecretFile = (p) => {
  if (!p) return false;
  const name = basename(String(p).replace(/\\/g, '/'));
  return ENV_FILE.test(name) && name.toLowerCase() !== '.env.example';
};

const BLOCKED_COMMANDS = [
  { pattern: /\bprisma\s+migrate\s+reset\b/i, reason: '`prisma migrate reset` wipes the database. Ask the user to run it.' },
  { pattern: /\bgit\s+push\b[^|;&]*\s(--force\b|--force-with-lease\b|-f\b)/i, reason: 'Force-pushing rewrites shared history. Ask the user to run it.' },
  { pattern: /\bgit\s+reset\s+--hard\b/i, reason: '`git reset --hard` discards work. Ask the user to run it.' },
  {
    pattern: /\b(cat|type|more|less|head|tail|gc|get-content|select-string|sls|grep|rg|code|notepad)\b[^|;&]*\.env(?!\.example)\b/i,
    reason: 'Reading .env files is blocked: they hold secrets. Ask the user for the specific non-secret value you need.',
  },
];

function block(reason) {
  process.stderr.write(`Blocked by .claude/hooks/guard.mjs: ${reason}\n`);
  process.exit(2);
}

let raw = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => (raw += chunk));
process.stdin.on('end', () => {
  let input;
  try {
    input = JSON.parse(raw || '{}');
  } catch {
    process.exit(0); // never break the session on malformed input
  }
  const tool = input.tool_name ?? '';
  const args = input.tool_input ?? {};

  if (['Read', 'Edit', 'Write', 'NotebookEdit'].includes(tool) && isSecretFile(args.file_path)) {
    block(`${tool} on ${basename(args.file_path)} is not allowed: .env files hold secrets.`);
  }

  if (tool === 'Grep' && (isSecretFile(args.path) || /\.env(?!\.example)\b/i.test(args.glob ?? ''))) {
    block('Searching inside .env files is not allowed: they hold secrets.');
  }

  if (['Bash', 'PowerShell'].includes(tool)) {
    const command = String(args.command ?? '');
    for (const { pattern, reason } of BLOCKED_COMMANDS) {
      if (pattern.test(command)) block(reason);
    }
  }

  process.exit(0);
});
