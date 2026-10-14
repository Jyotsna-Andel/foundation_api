# Requirements: Library Management (P1 Foundation API)

## Purpose

A learning project that exercises backend fundamentals (modules, DTOs, validation, SQL, migrations, error handling, clean architecture) through a small but realistic library domain. A React UI consumes the API later.

## Scope

| Phase                   | In scope                                                                             |
| ----------------------- | ------------------------------------------------------------------------------------ |
| **Now**                 | CRUD APIs for Categories, Authors, Members, Books, Loans + consistent error handling |
| **Later**               | Loan business rules, reports (raw SQL), health check, React UI                       |
| **Out of scope for P1** | Authentication/authorization, async jobs/queues, caching, file uploads               |

## Domain entities

| Entity       | Key fields                                                                        | Constraints                                                                  |
| ------------ | --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| **Category** | `name`                                                                            | unique, ≤ 60 chars                                                           |
| **Author**   | `name`, `bio?`                                                                    | name ≤ 120 chars                                                             |
| **Book**     | `isbn`, `title`, `publishedYear?`, `totalCopies`, `availableCopies`, `categoryId` | ISBN unique (≤ 13 chars); belongs to one Category; many-to-many with Authors |
| **Member**   | `name`, `email`, `status` (`ACTIVE` / `SUSPENDED`)                                | email unique                                                                 |
| **Loan**     | `bookId`, `memberId`, `borrowedAt`, `dueAt`, `returnedAt?`, `lateFee`             | `returnedAt = null` means still on loan; `lateFee` is `Decimal(8,2)`         |

All entities use UUID ids and `createdAt` / `updatedAt` timestamps (Loan uses `borrowedAt`).

## Functional requirements

### FR-1 CRUD (current phase)

Each resource exposes, under the `/api` prefix:

| Method   | Route                 | Success        |
| -------- | --------------------- | -------------- |
| `POST`   | `/api/<resource>`     | 201 Created    |
| `GET`    | `/api/<resource>`     | 200            |
| `GET`    | `/api/<resource>/:id` | 200            |
| `PATCH`  | `/api/<resource>/:id` | 200            |
| `DELETE` | `/api/<resource>/:id` | 204 No Content |

Resources: `categories` ✅, `authors` ✅, `members` ✅, `books` ✅, `loans` ✅ (CRUD only; stock changes come with FR-2).

- **FR-1.1** Books can be created/updated with a `categoryId` and a list of `authorIds`.
- **FR-1.2** Lists support pagination (`page`, `limit`) and simple search where useful (authors, books). _(planned)_

### FR-2 Loan business rules (later phase)

- **FR-2.1** Borrow: member must be `ACTIVE`, have fewer than 3 active loans; book must have `availableCopies > 0`. Decrement copies and create the loan in one **transaction**. `dueAt = borrowedAt + 14 days`.
- **FR-2.2** Return: set `returnedAt`, compute late fee for overdue days, increment `availableCopies`, in one transaction.
- **FR-2.3** Business-rule violations return 409/422 with a clear message.

### FR-3 Reports (later phase)

- **FR-3.1** `GET /api/reports/overdue`: overdue loans, implemented with raw SQL.

### FR-4 Operations (later phase)

- **FR-4.1** `GET /api/health`: app + database check.

## Non-functional requirements

| ID    | Requirement                                                                                                         | How it's met                                                                                                                 |
| ----- | ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| NFR-1 | **Input validation** on every request                                                                               | DTOs + `class-validator`; global `ValidationPipe` (`whitelist`, `forbidNonWhitelisted`, `transform`); `ParseUUIDPipe` on ids |
| NFR-2 | **Consistent errors**: one JSON shape `{ statusCode, error, message, path, timestamp }`; no stack traces/SQL leaked | Global exception filter; Prisma errors mapped (P2002→409, P2025→404, P2003→409)                                              |
| NFR-3 | **Clean architecture**: thin controllers, logic in services, data access via Prisma                                 | Feature modules: controller → service → `PrismaService`                                                                      |
| NFR-4 | **Data integrity** enforced in the database too                                                                     | Unique indexes, foreign keys (`RESTRICT`), CHECK constraints _(planned)_                                                     |
| NFR-5 | **API documentation**                                                                                               | OpenAPI via `@nestjs/swagger` at `/docs` (`/docs-json` raw)                                                                  |
| NFR-6 | **Tested**                                                                                                          | Unit tests (services) + e2e tests (HTTP + DB) with Vitest + Supertest                                                        |
| NFR-7 | **CI**                                                                                                              | GitHub Actions: lint → typecheck → test → e2e → build                                                                        |
| NFR-8 | **Secrets never committed**                                                                                         | `.env` git-ignored; `.env.example` committed                                                                                 |

## Definition of Done (P1)

- [ ] CRUD for all resources
- [ ] Unit + e2e tests
- [ ] OpenAPI docs complete
- [ ] CI pipeline green
- [ ] README + ADRs
- [ ] Clean, meaningful Git history
