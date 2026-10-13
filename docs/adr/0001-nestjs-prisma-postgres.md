# ADR-0001: NestJS + Prisma + PostgreSQL for the backend

- **Status:** Accepted
- **Date:** 2026-10-07

## Context

P1 ("Foundation API") must teach modules, DTOs, validation, relational SQL, migrations, error handling and clean architecture, with CRUD, tests, OpenAPI and CI as the Definition of Done.

## Options considered

1. **Express + hand-rolled structure**: minimal, but architecture, DI and validation would be ad hoc.
2. **NestJS + TypeORM**: decorator entities; migrations and types are weaker, more runtime magic.
3. **NestJS + Prisma**: schema-first, generated type-safe client, readable SQL migrations.

## Decision

NestJS (modules, DI, pipes, filters) with Prisma ORM over PostgreSQL.

## Consequences

- Clear layering out of the box: controller → service → `PrismaService`.
- `schema.prisma` is the single source of truth; migrations are plain SQL we can read and edit.
- Prisma can't express some database features (e.g. CHECK constraints); those go in hand-written migration SQL.
- Generated client must be regenerated (`npx prisma generate`) after schema changes.
