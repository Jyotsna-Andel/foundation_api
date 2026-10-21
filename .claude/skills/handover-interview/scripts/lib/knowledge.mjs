// Shared helpers for the knowledge-base scripts (no dependencies).
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

export const SESSION_STATUSES = ['in-progress', 'reviewed', 'closed-partial'];
export const CONFIDENCE = ['high', 'medium', 'low'];

/**
 * Parses the YAML subset used by cards and transcripts:
 * scalars, inline lists `[a, b]`, block lists of scalars, and block lists of
 * small maps (`- path: x` / `  lines: 1-2`). Trailing `# comments` are removed.
 */
export function parseFrontmatter(text) {
  const normalised = text.replace(/\r\n/g, '\n');
  const match = /^---\n([\s\S]*?)\n---\n?/.exec(normalised);
  if (!match) return { data: null, body: normalised };

  const data = {};
  let key = null;
  let item = null;
  const clean = (v) =>
    v
      .replace(/\s+#.*$/, '')
      .trim()
      .replace(/^["']|["']$/g, '');

  for (const raw of match[1].split('\n')) {
    if (!raw.trim() || raw.trim().startsWith('#')) continue;
    const top = /^([A-Za-z_][\w-]*):\s*(.*)$/.exec(raw);
    if (top) {
      key = top[1];
      item = null;
      const value = clean(top[2]);
      if (value === '') data[key] = [];
      else if (value.startsWith('[') && value.endsWith(']'))
        data[key] = value
          .slice(1, -1)
          .split(',')
          .map((v) => clean(v))
          .filter(Boolean);
      else data[key] = value;
      continue;
    }
    const listItem = /^\s+-\s+(.*)$/.exec(raw);
    if (listItem && key) {
      const inner = /^([A-Za-z_][\w-]*):\s*(.*)$/.exec(listItem[1]);
      if (inner) {
        item = { [inner[1]]: clean(inner[2]) };
        data[key].push(item);
      } else {
        item = null;
        data[key].push(clean(listItem[1]));
      }
      continue;
    }
    const nested = /^\s+([A-Za-z_][\w-]*):\s*(.*)$/.exec(raw);
    if (nested && item) item[nested[1]] = clean(nested[2]);
  }
  return { data, body: normalised.slice(match[0].length) };
}

/** Lists knowledge files: cards (any .md outside sessions/, except INDEX.md) and transcripts. */
export function listKnowledgeFiles(knowledgeDir) {
  const cards = [];
  const sessions = [];
  if (!existsSync(knowledgeDir)) return { cards, sessions };
  const walk = (dir) => {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) walk(full);
      else if (entry.endsWith('.md') && full !== join(knowledgeDir, 'INDEX.md')) {
        const rel = relative(knowledgeDir, full).replace(/\\/g, '/');
        (rel.startsWith('sessions/') ? sessions : cards).push(rel);
      }
    }
  };
  walk(knowledgeDir);
  return { cards: cards.sort(), sessions: sessions.sort() };
}

export const readKnowledge = (knowledgeDir, rel) =>
  parseFrontmatter(readFileSync(join(knowledgeDir, rel), 'utf8'));

/** Explicit anchors in a transcript: <a id="q1"></a>, <a id="q1-1"></a>. */
export const anchorsIn = (text) =>
  [...text.matchAll(/<a id="([^"]+)"><\/a>/g)].map((m) => m[1]);

/** Patterns that look like real secrets. `<redacted>` and placeholders never match. */
export const SECRET_PATTERNS = [
  ['AWS access key', /\bAKIA[0-9A-Z]{16}\b/],
  ['GitHub token', /\bgh[pousr]_[A-Za-z0-9]{30,}\b/],
  ['Slack token', /\bxox[abprs]-[A-Za-z0-9-]{10,}/],
  ['API key (sk-…)', /\bsk-[A-Za-z0-9_-]{20,}\b/],
  ['Private key', /-----BEGIN [A-Z ]*PRIVATE KEY-----/],
  ['Bearer token', /\bBearer\s+[A-Za-z0-9._~+/-]{20,}=*/],
  ['JWT', /\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/],
  ['Credentialed URL', /\b[a-z][a-z0-9+.-]*:\/\/[^\s:/@<>]+:(?!<redacted>)[^\s@/<>]{3,}@/i],
  ['Password assignment', /\b(password|passwd|pwd|secret|api[_-]?key|token)\s*[:=]\s*(?!<redacted>)["']?[^\s"'<>]{6,}/i],
];

export function findSecrets(text) {
  const hits = [];
  text.split(/\r?\n/).forEach((line, i) => {
    for (const [name, re] of SECRET_PATTERNS) {
      if (re.test(line)) hits.push({ line: i + 1, name });
    }
  });
  return hits;
}
