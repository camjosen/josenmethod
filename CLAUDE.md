# CLAUDE.md

Guidance for Claude Code (claude.ai/code) working in this repo.

## Overview

AI-powered education orchestration system. A curriculum of structured reading lessons (`src/reading_app`) is rendered by a React SPA (`src/web_frontend`) and served live to multiple clients (teacher phone + student tablet) via a Hono + Bun backend (`src/backend`) that holds ephemeral session state and broadcasts updates over WebSockets.

## Layout

Three top-level code areas. Only the first two are Bun workspaces:

- `src/backend` — Bun + Hono API server, port 3001. WebSocket upgrade happens in `server.ts` before Hono's `fetch` runs.
- `src/web_frontend` — React + Vite SPA, port 5173.
- `src/reading_app` — not a workspace. Pure TypeScript: the curriculum (`static_curriculum/lessons.ts`), tool definitions, and word/sound data. Imported by both backend (for lesson shape) and frontend (for rendering). Edit here when changing what a lesson _is_; edit in the frontend when changing how it _looks_.

Shared TS config: `tsconfig.base.json`.

### Path aliases

Frontend (`src/web_frontend/vite.config.ts` + `tsconfig.json`):

- `@/*` → `src/web_frontend/src/*`
- `@backend/*` → `src/backend/src/*`
- `@reading_app/*` → `src/reading_app/*`

Backend has no aliases today — it uses relative imports to reach `src/reading_app`. Fine to add one if you're doing substantial curriculum work from the backend.

## Commands

From the repo root:

```bash
bun run dev          # both apps in parallel
bun run dev:backend  # backend only (hot reload)
bun run dev:web      # frontend only

bun run db:up        # start Postgres in Docker
bun run db:push      # push schema (no migration file)
bun run db:generate  # generate Drizzle migration files
bun run db:migrate   # apply migrations
bun run db:studio    # open Drizzle Studio UI
```

`bun run dev` is the normal full-stack command — most features touch both sides.

## Backend conventions

### No side effects at module load

External clients (database, WorkOS, etc.) must be lazy. Wrap them in a getter:

```ts
let _client: Client | null = null;
function getClient() {
  if (!_client) _client = new Client(process.env.REQUIRED_VAR!);
  return _client;
}
```

Why: every module imported by `app.ts` runs when the backend boots. A throw at module load takes down _every_ feature, even unrelated ones, and a constructor that reads env vars fails if those vars aren't set yet. This lets someone work on (e.g.) sessions without a real database or WorkOS key in their env.

Already applied to `db/index.ts` and `auth/router.ts`. Keep the pattern.

### Structure

- `server.ts` — `Bun.serve()` entry. Routes WS-upgrade paths to `sessions/ws.ts`; everything else falls through to `app.fetch`.
- `app.ts` — Hono app, CORS, route mounts.
- `auth/router.ts` — `/auth` routes (WorkOS redirect + callback, JWT issuance).
- `users/router.ts` — `/accounts` routes.
- `middleware/auth.ts` — Bearer JWT verification (HS256, 7-day expiry). Sets `accountId` on the Hono context.
- `db/schema.ts`, `db/index.ts` — Drizzle + Postgres (lazy client).
- `sessions/` — ephemeral live-session state (see below).

### Live sessions (`src/backend/src/sessions/`)

In-memory `Map<code, Session>`. One session per lesson. A 4-char code (30-char unambiguous alphabet, no `0/O/1/I`) is generated on create. Clients connect WebSocket to `/sessions/:code/ws?role=teacher|student`; the server applies `ClientMsg` commands and broadcasts full `SessionState` snapshots on every change.

- `types.ts` — wire contracts. Imported directly by the frontend via `@backend/sessions/types`.
- `store.ts` — session map, cursor math, rating → `itemResults` mapping (≥4 stars = `done`).
- `codes.ts` — short-code generator.
- `lessonShape.ts` — imports `src/reading_app/static_curriculum/lessons.ts` to produce per-lesson `activityCounts`.
- `router.ts` — HTTP: list lessons, create session, look up session.
- `ws.ts` — Bun WebSocket handler (`open`/`message`/`close`).

Sessions evaporate when the process dies. That's intentional; no DB table.

## Frontend conventions

### Structure

- `api.ts` — Hono RPC client typed against `@backend/app`'s `AppType`. Token comes from `localStorage` (`jm_token`).
- `App.tsx` — React Router routes, `RequireAuth` wrapper for protected pages.
- `pages/` — one file per route.
- `reading_exercise/` — the standalone `/reading-exercise` demo. Uses `SAMPLE_LESSON` from its local `data.ts`, not the real curriculum.
- `session/` — live session plumbing: `useSession` (WebSocket hook), `Stage` (letterbox wrapper for the 1366×1024 canvas), `SessionStage` (renders lesson/activity/done from server state), `lessonAdapter` (bridges curriculum → UI shape), `api.ts` (HTTP helpers).

### Rendering curriculum activities

`reading_exercise/` renders its own `Lesson`/`Activity`/`Word` types today. `session/lessonAdapter.ts` maps curriculum activities (`ReadSounds`, `VerbalBlending`, `Story`, …) into that shape — currently with minimal item rendering (`spelling` / `characters` as plain strings). Richer rendering (compound tuples, story paragraphs, sound diacritics) is a known follow-up; add it by extending `lessonAdapter` and the components under `reading_exercise/`, not inside `SessionStage`.

### State

TanStack Query is configured but currently unused for sessions — `useSession` is WebSocket-native (push-driven state doesn't fit Query's pull model). Keep using Query for regular REST fetches; use a hook like `useSession` for anything real-time.

### UI components

shadcn/ui (config in `src/web_frontend/components.json`) + Tailwind CSS:

```bash
cd src/web_frontend && bunx shadcn add <component>
```

## Environment variables

Two loading paths — **read this carefully, it has bitten**:

- **Vite** (frontend) loads `.env.local` from the **repo root** via `loadEnv(mode, path.resolve(__dirname, '../..'), '')` in `vite.config.ts`.
- **Bun** (backend) loads `.env` / `.env.local` from the **backend's CWD** (`src/backend`). It does **not** read the repo-root `.env.local`.

So: repo-root `.env.local` is the source of truth for frontend-visible and shared dev secrets; `src/backend/.env` is the source of truth for backend-only vars. Copy what you need into `src/backend/.env` (see `src/backend/.env.example`). The backend now boots without these (they're lazily required), but features that touch them still fail at call time if missing.

Relevant vars: `DATABASE_URL`, `JWT_SECRET`, `PORT` (default 3001), `FRONTEND_URL` (default `http://localhost:5173`), `WORKOS_API_KEY`, `WORKOS_CLIENT_ID`, `WORKOS_REDIRECT_URI`, `VITE_WORKOS_CLIENT_ID` (frontend only).

## Preview / dev servers

`.claude/launch.json` defines both `web` (port 5173) and `backend` (port 3001). Use `preview_start` with whichever you need; sessions work require both running.

## Frontend ↔ backend type sharing

The frontend imports types directly from the backend via `@backend/*` (e.g. `@backend/sessions/types`). This works because both TS projects share a base config and Vite resolves the alias. If cross-package type surface keeps growing, promote the shared bits to a `src/shared/` directory rather than deepening the `@backend` import pattern.
