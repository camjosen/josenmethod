# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

AI-powered education orchestration system. The backend serves a REST API via Hono, the frontend is a React SPA that consumes it using the Hono RPC client.

## Monorepo Structure

Bun workspaces with two packages:
- `src/backend` — Hono API server (port 3001)
- `src/web_frontend` — React + Vite SPA (port 5173)

Shared TypeScript config in `tsconfig.base.json` at the root.

## Commands

Run from the repo root:

```bash
bun run dev          # both apps in parallel
bun run dev:backend  # backend only (hot reload)
bun run dev:web      # frontend only

bun run db:push      # push schema to DB (no migration file)
bun run db:generate  # generate Drizzle migration files
bun run db:migrate   # apply migrations
bun run db:studio    # open Drizzle Studio UI
```

Run from `src/backend` or `src/web_frontend` directly for workspace-scoped commands.

## Architecture

### Backend (`src/backend/src/`)

- `server.ts` — `Bun.serve()` entry point
- `app.ts` — Hono app, CORS middleware, route registration
- `auth/router.ts` — `/auth` routes (register, login, logout)
- `users/router.ts` — `/users` routes (profile)
- `middleware/auth.ts` — JWT verification middleware (HS256, 7-day expiry)
- `db/schema.ts` — Drizzle schema (PostgreSQL)
- `db/index.ts` — Drizzle client (reads `DATABASE_URL` env var)

Passwords are hashed with `Bun.password`. Tokens are stored/sent as `Authorization: Bearer <token>`.

### Frontend (`src/web_frontend/src/`)

- `api.ts` — Hono client instance with token injection from `localStorage` (`jm_token` key)
- Routes: `/login` (register/login toggle), `/user/:userId` (protected profile page)
- `RequireAuth` wrapper redirects unauthenticated users to `/login`
- TanStack Query v5 manages server state caching

### Frontend → Backend Communication

Uses Hono's typed RPC client (`hono/client`). The frontend imports route types from the backend to get end-to-end type safety without a separate schema definition layer. The base URL is `http://localhost:3001`.

## Environment Variables

Backend requires a `.env` file (see `src/backend/.env.example`):
- `DATABASE_URL` — PostgreSQL connection string
- `JWT_SECRET` — secret for HS256 signing
- `PORT` — defaults to 3001

## UI Components

Frontend uses shadcn/ui (config at `src/web_frontend/components.json`) with Tailwind CSS. Add new shadcn components via:

```bash
cd src/web_frontend && bunx shadcn add <component>
```
