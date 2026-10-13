# ADR-0002: Pin Prisma 7.10 and use an ESM project

- **Status:** Accepted
- **Date:** 2026-10-12

## Context

- `npm install -D prisma` resolved to **Prisma 8.0.0-rc**, while `@prisma/client` was 7.10.0. The RC CLI had different commands (`init` flags, no `format`) and added AI-tool folders plus a `prisma skills sync` postinstall script.
- NestJS 12 scaffolds a **native ESM** project (`"type": "module"`, `.js` import extensions, top-level `await`). We first configured the Prisma client as CommonJS, which doesn't match.

## Options considered

1. **Adopt Prisma 8 RC**: newest, but pre-release and mismatched with the stable client.
2. **Pin Prisma 7.10 (CLI + client)**: stable and consistent.
3. **Convert the project to CommonJS**: works with older tutorials, but goes against the scaffold and the ecosystem direction.

## Decision

- Pin `prisma` and `@prisma/client` to the same **7.10.x** version, and always run `npx prisma` from `api/`.
- Keep the project **ESM**; the `prisma-client` generator outputs ESM to `src/generated/prisma` (format inferred from `package.json`).
- Remove the `prisma skills sync` postinstall and the AI-tool folders.

## Consequences

- Relative imports must use `.js` extensions (`./app.module.js`).
- Prisma 7 specifics apply: driver adapter (`@prisma/adapter-pg`), URLs in `prisma.config.ts`, `migrate dev` doesn't run `generate`.
- Upgrading to Prisma 8 later is a deliberate, separate decision (new ADR).
