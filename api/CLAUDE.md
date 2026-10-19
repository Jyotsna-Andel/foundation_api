# Backend conventions (`api/`)

Loaded when working in `api/`. Project-wide rules are in the root `CLAUDE.md`; the full rationale is in `docs/ARCHITECTURE.md`.

## Module structure

- One feature module per resource: `src/<resource>/` with `dto/`, `<resource>.controller.ts`, `<resource>.service.ts`, `<resource>.module.ts`.
- Generate with the Nest CLI (`npx nest g module|controller|service <name> --no-spec`). It registers the module in `AppModule`.
- Cross-cutting code (filters, pipes, interceptors) lives in `src/common/`.
- Reference implementation: `src/categories/`.

## Imports (ESM)

- Relative imports MUST end in `.js`: `import { X } from './x.service.js'`.
- Package imports have no extension: `import { Module } from '@nestjs/common'`.
- Prisma types/enums come from `../generated/prisma/client.js` (adjust depth), never from `@prisma/client`.

## DTOs

- Validation with `class-validator`; Swagger metadata with `@ApiProperty` / `@ApiPropertyOptional` (include `example`).
- Trim strings with `@Transform`; mirror `@db.VarChar(n)` limits with `@MaxLength(n)`.
- Update DTOs: `PartialType` from `@nestjs/swagger` (not `@nestjs/mapped-types`).
- Never accept `id`, `createdAt`, `updatedAt` in input DTOs.

## Controllers

- Thin: map HTTP → one service call. No queries or business rules.
- `@ApiTags('<resource>')` on every controller.
- `@Param('id', ParseUUIDPipe)` on every `:id` route.
- `DELETE` returns 204 (`@HttpCode(HttpStatus.NO_CONTENT)`).

## Services

- Inject `PrismaService`; never `new PrismaClient()`.
- `findOne` uses `findUnique` and throws `NotFoundException` when null.
- Let Prisma errors (P2002/P2025/P2003) bubble to the global exception filter; don't catch them just to rethrow.
- Multi-step writes (e.g. borrow/return) use `this.prisma.$transaction`.

## Database & migrations

- Schema changes: edit `prisma/schema.prisma` → `npx prisma migrate dev --name <change>` → `npx prisma generate`.
- Never edit a migration that's already applied/committed; create a new one.
- Hand-written SQL (e.g. CHECK constraints): `migrate dev --create-only`, edit the SQL, then `migrate dev`.
- Tables/columns are snake_case via `@map` / `@@map`.

## Errors

- Response shape: `{ statusCode, error, message, path, timestamp }` (global filter, see ADR-0004).
- Never leak stack traces or SQL to clients.

## Tests

- Unit: `*.spec.ts` next to the file; mock `PrismaService`. Run `npm test`.
- E2E: `test/*.e2e-spec.ts` against `library_test` (override with `TEST_DATABASE_URL`). Use `createTestApp()` / `resetDatabase()` / factories from `test/utils/e2e-app.ts`. App HTTP setup lives in `src/app.setup.ts` (`configureApp`): change it there, never only in `main.ts`. Run `npm run test:e2e`.
