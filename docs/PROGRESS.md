# Progress

## Current status

- **Phase:** 3: Feature modules (CRUD only for now; business rules later)
- **Done last:** Unit tests: 46 passing (all 5 services, exception filter, Book/Member DTO validation), ~89% line coverage; README, `api/README.md`, `.env.example`. Before that: all CRUD modules.
- **Next step:** DB-backed Swagger test pass for all modules; commit the Docker setup
- **Then:** CHECK-constraint migration → seed script → e2e tests (against `library_test`) → CI
- **Local DB:** Docker Compose `library-db` (Postgres 17, `localhost:5432`, `library_dev` + `library_test`), init migration applied (ADR-0006). Docker Desktop licensing confirmation with IT still pending.
- **Pending:** exception filter error cases (409/404) not yet confirmed in Swagger; CHECK-constraint migration (Step 8). All work up to unit tests is committed and pushed (2026-10-14); build output (`dist/`, `tsbuildinfo`) untracked.

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
- [x] Move local DB to Docker Compose (`docker-compose.yml`, Postgres 17, `library_dev` + `library_test`; ADR-0006)

### Phase 2: App foundation

- [x] `PrismaModule` / `PrismaService` (global, pg adapter, fail-fast config)
- [x] `ConfigModule` (global)
- [x] Global `ValidationPipe`, `/api` prefix, shutdown hooks
- [x] Swagger at `/docs`
- [x] Global exception filter (Prisma error mapping); Swagger verification pending
- [ ] Health check endpoint

### Phase 3: Feature modules (CRUD)

- [x] Categories
- [x] Authors
- [x] Members (unique email, status enum)
- [x] Books (category connect, authors connect/set, ISBN validation, totalCopies change keeps on-loan copies)
- [x] Loans (CRUD only; default due date 14 days; no stock changes until Phase 4)
- [ ] DB-backed Swagger test pass for all modules

### Phase 4: Business logic (later)

- [ ] Borrow (transaction, 3-loan limit, availability)
- [ ] Return (late fee, restock)
- [ ] Domain errors → HTTP mapping
- [ ] Raw SQL report (overdue loans)

### Phase 5: Testing

- [x] Unit tests: services (mocked `PrismaService` in `test/utils/prisma-mock.ts`), exception filter, DTO validation
- [ ] E2E tests (separate test DB)
- [x] Coverage report (`npm run test:cov`): ~89% lines, 77% branches
- [ ] Controller unit tests (optional; covered by e2e later)

### Phase 6: Quality & CI

- [ ] Lint/format/typecheck scripts
- [ ] GitHub Actions CI with Postgres service
- [x] `.env.example` (prisma dev values; update when moving to Docker)

### Phase 7: Frontend (`web/`)

- [ ] React + Vite + TanStack Query
- [ ] Pages: Books, Members, Borrow/Return

### Phase 8: Documentation

- [x] `CLAUDE.md`, `docs/` (engagement, requirements, architecture, progress)
- [x] ADRs 0001–0005
- [x] README (root): overview, setup, scripts, API overview, error format, structure; update setup section after Docker

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
| 2026-10-14         | Global exception filter; Authors, Members, Books, Loans CRUD (written by Claude on request); shared `trim` transform                                   |

## Lessons learned

- `npx` outside `api/` downloads the latest Prisma (8 RC). Always run Prisma from `api/`.
- Keep the Prisma CLI and client on the same pinned version.
- Prisma 7: DB URLs live in `prisma.config.ts`; `migrate dev` does not run `generate`.
- NestJS 12 scaffolds an **ESM** project; generated code must match (`.js` import extensions).
- Prisma can't express CHECK constraints; they go in hand-written migration SQL.
- Docker Desktop started before WSL 2 was installed fails once and never retries; fully quit and restart it after installing WSL.
- `docker compose` runs from the repo root; `npx prisma` / `npm` from `api/`. Running `npx prisma` elsewhere offers to install Prisma 8 RC: answer **no**.
- If `SHADOW_DATABASE_URL` is set, Prisma expects that database to exist; leave it unset with a normal Postgres.
- A non-`async` service method that throws does so synchronously, not as a rejected promise. Unit tests caught this in `LoansService.create`; keep service methods that can throw `async`.
