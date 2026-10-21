# ADR-0008: Knowledge-handover interviews as Claude Code skills

- **Status:** Accepted
- **Date:** 2026-10-19

## Context

When an engineer leaves, the reasons behind odd code, the business drivers, failure modes and recovery steps leave with them. The "Heirloom" hackathon plan (Tribal-Knowledge Rescuer, 2026-10-06) describes a full product: git ownership mapping, a guided interview agent, knowledge cards and cited Q&A. We want the core loop available in this repo now, without building and hosting an app.

## Options considered

1. **Full product (Next.js + Postgres/pgvector + Claude API):** best UX and semantic search, but a separate app to build, host and secure.
2. **Static handover template (Markdown checklist):** simple, but generic questions; the hackathon plan's key insight is that questions come from ownership data.
3. **Claude Code skills in the repo:** Claude is the interview agent; git is the data source; cards are Markdown in `docs/knowledge/`, reviewed and committed like code.

## Decision

Two project skills:

- `/handover-interview` (`disable-model-invocation: true`, so it only runs when a person types it): confirm the person is leaving and consents → map ownership with `scripts/ownership.mjs` (`risk = owner_share × complexity × recency × (1 − coverage)`, test files at half weight) → targeted interview with a follow-up judge (why, business reason, what breaks, what was tried, workaround/recovery) → verbatim transcript recorded as the interview goes (`templates/session.md`) → expert-approved cards from `templates/card.md`, each linking to its transcript answers → transcript review → coverage before/after.
- `/ask-why`: answers only from cards, reviewed transcripts and commits with `[card:…]` / `[transcript:…#qN]` / `[commit:sha]` citations, otherwise "Not captured yet. Suggest asking <owner>."

## Consequences

- No infrastructure; works in any repo with git and Node. Cards are versioned and reviewed in PRs.
- Retrieval is keyword search (Grep), not embeddings; fine for hundreds of cards, revisit if the knowledge base grows large.
- **Full transcripts are committed** (`docs/knowledge/sessions/`, every question and verbatim answer) so teammates can review the original answers and check cards against them. Privacy safeguards: the consent step says so up front, secrets are redacted as answers are recorded, the expert reviews/redacts the transcript (or removes it) before commit, cards need per-card approval, and Claude never commits. Anything committed stays in git history, so review happens before the commit, ideally in a PR.
- **Deterministic checks back up the instructions:** `scripts/validate.mjs` (required fields, `consent`/`approved_by` audit trail, linked files and line ranges exist, commit SHAs exist, transcript anchors resolve, secret scan; exit 1 on errors, CI-ready) and `scripts/index.mjs` (regenerates `INDEX.md`, never edited by hand). Transcripts use explicit `<a id="q1-1">` anchors because GitHub heading slugs change with punctuation. Session statuses: `in-progress`, `reviewed`, `closed-partial`.
- Ownership is a heuristic (squash merges, bulk reformatting and bots distort it); the expert confirms which hotspots matter.
- In a single-author repo every file shows 100% ownership; the map is most useful on multi-contributor repos.
