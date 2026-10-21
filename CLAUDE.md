# Library Management — P1 Foundation API (learning project)

## Working style

- I'm learning: give me commands ONE STEP AT A TIME with a short "what/why". Don't run setup commands for me unless I ask.
- Never add, create, edit, delete or install anything (files, folders, packages, config) without discussing it with me and getting my explicit confirmation first. Propose the change, explain why, then wait for my "yes".
  - Exception: docs in `docs/` have a standing yes. Update them after each completed step and tell me what changed.
- Use only Claude Code as the AI tool. Don't add configs for other AI tools (Cursor, Devin, Windsurf, `.agents/`).
- Full working agreement: [docs/ENGAGEMENT.md](docs/ENGAGEMENT.md)

## Project docs (read before planning; keep updated)

- [docs/PROGRESS.md](docs/PROGRESS.md): roadmap checklist, **current status**, session log
- [docs/REQUIREMENTS.md](docs/REQUIREMENTS.md): scope, entities, functional + non-functional requirements, DoD
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md): stack, layers, layout, data model, error model, conventions
- [docs/adr/](docs/adr/): decisions. Add a new ADR for every decision with trade-offs.
- Backend coding conventions: [api/CLAUDE.md](api/CLAUDE.md)
- Frontend coding conventions: [web/CLAUDE.md](web/CLAUDE.md)

## Stack

- `api/`: NestJS 12 (ESM), TypeScript strict, Prisma ORM 7.10 + PostgreSQL, Vitest, oxlint
- `web/`: React 19 + Vite + TypeScript strict, Tailwind 4, React Router 8, TanStack Query 5, React Hook Form + Zod 4 (ADR-0007). Dev server :5173 proxies `/api` to :3000.
- Which folder: `docker compose` from the repo root; `npm`/`npx prisma` for the API from `api/`; `npm` for the UI from `web/`.

## Gotchas

- Always run `npx prisma ...` from `api/`. From the root, npx downloads Prisma 8 RC, which has different commands.
- Keep `prisma` (CLI) and `@prisma/client` on the SAME pinned version (7.10.0).
- Prisma 7: DB URL lives in `api/prisma.config.ts` (not schema.prisma); runtime uses `@prisma/adapter-pg`.
- `migrate dev` does NOT run `generate`; run `npx prisma generate` after it.
- Generated client: `api/src/generated/prisma` (gitignored, ESM). The project is ESM: relative imports end in `.js`.

## Local database

- Docker Compose (`docker-compose.yml` at repo root): container `library-db`, `postgres:17-alpine`, `localhost:5432`, user/password `library`/`library` (local only). See ADR-0006.
- Databases: `library_dev` (app) and `library_test` (e2e). Start with `docker compose up -d` **from the repo root**.
- `api/.env` has `DATABASE_URL` only (Claude can't read it; ask me). No `SHADOW_DATABASE_URL`: Prisma creates its own shadow DB.
- `npx prisma dev` is no longer used.

## Claude Code setup (`.claude/`)

- Hooks: `guard.mjs` blocks `.env` access and destructive commands; `format.mjs` runs Prettier after edits; `session-context.mjs` loads PROGRESS status at session start.
- Skills: `/new-crud-module <resource>`, `/update-docs`, `/commit-step`.
- Knowledge handover (ADR-0008): `/handover-interview` (manual only; confirms the person is leaving before doing anything) and `/ask-why <question>` (cited answers from `docs/knowledge/`, or "Not captured yet").

## Definition of Done (P1)

CRUD + tests + OpenAPI + CI; README + ADRs + tests as Git evidence.
