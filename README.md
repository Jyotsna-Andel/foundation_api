# Library Management API

A REST API for a small library: categories, authors, books, members and loans. Built as the **P1 Foundation API** learning project, focused on backend fundamentals: modules, DTOs and validation, relational SQL and migrations, consistent error handling and clean architecture.

> **Status:** CRUD for all resources is implemented. Borrow/return business rules, tests, CI and the React frontend are in progress. See [docs/PROGRESS.md](docs/PROGRESS.md).

## Tech stack

| Area          | Technology                                |
| ------------- | ----------------------------------------- |
| Runtime       | Node.js 24 (ESM)                          |
| Framework     | NestJS 12, TypeScript (strict)            |
| Database      | PostgreSQL                                |
| ORM           | Prisma ORM 7.10 with `@prisma/adapter-pg` |
| Validation    | `class-validator`, `class-transformer`    |
| API docs      | OpenAPI / Swagger (`@nestjs/swagger`)     |
| Tests         | Vitest, Supertest                         |
| Lint / format | oxlint, Prettier                          |

## Getting started

### Prerequisites

- Node.js 24+ and npm
- Docker Desktop (on Windows with WSL 2) for the local PostgreSQL ([ADR-0006](docs/adr/0006-docker-compose-postgres.md))

### Setup

```bash
# 1. Database (from the repo root): Postgres 17 in Docker, runs in the background
docker compose up -d
docker compose ps            # wait for "(healthy)"

# 2. Everything else runs from api/
cd api
npm install
cp .env.example .env         # PowerShell: Copy-Item .env.example .env

# 3. Apply migrations and generate the Prisma Client
npx prisma migrate dev
npx prisma generate

# 4. Run the API in watch mode
npm run start:dev
```

The database container (`library-db`) provides `library_dev` for development and `library_test` for e2e tests on `localhost:5432`. Data persists in a Docker volume.

| Database task                | Command (repo root)                                                 |
| ---------------------------- | ------------------------------------------------------------------- |
| Stop (keeps data)            | `docker compose stop`                                               |
| Start again                  | `docker compose up -d`                                              |
| Logs                         | `docker compose logs -f db`                                         |
| SQL shell                    | `docker exec -it library-db psql -U library -d library_dev`         |
| **Reset** (deletes all data) | `docker compose down -v`, then `up -d` and `npx prisma migrate dev` |

The API runs at **http://localhost:3000/api**. Interactive docs are at **http://localhost:3000/docs** (raw OpenAPI JSON at `/docs-json`).

> Always run `npx prisma …` from `api/`. Run elsewhere, `npx` downloads a different Prisma version ([ADR-0002](docs/adr/0002-pin-prisma-7-and-esm.md)).

### Environment variables

| Variable       | Required | Purpose                                                                              |
| -------------- | -------- | ------------------------------------------------------------------------------------ |
| `DATABASE_URL` | Yes      | Postgres connection for the app and Prisma CLI. The app refuses to start without it. |
| `PORT`         | No       | HTTP port (default `3000`)                                                           |

See [api/.env.example](api/.env.example).

## Scripts (`api/`)

| Command                                  | What it does                                               |
| ---------------------------------------- | ---------------------------------------------------------- |
| `npm run start:dev`                      | Start with auto-reload                                     |
| `npm run build`                          | Compile to `dist/`                                         |
| `npm run start:prod`                     | Run the compiled build                                     |
| `npm run lint`                           | Lint with oxlint (type-aware)                              |
| `npm run format`                         | Format with Prettier                                       |
| `npm test`                               | Unit tests                                                 |
| `npm run test:cov`                       | Unit tests with coverage                                   |
| `npm run test:e2e`                       | End-to-end tests                                           |
| `npx prisma migrate dev --name <change>` | Create and apply a migration after editing `schema.prisma` |
| `npx prisma generate`                    | Regenerate the Prisma Client                               |
| `npx prisma studio`                      | Browse the database in the browser                         |

## API overview

All routes are under `/api`. Each resource supports the same CRUD operations:

| Method   | Route                 | Success |
| -------- | --------------------- | ------- |
| `POST`   | `/api/<resource>`     | `201`   |
| `GET`    | `/api/<resource>`     | `200`   |
| `GET`    | `/api/<resource>/:id` | `200`   |
| `PATCH`  | `/api/<resource>/:id` | `200`   |
| `DELETE` | `/api/<resource>/:id` | `204`   |

| Resource     | Notes                                                                                                                       |
| ------------ | --------------------------------------------------------------------------------------------------------------------------- |
| `categories` | Unique name                                                                                                                 |
| `authors`    | Optional bio                                                                                                                |
| `members`    | Unique email (stored lowercase); status `ACTIVE` / `SUSPENDED`                                                              |
| `books`      | Valid, unique ISBN; belongs to a category; many-to-many with authors (`authorIds`); `availableCopies` is managed by the API |
| `loans`      | Links a book and a member; `dueAt` defaults to 14 days                                                                      |

### Errors

Every error uses one shape:

```json
{
  "statusCode": 409,
  "error": "CONFLICT",
  "message": "A record with this value already exists",
  "path": "/api/categories",
  "timestamp": "2026-10-14T10:00:00.000Z"
}
```

| Status | When                                                                                            |
| ------ | ----------------------------------------------------------------------------------------------- |
| `400`  | Invalid body, unknown property, malformed UUID (`message` may be a list)                        |
| `404`  | Record not found                                                                                |
| `409`  | Duplicate unique value, or the record is still referenced (e.g. deleting a book that has loans) |
| `500`  | Unexpected error (details are logged, never returned)                                           |

## Project structure

```
Foundation_API/
├── api/                  # NestJS backend
│   ├── prisma/           # schema.prisma + SQL migrations
│   └── src/
│       ├── common/       # exception filter, shared transforms
│       ├── prisma/       # PrismaService (shared DB client)
│       └── <resource>/   # one feature module per resource: dto/, controller, service, module
├── docs/                 # requirements, architecture, progress, ADRs
└── .claude/              # Claude Code settings, hooks and skills
```

Layers: **controller** (HTTP only) → **service** (business logic) → **PrismaService** (data access). Details in [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Documentation

- [Requirements](docs/REQUIREMENTS.md): scope, entities, functional and non-functional requirements
- [Architecture](docs/ARCHITECTURE.md): layers, data model, error model, conventions
- [Progress](docs/PROGRESS.md): roadmap and current status
- [Architecture Decision Records](docs/adr/): why key choices were made
- [Working agreement](docs/ENGAGEMENT.md): how this project is developed with Claude Code

## Contributing

- Small commits using [Conventional Commits](https://www.conventionalcommits.org/) (`feat(books): …`, `fix: …`, `docs: …`)
- Schema changes always come with a migration in the same commit
- Never commit `.env`; update `.env.example` when adding a variable
