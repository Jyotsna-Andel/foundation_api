# ADR-0006: Docker Compose for local PostgreSQL

- **Status:** Accepted (supersedes [ADR-0005](0005-local-database.md))
- **Date:** 2026-10-14

## Context

The interim `npx prisma dev` database had to run in a foreground terminal, lived only on one machine, used non-standard ports (51214/51215), and didn't match what CI will use. We want a setup that is reproducible for every developer and close to CI.

## Options considered

1. **Keep `prisma dev`**: zero install, but not reproducible or representative.
2. **Native PostgreSQL install**: always on, but versions/config differ per machine; manual DB creation.
3. **Docker Compose**: a committed `docker-compose.yml` defines the exact Postgres version, databases and health check.

## Decision

Docker Compose (`docker-compose.yml` at the repo root) runs `postgres:17-alpine` as `library-db`:

- port `5432`, user/password `library`/`library` (local only)
- databases: `library_dev` (via `POSTGRES_DB`) and `library_test` (created by `docker/postgres/init/01-create-test-db.sql`)
- named volume `db-data` for persistence; `pg_isready` health check; `restart: unless-stopped`
- no `SHADOW_DATABASE_URL`: `prisma migrate dev` creates and drops its own shadow database

## Consequences

- Setup is `docker compose up -d` + `npx prisma migrate dev`; no terminal to keep open.
- Requires Docker Desktop + WSL 2 on Windows. Docker Desktop licensing for company use must be confirmed with IT.
- Data persists across restarts; `docker compose down -v` deletes it (reset).
- CI will use the same `postgres:17` image as a service container.
- The init script only runs on an **empty** volume; changing it later requires `down -v` or manual SQL.
