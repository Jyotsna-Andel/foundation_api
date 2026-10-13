# Progress

## Current status

- **Phase:** 3: Feature modules (CRUD only for now; business rules later)
- **Done last:** Categories CRUD module; Claude Code setup (gitignores, settings, hooks, docs)
- **Next step:** Step 13: global exception filter (`api/src/common/filters/all-exceptions.filter.ts`, registered via `APP_FILTER`), then retest Categories error cases
- **Then:** Authors → Members → Books → Loans CRUD
- **Open decisions:** local database setup: Docker Compose vs native PostgreSQL (replacing `prisma dev`); Docker Desktop licensing to be checked with IT
- **Pending:** CHECK-constraint migration (Step 8, not created yet); Categories Swagger test cases not yet confirmed

## Roadmap

### Phase 1: Project & database

- [x] Scaffold NestJS (`api/`): strict TS, ESM, Vitest, oxlint
- [x] Install dependencies (Prisma 7.10, adapter-pg, config, swagger, validation)
- [x] Prisma init + config (`prisma.config.ts`, ESM generator, output `src/generated/prisma`)
- [x] Local DB with `prisma dev`; `.env` with `DATABASE_URL` + `SHADOW_DATABASE_URL`
- [x] Library schema (Category, Author, Book, Member, Loan)
- [x] First migration `20261009112716_init`
- [ ] CHECK-constraint migration (hand-written SQL)
- [ ] Seed script
- [ ] Move local DB to Docker Compose or native PostgreSQL (decision pending)

### Phase 2: App foundation

- [x] `PrismaModule` / `PrismaService` (global, pg adapter, fail-fast config)
- [x] `ConfigModule` (global)
- [x] Global `ValidationPipe`, `/api` prefix, shutdown hooks
- [x] Swagger at `/docs`
- [ ] Global exception filter (Prisma error mapping)
- [ ] Health check endpoint

### Phase 3: Feature modules (CRUD)

- [x] Categories
- [ ] Authors (+ pagination/search)
- [ ] Members
- [ ] Books (relations: category, authors)
- [ ] Loans

### Phase 4: Business logic (later)

- [ ] Borrow (transaction, 3-loan limit, availability)
- [ ] Return (late fee, restock)
- [ ] Domain errors → HTTP mapping
- [ ] Raw SQL report (overdue loans)

### Phase 5: Testing

- [ ] Unit tests (services)
- [ ] E2E tests (separate test DB)
- [ ] Coverage report

### Phase 6: Quality & CI

- [ ] Lint/format/typecheck scripts
- [ ] GitHub Actions CI with Postgres service
- [ ] `.env.example`

### Phase 7: Frontend (`web/`)

- [ ] React + Vite + TanStack Query
- [ ] Pages: Books, Members, Borrow/Return

### Phase 8: Documentation

- [x] `CLAUDE.md`, `docs/` (engagement, requirements, architecture, progress)
- [x] ADRs 0001–0005
- [ ] README

### AI / repo tooling

- [x] Root + `api/` `.gitignore`
- [x] `.claude/settings.json` (permissions)
- [x] Hooks: guard (secrets/destructive commands), Prettier format, session context
- [x] Skills: `new-crud-module`, `update-docs`, `commit-step`
- [x] `api/CLAUDE.md` (backend conventions); root `CLAUDE.md` updated as an index (ESM fix, docs links)
- [ ] Refine `new-crud-module` skill after Authors and Members

## Session log

| Date               | Work done                                                                                                                                              |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 2026-10-07         | Chose Library Management project; scaffolded NestJS; installed deps; hit Prisma 8 RC CLI mismatch → pinned 7.10.0                                      |
| 2026-10-08 – 10-09 | Prisma init + config; `prisma dev` local DB; wrote schema; first migration; created `CLAUDE.md`; removed AI-tool folders Prisma created; first commits |
| 2026-10-12         | Switched Prisma client to ESM; removed `prisma skills sync` postinstall; `PrismaService` + `ConfigModule`; validation + Swagger; Categories CRUD       |
| 2026-10-13         | Claude Code setup: gitignores, `.claude/settings.json`, hooks, skills, `api/CLAUDE.md`, `docs/` and ADRs                                               |

## Lessons learned

- `npx` outside `api/` downloads the latest Prisma (8 RC). Always run Prisma from `api/`.
- Keep the Prisma CLI and client on the same pinned version.
- Prisma 7: DB URLs live in `prisma.config.ts`; `migrate dev` does not run `generate`.
- NestJS 12 scaffolds an **ESM** project; generated code must match (`.js` import extensions).
- Prisma can't express CHECK constraints; they go in hand-written migration SQL.
