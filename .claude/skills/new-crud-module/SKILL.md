---
name: new-crud-module
description: Guide the developer through building a new NestJS CRUD feature module (DTOs, service, controller, Swagger, tests) following this repo's Categories pattern. Use when starting a new resource such as authors, members, books or loans.
argument-hint: <resource-name, plural, e.g. authors>
---

# New CRUD module: `$ARGUMENTS`

The developer **types the code**; you provide it one step at a time with a short what/why and the expected result (see `docs/ENGAGEMENT.md`). Never create app files yourself.

## 0. Before starting

1. Read `api/prisma/schema.prisma` for the model's fields, types, `@db.VarChar(n)` limits, uniques and relations.
2. Read the reference implementation in `api/src/categories/` and match it.
3. Check `docs/PROGRESS.md` to confirm this module is next.

## 1. Generate the skeleton (developer runs, from `api/`)

```powershell
npx nest g module <name>
npx nest g controller <name> --no-spec
npx nest g service <name> --no-spec
New-Item -ItemType Directory src/<name>/dto
New-Item -ItemType File src/<name>/dto/create-<singular>.dto.ts, src/<name>/dto/update-<singular>.dto.ts
```

## 2. DTOs

- One property per writable field. Never `id`, `createdAt`, `updatedAt`.
- Each property has: `@ApiProperty` / `@ApiPropertyOptional` (with `example`), then `class-validator` rules.
- Strings: `@Transform` trim → `@IsString()` → `@IsNotEmpty()` (if required) → `@MaxLength(n)` matching the schema.
- Optional fields: `@IsOptional()` first.
- Enums: `@IsEnum(<Enum>)`, importing the enum from `../../generated/prisma/client.js`.
- Ints: `@IsInt()` + `@Min()`; foreign keys: `@IsUUID()`; arrays of ids: `@IsArray()` + `@IsUUID('all', { each: true })`.
- Update DTO: `extends PartialType(Create…Dto)`, importing `PartialType` **from `@nestjs/swagger`**.

## 3. Service

- Inject `PrismaService` (`private readonly prisma: PrismaService`).
- Methods: `create`, `findAll` (stable `orderBy`), `findOne` (`findUnique` → `NotFoundException` if null), `update`, `remove`.
- Let Prisma errors (P2002 / P2025 / P2003) bubble to the global exception filter. Don't catch them in the service.
- Relations (books ↔ authors, books → category): use `connect` / `set` with ids; `include` related data only where the API needs it.

## 4. Controller

- `@ApiTags('<name>')`, `@Controller('<name>')`, thin methods that only call the service.
- `@Param('id', ParseUUIDPipe)` on every `:id` route.
- `DELETE` → `@HttpCode(HttpStatus.NO_CONTENT)` and returns nothing.

## 5. Conventions checklist

- [ ] Relative imports end in `.js` (ESM)
- [ ] Module is registered in `AppModule` (the CLI does this; verify)
- [ ] No business logic in the controller
- [ ] Validation limits match `schema.prisma`

## 6. Verify (developer runs `npm run start:dev`, tests in `/docs`)

Give a test table covering: create (201), list, get by id (200), invalid body (400), unknown property (400), bad UUID (400), unknown id (404), duplicate unique field (409, if any), delete (204), delete unknown (404), plus relation cases (invalid foreign key → 409).

## 7. Tests (once the module works)

- Unit test the service with a mocked `PrismaService` (`findOne` throws `NotFoundException` when null).
- E2E tests come in Phase 5.

## 8. Finish

- Suggest a commit: `feat(<name>): add CRUD endpoints`.
- Run the `update-docs` skill steps (PROGRESS checklist + status, ARCHITECTURE layout if changed).
