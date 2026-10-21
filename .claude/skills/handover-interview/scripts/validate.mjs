#!/usr/bin/env node
// Checks docs/knowledge before it is committed:
//  - cards: required fields, approval, linked files exist, line ranges fit,
//    commits exist, transcript links point to real anchors
//  - transcripts: required fields, consent, valid status, unique anchors,
//    every question heading has an anchor
//  - everything: secret scan
// Usage (repo root): node .claude/skills/handover-interview/scripts/validate.mjs [--knowledge docs/knowledge]
// Exit code 1 when any error is found (usable in CI).

import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  anchorsIn,
  CONFIDENCE,
  findSecrets,
  listKnowledgeFiles,
  readKnowledge,
  SESSION_STATUSES,
} from './lib/knowledge.mjs';

const argv = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : fallback;
};
const repo = process.cwd();
const knowledgeDir = join(repo, opt('knowledge', 'docs/knowledge'));
const DATE = /^\d{4}-\d{2}-\d{2}$/;

const errors = [];
const warnings = [];
const err = (file, msg) => errors.push(`${file}: ${msg}`);
const warn = (file, msg) => warnings.push(`${file}: ${msg}`);

const commitExists = (sha) =>
  spawnSync('git', ['-C', repo, 'cat-file', '-e', `${sha}^{commit}`]).status === 0;

const transcriptAnchors = new Map(); // rel path -> Set(anchors)

function checkSession(rel) {
  const file = `sessions/${rel.replace(/^sessions\//, '')}`;
  const full = join(knowledgeDir, rel);
  const text = readFileSync(full, 'utf8');
  const { data, body } = readKnowledge(knowledgeDir, rel);
  if (!data) return err(file, 'missing frontmatter');

  for (const key of ['person', 'date', 'status', 'consent', 'consent_at']) {
    if (!data[key] || data[key] === '') err(file, `missing "${key}"`);
  }
  if (data.date && !DATE.test(data.date)) err(file, `date must be YYYY-MM-DD (got ${data.date})`);
  if (data.status && !SESSION_STATUSES.includes(data.status))
    err(file, `status must be one of ${SESSION_STATUSES.join(', ')} (got ${data.status})`);
  if (data.consent && data.consent !== 'yes') err(file, 'consent must be "yes"');
  if (data.status === 'in-progress')
    warn(file, 'still in-progress: review with the expert before committing');

  const anchors = anchorsIn(text);
  const seen = new Set();
  for (const a of anchors) {
    if (seen.has(a)) err(file, `duplicate anchor "${a}"`);
    seen.add(a);
  }
  transcriptAnchors.set(rel, seen);

  // Every "### Q…" heading must be directly preceded by an explicit anchor.
  const lines = body.split('\n');
  lines.forEach((line, i) => {
    if (/^###\s+Q\d/.test(line)) {
      const prev = lines.slice(Math.max(0, i - 2), i).join('\n');
      if (!/<a id="q[\d-]+"><\/a>/.test(prev))
        err(file, `question heading "${line.trim()}" has no <a id="q…"></a> anchor above it`);
    }
  });
}

function checkCard(rel) {
  const { data } = readKnowledge(knowledgeDir, rel);
  if (!data) return err(rel, 'missing frontmatter');

  for (const key of ['title', 'owner', 'captured', 'confidence', 'approved_by', 'approved_at'])
    if (!data[key] || data[key] === '') err(rel, `missing "${key}"`);
  if (data.captured && !DATE.test(data.captured)) err(rel, `captured must be YYYY-MM-DD`);
  if (data.confidence && !CONFIDENCE.includes(data.confidence))
    err(rel, `confidence must be one of ${CONFIDENCE.join(', ')}`);

  const files = Array.isArray(data.files) ? data.files : [];
  if (files.length === 0) warn(rel, 'no linked files');
  for (const f of files) {
    const path = typeof f === 'string' ? f : f.path;
    if (!path) continue;
    const full = join(repo, path);
    if (!existsSync(full)) {
      err(rel, `linked file not found: ${path}`);
      continue;
    }
    if (f.lines) {
      const m = /^(\d+)(?:-(\d+))?$/.exec(String(f.lines));
      const total = readFileSync(full, 'utf8').split('\n').length;
      if (!m) err(rel, `lines must look like "12-30" (got ${f.lines}) for ${path}`);
      else if (Number(m[2] ?? m[1]) > total || Number(m[1]) < 1 || Number(m[2] ?? m[1]) < Number(m[1]))
        err(rel, `lines ${f.lines} out of range for ${path} (${total} lines)`);
    }
  }

  for (const c of Array.isArray(data.commits) ? data.commits : []) {
    const sha = String(c).split(/\s+/)[0];
    if (!/^[0-9a-f]{7,40}$/.test(sha)) err(rel, `commit entry should start with a SHA: "${c}"`);
    else if (!commitExists(sha)) err(rel, `commit ${sha} not found in this repo`);
  }

  for (const t of Array.isArray(data.transcript) ? data.transcript : []) {
    const [path, anchor] = String(t).split('#');
    if (!transcriptAnchors.has(path)) err(rel, `transcript not found: ${path}`);
    else if (anchor && !transcriptAnchors.get(path).has(anchor))
      err(rel, `transcript anchor #${anchor} not found in ${path}`);
  }
}

const { cards, sessions } = listKnowledgeFiles(knowledgeDir);
sessions.forEach(checkSession); // first: cards link into transcripts
cards.forEach(checkCard);

for (const rel of [...cards, ...sessions, 'INDEX.md']) {
  const full = join(knowledgeDir, rel);
  if (!existsSync(full)) continue;
  for (const hit of findSecrets(readFileSync(full, 'utf8')))
    err(rel, `possible secret (${hit.name}) on line ${hit.line}: replace it with <redacted>`);
}

console.log(`Checked ${cards.length} card(s) and ${sessions.length} transcript(s) in ${opt('knowledge', 'docs/knowledge')}`);
for (const w of warnings) console.log(`  warning  ${w}`);
for (const e of errors) console.log(`  ERROR    ${e}`);
console.log(errors.length ? `\n${errors.length} error(s).` : '\nAll checks passed.');
process.exit(errors.length ? 1 : 0);
