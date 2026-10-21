#!/usr/bin/env node
// Knowledge-risk map for a handover interview.
//
// Scores every tracked source file by how much ONE person owns it:
//   risk = owner_share x complexity x recency_weight x (1 - coverage)
//   owner_share    = average of commit share and blame (lines-owned) share
//   complexity     = log-scaled lines of code, normalised to 0..1 across files
//   recency_weight = 0.5 + 0.5 * e^(-days_since_last_change / 180)
//   coverage       = 1 if a knowledge card in docs/knowledge links the file, else 0
//   (test files count half: tests document themselves, so they are rarely tribal knowledge)
//
// Usage (from the repo root):
//   node .claude/skills/handover-interview/scripts/ownership.mjs --list-authors
//   node .claude/skills/handover-interview/scripts/ownership.mjs --author "jane@x.com,Jane Doe" [--top 10] [--json]
// Options: --repo <path> (default: cwd)  --knowledge <dir> (default: docs/knowledge)  --all (include non-code files)

import { spawnSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { extname, join, relative } from 'node:path';

const args = parseArgs(process.argv.slice(2));
const repo = args.repo ?? process.cwd();
const knowledgeDir = join(repo, args.knowledge ?? 'docs/knowledge');

const CODE_EXT = new Set([
  '.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs', '.prisma', '.sql',
  '.py', '.go', '.java', '.kt', '.cs', '.rb', '.php', '.rs', '.sh',
  '.yml', '.yaml', '.css', '.scss', '.html', '.vue', '.svelte',
]);
const SKIP = /(^|\/)(node_modules|dist|build|coverage|generated|vendor|\.git)\//;
const TEST_FILE = /[.-](spec|test)\.[cm]?[jt]sx?$|(^|\/)(test|tests|__tests__)\//;
const SKIP_FILES = /(package-lock\.json|pnpm-lock\.yaml|yarn\.lock|\.min\.js)$/;

function parseArgs(argv) {
  const out = {};
  for (let i = 0; i < argv.length; i++) {
    const key = argv[i].replace(/^--/, '');
    const next = argv[i + 1];
    if (next === undefined || next.startsWith('--')) out[key] = true;
    else out[key] = argv[++i];
  }
  return out;
}

function git(...gitArgs) {
  const res = spawnSync('git', ['-C', repo, ...gitArgs], {
    encoding: 'utf8',
    maxBuffer: 512 * 1024 * 1024,
  });
  if (res.status !== 0) {
    throw new Error(`git ${gitArgs.join(' ')} failed: ${res.stderr.trim()}`);
  }
  return res.stdout;
}

const isSourceFile = (path) =>
  !SKIP.test(path) &&
  !SKIP_FILES.test(path) &&
  (args.all || CODE_EXT.has(extname(path).toLowerCase()));

// --- 1. Contributors -------------------------------------------------------

function listAuthors() {
  const counts = new Map();
  for (const line of git('log', '--format=%aE%x09%aN').split('\n')) {
    if (!line.trim()) continue;
    counts.set(line, (counts.get(line) ?? 0) + 1);
  }
  const rows = [...counts.entries()]
    .map(([key, commits]) => {
      const [email, name] = key.split('\t');
      return { email, name, commits };
    })
    .sort((a, b) => b.commits - a.commits);
  if (args.json) return console.log(JSON.stringify(rows, null, 2));
  console.log('Contributors (email | name | commits):');
  for (const r of rows) console.log(`  ${r.email} | ${r.name} | ${r.commits}`);
}

// --- 2. Ownership from history + blame -----------------------------------

function makeMatcher(aliasList) {
  const aliases = aliasList
    .split(',')
    .map((a) => a.trim().toLowerCase())
    .filter(Boolean);
  return (email, name) =>
    aliases.includes((email ?? '').toLowerCase()) ||
    aliases.includes((name ?? '').toLowerCase());
}

function historyStats(isOwner) {
  // One pass over the whole history: per-file commit counts and last-change dates.
  const out = git(
    'log', '--no-renames', '--numstat', '--format=@@%H%x09%aE%x09%aN%x09%at%x09%s',
  );
  const files = new Map();
  const ownerCommits = new Map(); // path -> [{ sha, subject }]
  let current = null;

  for (const line of out.split('\n')) {
    if (line.startsWith('@@')) {
      const [sha, email, name, at, ...subject] = line.slice(2).split('\t');
      current = {
        sha, at: Number(at) * 1000, mine: isOwner(email, name), subject: subject.join('\t'),
      };
      continue;
    }
    const m = /^(\d+|-)\t(\d+|-)\t(.+)$/.exec(line);
    if (!m || !current) continue;
    const path = m[3];
    const f = files.get(path) ?? { commits: 0, mine: 0, lastChange: 0, myLastTouch: 0 };
    f.commits++;
    f.lastChange = Math.max(f.lastChange, current.at);
    if (current.mine) {
      f.mine++;
      f.myLastTouch = Math.max(f.myLastTouch, current.at);
      const list = ownerCommits.get(path) ?? [];
      if (list.length < 5) list.push({ sha: current.sha.slice(0, 7), subject: current.subject });
      ownerCommits.set(path, list);
    }
    files.set(path, f);
  }
  return { files, ownerCommits };
}

function blameShare(path, isOwner) {
  const out = spawnSync('git', ['-C', repo, 'blame', '--line-porcelain', '-w', 'HEAD', '--', path], {
    encoding: 'utf8',
    maxBuffer: 256 * 1024 * 1024,
  });
  if (out.status !== 0) return { lines: 0, mine: 0 };
  let lines = 0;
  let mine = 0;
  let name = '';
  for (const line of out.stdout.split('\n')) {
    if (line.startsWith('author ')) name = line.slice(7);
    else if (line.startsWith('author-mail ')) {
      const email = line.slice(12).replace(/[<>]/g, '');
      lines++;
      if (isOwner(email, name)) mine++;
    }
  }
  return { lines, mine };
}

// --- 3. Coverage from existing knowledge cards ----------------------------

function coveredPaths() {
  const covered = new Set();
  if (!existsSync(knowledgeDir)) return covered;
  const walk = (dir) => {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) {
        if (entry !== 'sessions') walk(full);
      } else if (entry.endsWith('.md') && entry !== 'INDEX.md') {
        const text = readFileSync(full, 'utf8');
        const front = /^---\n([\s\S]*?)\n---/.exec(text.replace(/\r\n/g, '\n'));
        if (!front) continue;
        for (const m of front[1].matchAll(/^\s*-?\s*path:\s*["']?([^"'\n#]+?)["']?\s*$/gm)) {
          covered.add(m[1].trim().replace(/\\/g, '/'));
        }
      }
    }
  };
  walk(knowledgeDir);
  return covered;
}

// --- 4. Score -----------------------------------------------------------------

function riskMap(aliasList) {
  const isOwner = makeMatcher(aliasList);
  const tracked = git('ls-files').split('\n').filter((p) => p && isSourceFile(p));
  const { files: history, ownerCommits } = historyStats(isOwner);
  const covered = coveredPaths();
  const now = Date.now();

  const rows = [];
  for (const path of tracked) {
    const h = history.get(path);
    if (!h || h.mine === 0) continue; // the person never touched it
    const blame = blameShare(path, isOwner);
    if (blame.lines === 0) continue;

    const commitShare = h.mine / h.commits;
    const lineShare = blame.mine / blame.lines;
    const ownerShare = (commitShare + lineShare) / 2;
    const ageDays = (now - h.lastChange) / 86_400_000;
    rows.push({
      path,
      loc: blame.lines,
      commitShare,
      lineShare,
      ownerShare,
      recencyWeight: 0.5 + 0.5 * Math.exp(-ageDays / 180),
      lastTouch: new Date(h.myLastTouch).toISOString().slice(0, 10),
      covered: covered.has(path),
      commits: ownerCommits.get(path) ?? [],
    });
  }

  const maxLog = Math.max(1, ...rows.map((r) => Math.log10(r.loc + 1)));
  for (const r of rows) {
    r.complexity = Math.log10(r.loc + 1) / maxLog;
    r.isTest = TEST_FILE.test(r.path);
    r.baseRisk = r.ownerShare * r.complexity * r.recencyWeight * (r.isTest ? 0.5 : 1);
    r.risk = r.baseRisk * (r.covered ? 0 : 1);
  }
  rows.sort((a, b) => b.risk - a.risk || b.baseRisk - a.baseRisk);

  // "Knowledge at risk": share of this person's sole-owned knowledge with no card yet.
  const owned = rows.filter((r) => r.ownerShare >= 0.5);
  const total = owned.reduce((s, r) => s + r.baseRisk, 0);
  const atRisk = owned.reduce((s, r) => s + r.risk, 0);
  const summary = {
    author: aliasList,
    filesTouched: rows.length,
    filesMostlyOwned: owned.length,
    filesCovered: owned.filter((r) => r.covered).length,
    knowledgeAtRiskPct: total ? Math.round((atRisk / total) * 100) : 0,
  };
  return { summary, rows };
}

function pct(x) {
  return `${Math.round(x * 100)}%`.padStart(4);
}

function printMap({ summary, rows }, top) {
  console.log(`Knowledge-risk map for: ${summary.author}`);
  console.log(
    `Files touched: ${summary.filesTouched} | mostly owned (>=50%): ${summary.filesMostlyOwned} | covered by cards: ${summary.filesCovered}`,
  );
  console.log(`Knowledge at risk: ${summary.knowledgeAtRiskPct}%\n`);
  console.log(' #  risk  owner commits lines  loc  last-touch  file');
  rows.slice(0, top).forEach((r, i) => {
    console.log(
      `${String(i + 1).padStart(2)}  ${r.risk.toFixed(2)}  ${pct(r.ownerShare)}  ${pct(r.commitShare)}  ${pct(r.lineShare)} ${String(r.loc).padStart(4)}  ${r.lastTouch}  ${r.path}${r.covered ? '  [covered]' : ''}`,
    );
  });
}

// --- main ---------------------------------------------------------------------

try {
  if (args['list-authors']) {
    listAuthors();
  } else if (typeof args.author === 'string') {
    const top = Number(args.top ?? 10);
    const result = riskMap(args.author);
    if (args.json) {
      console.log(JSON.stringify({ ...result, rows: result.rows.slice(0, top) }, null, 2));
    } else {
      printMap(result, top);
    }
  } else {
    console.error('Usage: ownership.mjs --list-authors | --author "<email or name>[,<alias>...]" [--top N] [--json] [--repo PATH]');
    process.exit(1);
  }
} catch (err) {
  console.error(err.message);
  console.error(`(repo: ${relative(process.cwd(), repo) || '.'})`);
  process.exit(1);
}
