---
name: update-docs
description: Update the project docs (PROGRESS, ARCHITECTURE, REQUIREMENTS, ADRs) after a step is completed or a decision is made. Use after finishing any roadmap step, after a commit, or when the developer asks to sync the docs.
---

# Update project docs

The developer has given a **standing yes** for edits inside `docs/` (see `docs/ENGAGEMENT.md`). Make the edits, then report a short list of what changed.

## 1. Establish facts first

Only record what is **verified**, never what was merely suggested:

- `git log --oneline -10` and `git status --short` for what was committed or changed
- Read the relevant source files to confirm a feature really exists
- If something was given to the developer but not yet applied, keep it unchecked and list it under **Pending**

## 2. `docs/PROGRESS.md` (always)

- Tick completed roadmap items; add new items if scope grew.
- Rewrite the **Current status** section (it's loaded at session start by `.claude/hooks/session-context.mjs`, so keep it short): Phase · Done last · Next step · Then · Open decisions · Pending.
- Add or extend today's row in the **Session log** (absolute dates, `YYYY-MM-DD`).
- Add a **Lessons learned** bullet when we hit a non-obvious problem.

## 3. `docs/ARCHITECTURE.md` (when structure changed)

- New module or folder → update **Repository layout**.
- New cross-cutting piece (filter, pipe, interceptor) → update the **Cross-cutting setup** table and flip ⏳ to ✅.
- Schema change → update the **Data model** ER diagram and notes.
- New env var → update **Configuration**.

## 4. `docs/REQUIREMENTS.md` (when scope changed)

- Mark resources/requirements done (e.g. `authors` ✅) and tick Definition of Done items.

## 5. ADRs (when a decision with trade-offs was made)

- Copy `docs/adr/0000-template.md` to the next number: `NNNN-kebab-title.md`.
- Fill in Context, Options considered, Decision, Consequences. Date = today.
- If it replaces an older ADR, set the old one's status to `Superseded by ADR-NNNN`.
- When a **Proposed** ADR is implemented, change its status to **Accepted**.

## 6. Report

End with a 3–6 line summary: which files changed and the key update in each.
