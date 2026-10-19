# Frontend conventions (`web/`)

Loaded when working in `web/`. Project-wide rules are in the root `CLAUDE.md`; rationale in `docs/adr/0007-frontend-stack.md`.

## Structure

- One page per resource in `src/features/<resource>/<Resource>Page.tsx`: table + form (in a `Modal`) + `ConfirmDelete`.
- Data access only through `src/api/hooks.ts` (`xxxApi.useList/useCreate/useUpdate/useRemove`). Components never call `fetch` directly.
- Shared UI in `src/components/`; non-component helpers in `src/lib/` (keeps React fast refresh working).

## API types and validation

- `src/api/types.ts` mirrors the API responses and DTOs. Update it whenever an API DTO changes.
- Each form has a Zod schema that mirrors the DTO rules (lengths, required fields). Keep numeric inputs as strings in the form and convert on submit.
- Always show server errors: pass `mutation.error` to `FormFooter` / `ErrorBanner` (handles the API's 400 message lists, 404, 409).

## Styling

- Tailwind utility classes only; reuse `Button`, `Badge`, `DataTable`, `Td`, `Field`, `Input`, `Select`, `TextArea`.

## Commands (run from `web/`)

- `npm run dev` (API must be running on :3000), `npm run build`, `npm run lint`, `npm run typecheck`, `npm run format`.
- Imports have no file extensions here (Vite bundler resolution), unlike `api/` which needs `.js`.
