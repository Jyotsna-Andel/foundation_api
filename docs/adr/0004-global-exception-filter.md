# ADR-0004: Global exception filter and error response format

- **Status:** Accepted (implemented 2026-10-14 in `api/src/common/filters/all-exceptions.filter.ts`)
- **Date:** 2026-10-12

## Context

Without a filter, Nest exceptions and Prisma errors produce different shapes, and database errors (duplicate name, missing record) surface as **500**. Clients, including the future React app, need one predictable error format and correct status codes.

## Options considered

1. **Try/catch in every service**: repetitive, easy to forget.
2. **Per-controller filters**: still duplicated.
3. **One global filter**: single place for mapping and formatting.

## Decision

A global `AllExceptionsFilter` (`@Catch()`), registered with `APP_FILTER` in `AppModule`, returning:

```json
{
  "statusCode": 409,
  "error": "CONFLICT",
  "message": "...",
  "path": "/api/...",
  "timestamp": "..."
}
```

Mappings: `HttpException` → its own status/message; Prisma `P2002` → 409, `P2025` → 404, `P2003` → 409; anything else → 500 with a generic message, full error logged server-side.

## Consequences

- Services stay clean: they can let Prisma errors bubble up.
- Registering via `APP_FILTER` (not `main.ts`) means e2e tests that build `AppModule` get the same error format.
- New Prisma error codes need an explicit mapping, otherwise they become 500.
