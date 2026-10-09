# Library Management — P1 Foundation API (learning project)

## Working style
- I'm learning: give me commands ONE STEP AT A TIME with a short "what/why". Don't run setup commands for me unless I ask.
- Never add, create, edit, delete or install anything (files, folders, packages, config) without discussing it with me and getting my explicit confirmation first. Propose the change, explain why, then wait for my "yes".
- Use only Claude Code as the AI tool. Don't add configs for other AI tools (Cursor, Devin, Windsurf, `.agents/`).

## Stack
- `api/`: NestJS 12, TypeScript strict, Prisma ORM 7.10 + PostgreSQL, Vitest, oxlint
- `web/` (later): React

## Gotchas
- Always run `npx prisma ...` from `api/`. From the root, npx downloads Prisma 8 RC, which has different commands.
- Keep `prisma` (CLI) and `@prisma/client` on the SAME pinned version (7.10.0).
- Prisma 7: DB URL lives in `api/prisma.config.ts` (not schema.prisma); runtime uses `@prisma/adapter-pg`.
- `migrate dev` does NOT run `generate`; run `npx prisma generate` after it.
- Generated client: `api/src/generated/prisma` (gitignored, CommonJS).

## Local database
- Run `npx prisma dev` in a separate terminal (from `api/`) and keep it running.
- `DATABASE_URL` = port 51214, `SHADOW_DATABASE_URL` = port 51215 (see `api/.env`).

## Definition of Done (P1)
CRUD + tests + OpenAPI + CI; README + ADRs + tests as Git evidence.
