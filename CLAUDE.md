# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**fanon** — SaaS platform that helps Telegram channel owners monetize their audience with automated subscription management and payments via Payme & Click.

## Stack

- **Runtime/Package manager**: Bun (v1.3.14) — used for both running code and managing packages
- **Monorepo orchestration**: Turborepo
- **Backend framework**: Hono on Bun
- **Database ORM**: Prisma v7 (PostgreSQL), custom config at `apps/backend/prisma.config.ts`, generated client outputs to `src/generated/prisma`
- **Language**: TypeScript (ESM, `moduleResolution: bundler`)

## Commands

All commands run from the repo root unless noted.

```bash
bun dev           # start all apps in watch mode
bun build         # build all packages/apps via Turborepo
bun lint          # lint all packages/apps
bun check-types   # typecheck all packages/apps
bun format        # prettier on **/*.{ts,tsx,md}
```

Backend only (from `apps/backend/`):

```bash
bun dev           # start backend with --watch
bun start         # start backend without watch
bun lint          # ESLint on backend
```

Prisma (from `apps/backend/`):

```bash
bunx prisma migrate dev    # create and apply a migration
bunx prisma generate       # regenerate the Prisma client
bunx prisma studio         # open Prisma Studio
```

## Environment

Copy `apps/backend/.env.example` to `apps/backend/.env` before running the backend:

```env
PORT=5500
DATABASE_URL=postgresql://user:pswd@host:port/db_name
```

`config.ts` throws at startup if either variable is missing.

## Architecture

```
fanon/
├── apps/
│   ├── backend/          # Hono API server
│   │   ├── src/
│   │   │   ├── index.ts          # Bun.serve entry point
│   │   │   ├── libs/hono-app.ts  # Hono app instance and route registration
│   │   │   └── helpers/
│   │   │       └── config.ts     # Typed env accessor (throws on missing vars)
│   │   └── prisma/schema.prisma  # DB schema
│   └── landing/          # (planned)
└── packages/
    ├── eslint-config/    # @fanon/eslint-config — shared TS-aware ESLint rules
    └── typescript-config/ # @fanon/typescript-config — base + backend tsconfig
```

**Import alias**: `@/*` resolves to `src/*` inside `apps/backend`.

**Route structure**: All routes are registered on the Hono app in `src/libs/hono-app.ts` and exported; `src/index.ts` only wires Bun.serve.

**Prisma setup**: The project uses a non-default `prisma.config.ts` (not `prisma/schema.prisma` directly for config). The schema lives at `prisma/schema.prisma` and migrations at `prisma/migrations/`. Generated client goes to `src/generated/prisma` — commit this path after `prisma generate`.

## Avoid doing these commands from user

1. Do not anything with git, (never and ever) just teach user how to do it
