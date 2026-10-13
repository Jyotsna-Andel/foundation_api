# ADR-0005: Local development database

- **Status:** Accepted (interim), to be superseded
- **Date:** 2026-10-09

## Context

Docker and PostgreSQL were not installed on the development machine. We needed a database to run migrations immediately.

## Options considered

1. **`npx prisma dev`**: local Postgres bundled with the Prisma CLI, no install; must run in a terminal.
2. **Docker Compose**: `docker-compose.yml` committed; same Postgres for every developer and CI; needs Docker Desktop (licensing to check for company use).
3. **Native PostgreSQL install**: Windows service, always on; versions can differ between machines.
4. **Cloud Postgres (Neon/Supabase)**: no install; needs network, data leaves the machine.

## Decision

Use **`prisma dev`** for now (ports 51214 main, 51215 shadow), to unblock schema and migration work.

## Consequences

- `prisma dev` must be started in its own terminal before working.
- Not representative of a real team setup. **Follow-up:** move to Docker Compose (preferred) or native PostgreSQL. Decision pending the Docker Desktop licensing check; record it in a new ADR that supersedes this one.
- CI will use a Postgres service container regardless.
