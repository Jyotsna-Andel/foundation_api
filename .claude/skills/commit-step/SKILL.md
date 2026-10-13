---
name: commit-step
description: Prepare a safe, well-structured git commit for the step just completed. Checks for secrets and generated files, proposes logical commit groups with Conventional Commit messages, and gives the developer the commands to run.
disable-model-invocation: true
---

# Prepare a commit

The **developer runs the git commands**; you inspect and propose (see `docs/ENGAGEMENT.md`).

## 1. Inspect (read-only)

Run `git status --short` and `git diff --stat` (plus `git diff` on small files if needed).

## 2. Safety checks: stop and warn if any of these appear

- `.env` or `.env.*` (except `.env.example`)
- `node_modules/`, `dist/`, `coverage/`, `api/src/generated/`
- AI-tool folders other than the root `.claude/` (`.agents/`, `.cursor/`, `.devin/`, `.windsurf/`, `api/.claude/`)
- Large binaries or log files
- `CLAUDE.local.md` or `.claude/settings.local.json`

If any is found, explain why it must not be committed and how to fix it (`.gitignore` entry, `git rm --cached <file>`). Do not continue until resolved.

## 3. Group changes into logical commits

One idea per commit. Typical groups:

| Prefix | For |
| --- | --- |
| `feat(<scope>):` | new endpoint/module/behaviour |
| `fix(<scope>):` | bug fix |
| `refactor:` | restructure without behaviour change |
| `test(<scope>):` | tests only |
| `docs:` | `docs/`, README, ADRs, CLAUDE.md |
| `chore:` | tooling, config, dependencies, gitignore, `.claude/` |
| `ci:` | GitHub Actions |

Migrations go in the same commit as the schema change that produced them.

## 4. Hand over the commands

For each group, give:

```powershell
git add <paths>
git commit -m "<type>(<scope>): <imperative summary, ≤ 72 chars>"
```

Then `git push` once all commits are made. Remind the developer to paste the output if anything fails.

## 5. After the commit

Run the `update-docs` skill if the docs don't yet reflect this step.
