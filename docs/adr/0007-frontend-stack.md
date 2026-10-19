# ADR-0007: Frontend stack

- **Status:** Accepted
- **Date:** 2026-10-15

## Context

P1 needs a React UI for the CRUD API. It should teach mainstream patterns, show the API's validation and error responses clearly, and stay small.

## Options considered

| Concern      | Options                                            | Chosen                                                                                |
| ------------ | -------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Build tool   | Vite, Next.js                                      | **Vite**: plain SPA, no server rendering needed; fast dev server with an `/api` proxy |
| Styling      | Tailwind, Material UI, CSS modules                 | **Tailwind CSS 4**: no component library to learn; you build tables/forms yourself    |
| Server state | TanStack Query, hand-rolled `useEffect`            | **TanStack Query 5**: caching, loading/error states, refetch after mutations          |
| Forms        | React Hook Form + Zod, plain state                 | **React Hook Form + Zod 4**: schema validation mirroring the API DTOs                 |
| API client   | Hand-written typed `fetch`, generated from OpenAPI | **Hand-written**: every request is visible; types mirror the DTOs                     |
| Routing      | React Router, TanStack Router                      | **React Router 8**: most widely used                                                  |

## Decision

`web/` is a Vite + React 19 + TypeScript (strict) SPA with the stack above. In development Vite proxies `/api` to `http://localhost:3000`.

## Consequences

- No CORS configuration needed in development; production will need same-origin hosting or CORS on the API.
- Types in `web/src/api/types.ts` and Zod schemas are maintained by hand and must be updated when DTOs change. Generating them from `/docs-json` remains an option if they drift.
- The API stays the source of truth for validation; client-side Zod only gives faster feedback.
