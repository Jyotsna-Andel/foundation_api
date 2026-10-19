# Library Management: frontend (`web/`)

React UI for the Library Management API. **Project overview and full setup:** see the [root README](../README.md).

## Quick start

The API must be running (`npm run start:dev` in `api/`, with the Docker database up).

```bash
npm install
npm run dev        # http://localhost:5173
```

In development Vite proxies `/api/*` to `http://localhost:3000`, so the browser talks to one origin and no CORS setup is needed.

## Stack

| Concern            | Library                       |
| ------------------ | ----------------------------- |
| Build / dev server | Vite 8                        |
| UI                 | React 19, TypeScript (strict) |
| Styling            | Tailwind CSS 4                |
| Routing            | React Router 8                |
| Server state       | TanStack Query 5              |
| Forms / validation | React Hook Form + Zod 4       |

## Folder guide

| Path                       | Contents                                                           |
| -------------------------- | ------------------------------------------------------------------ |
| `src/main.tsx`             | Providers: TanStack Query client + router                          |
| `src/router.tsx`           | Routes (`/books`, `/loans`, `/members`, `/authors`, `/categories`) |
| `src/api/client.ts`        | Typed `fetch` wrapper; turns the API's error JSON into `ApiError`  |
| `src/api/types.ts`         | Response and request types (mirror the API DTOs)                   |
| `src/api/hooks.ts`         | `useList` / `useCreate` / `useUpdate` / `useRemove` per resource   |
| `src/components/`          | Layout, Modal, form fields, table, delete confirmation             |
| `src/features/<resource>/` | One page per resource: table + form with a Zod schema              |
| `src/lib/`                 | Small helpers (date formatting)                                    |

## How a page works

1. `xxxApi.useList()` fetches the list (cached by TanStack Query).
2. The form validates on the client with a Zod schema that mirrors the API's DTO rules.
3. Saving calls `useCreate` / `useUpdate`. On success, related lists are refetched; on failure the API's message (400 list, 409 conflict, 404) is shown in the form.

## Scripts

| Command             | What it does                             |
| ------------------- | ---------------------------------------- |
| `npm run dev`       | Dev server with hot reload               |
| `npm run build`     | Type-check + production build to `dist/` |
| `npm run preview`   | Serve the production build               |
| `npm run lint`      | oxlint                                   |
| `npm run typecheck` | TypeScript only                          |
| `npm run format`    | Prettier                                 |
