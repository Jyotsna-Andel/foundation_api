# Working Agreement (Human ↔ Claude)

How we work together on this learning project. `CLAUDE.md` links here; this file is the full version.

## Roles

| Who                 | Responsibility                                                                                                            |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Developer (you)** | Decides scope and approach, types the application code, runs setup commands, commits and pushes                           |
| **Claude**          | Plans steps, explains the what and why, reviews code and output, writes docs/config after approval, keeps docs up to date |

## How each step is delivered

1. **One step at a time.** No batching of unrelated steps.
2. Every step includes:
   - **What** we're doing and **why** (the concept being learned)
   - The exact **command or code**, with the target file path
   - The **expected result**, so you can tell whether it worked
3. You run it and paste the output (or any error). Claude verifies before moving on.

## Confirmation rules

| Change type                                                          | Rule                                                                                               |
| -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Application code (`api/src`, `web/src`)                              | **You type it.** Claude provides it and explains it.                                               |
| Packages, config, settings, hooks, skills                            | Claude **proposes, explains, and waits for an explicit "yes"** before creating or editing anything |
| Setup and destructive commands (installs, migrations, deletes, git)  | **You run them.** Claude doesn't run setup commands unless asked.                                  |
| Docs in `docs/` (`PROGRESS`, `ARCHITECTURE`, `REQUIREMENTS`, `ADRs`) | **Standing yes:** Claude updates them after each completed step and reports what changed           |
| Read-only checks (reading files, `git status`, `prisma validate`)    | Claude may run them to verify state                                                                |

## Keeping docs current

After each completed step, Claude:

- updates `docs/PROGRESS.md` (checklist, **Current status**, session log)
- adds an ADR in `docs/adr/` when a decision with trade-offs is made
- updates `docs/ARCHITECTURE.md` when structure, layers or data model change
- updates `docs/REQUIREMENTS.md` when scope changes

## Commits

- Commit after each working step, in small, logical commits
- Use [Conventional Commits](https://www.conventionalcommits.org/): `feat(scope):`, `fix:`, `chore:`, `docs:`, `test:`, `ci:`
- Always review `git status` before committing; `.env`, `node_modules`, `dist`, generated code must never appear

## AI tooling

- **Claude Code only.** No configs for other AI tools (`.cursor/`, `.devin/`, `.windsurf/`, `.agents/`).
- Secrets (`.env`) are off-limits to Claude, enforced by `.claude/settings.json` and `.claude/hooks/guard.mjs`.
