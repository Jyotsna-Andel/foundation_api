# Library Management API: backend (`api/`)

NestJS + Prisma + PostgreSQL backend for the Library Management project.

**Project overview, full setup and API reference:** see the [root README](../README.md).

## Quick start

```bash
# Database first, from the repo root: docker compose up -d
cp .env.example .env     # PowerShell: Copy-Item .env.example .env
npx prisma migrate dev
npx prisma generate
npm run start:dev        # http://localhost:3000/api · docs at /docs
```

## Folder guide

| Path                    | Contents                                                     |
| ----------------------- | ------------------------------------------------------------ |
| `prisma/schema.prisma`  | Data model (single source of truth)                          |
| `prisma/migrations/`    | SQL migrations, committed and applied in order               |
| `prisma.config.ts`      | Prisma CLI config (reads DB URLs from `.env`)                |
| `src/main.ts`           | Bootstrap: `/api` prefix, validation, Swagger                |
| `src/app.module.ts`     | Root module, global exception filter                         |
| `src/prisma/`           | `PrismaService`: the shared database client                  |
| `src/common/`           | Cross-cutting code: exception filter, transforms             |
| `src/<resource>/`       | Feature modules: `dto/`, controller, service, module         |
| `src/generated/prisma/` | Generated Prisma Client (git-ignored; `npx prisma generate`) |
| `test/`                 | End-to-end tests                                             |

## Working on the backend

- Coding conventions: [CLAUDE.md](CLAUDE.md) (module layout, `.js` imports, DTO / controller / service rules)
- Architecture and error model: [docs/ARCHITECTURE.md](../docs/ARCHITECTURE.md)
- Schema change workflow: edit `schema.prisma` → `npx prisma migrate dev --name <change>` → `npx prisma generate`
- Always run `npx prisma …` from this folder, so the pinned Prisma 7.10 is used
