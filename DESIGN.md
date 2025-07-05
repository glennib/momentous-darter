# RSS Reader Web Application — Technical Design Document

## 1. Overview

This project is a full-stack web application that functions as a personal RSS feed reader. Users can register, add RSS feeds, and track which articles they have read. The application will support multi-user data isolation, persistent per-user article state, and background feed polling.

### Learning Goals:

- Full-stack TypeScript development
- Proficiency with **Remix** (React-based framework)
- Authentication/authorization via **JWT** or secure cookies
- Use of **CockroachDB** (distributed SQL)
- Deployment to **Fly.io**
- Exploration of agentic coding workflows

## 2. Goals and Constraints

### 2.1 Functional Goals

- User registration and authentication
- Feed subscription by URL
- Background polling of RSS feeds
- UI for reading articles and managing read/starred state

### 2.2 Non-Functional Goals

- TypeScript end-to-end (frontend, backend, tools)
- Simple, testable codebase
- Secure session handling
- Cloud-hosted, scalable infrastructure
- Static analysis, formatting, and testing automation

### 2.3 Constraints

- Hosted on Fly.io (initially as a single-region VM)
- Background jobs run separately (cron or long-running task)
- Use **CockroachDB**, not necessarily PostgreSQL-compatible ORMs
- Local development must be reproducible (shell.nix or equivalent)
- Tooling (formatter, linter, test runner) must be fully automated and idiomatic

## 3. Architecture Overview

### 3.1 Components

+----------------------+ +---------------------+
| Remix Web Server | <--> | CockroachDB |
| (Fly.io, TypeScript)| | (SQL + TLS) |
+----------+-----------+ +---------------------+
|
v
+-----------------------+
| RSS Polling Job (cron)|
| (standalone script) |
+-----------------------+

- **Frontend + Backend:** Remix (React, TS)
- **Database:** CockroachDB (self-hosted or managed)
- **Worker:** Node script, scheduled (Fly cron or separate service)
- **Tooling:** Prettier, ESLint, Vitest, SQLFluff

## 4. Technology Stack

| Area            | Tool                        | Rationale                                        |
| --------------- | --------------------------- | ------------------------------------------------ |
| Framework       | Remix                       | Fullstack React with built-in routing/loaders    |
| Language        | TypeScript                  | Static types across stack                        |
| Database        | CockroachDB                 | Distributed SQL with Postgres-like interface     |
| ORM             | Kysely (preferred)          | Type-safe, minimal, Cockroach-compatible         |
| Auth            | Remix Auth                  | Native to Remix, pluggable, cookie-based         |
| RSS Parser      | `rss-parser` (Node)         | Reliable RSS parsing                             |
| Job Scheduling  | Fly.io Cron or shell script | For polling feeds regularly                      |
| Hosting         | Fly.io                      | Simple, scalable deployment                      |
| Testing         | Vitest                      | Modern, fast TypeScript testing                  |
| Formatting      | Prettier                    | Opinionated formatting                           |
| Linting         | ESLint                      | Static analysis with TS/React plugins            |
| SQL Lint/Format | SQLFluff                    | Linting for hand-written SQL (Cockroach dialect) |

## 5. Database Schema (Initial Draft)

### Tables

#### `users`

- `id` (UUID, PK)
- `email` (string, unique)
- `password_hash` (string)
- `created_at` (timestamp)

#### `feeds`

- `id` (UUID, PK)
- `url` (string, unique)
- `title` (nullable string)
- `description` (nullable text)
- `last_fetched_at` (timestamp)
- `created_at` (timestamp)

#### `subscriptions`

- `id` (UUID, PK)
- `user_id` (FK → users)
- `feed_id` (FK → feeds)
- `created_at` (timestamp)

#### `articles`

- `id` (UUID, PK)
- `feed_id` (FK → feeds)
- `title` (string)
- `link` (string)
- `summary` (text)
- `published_at` (timestamp)
- `guid` (string, unique per feed)

#### `user_article_state`

- `id` (UUID, PK)
- `user_id` (FK → users)
- `article_id` (FK → articles)
- `read` (boolean)
- `starred` (boolean)
- `updated_at` (timestamp)

## 6. Authentication & Authorization

### Auth Strategy

- Use **Remix Auth** with a custom strategy (email + password)
- Store user ID in a cookie-based session (encrypted)
- Passwords hashed with **Argon2** or **bcrypt**

### Authorization

- Middleware/loaders enforce identity
- Join checks on feeds/articles/subscriptions

## 7. Background Feed Polling

### Polling Strategy

- Run a Node script on interval:
  - Query active feeds
  - Fetch each URL
  - Parse RSS
  - Insert articles by `guid`
- Schedule via:
  - Fly.io's native cron
  - `systemd` or external process (if needed)

## 8. Deployment

### App

- Dockerized Node app
- Use `fly.toml` for service and volume config
- Store secrets via `fly secrets`

### Database

- Option 1: Self-host CockroachDB on Fly.io with volume
- Option 2: Use Cockroach Cloud (TLS-enabled, easier ops)

## 9. Tooling and Automation

### Formatting / Linting / Testing

- `pnpm format` → Prettier
- `pnpm lint` → ESLint with TS + React
- `pnpm test` → Vitest
- `pnpm check` → Combined script for CI

### SQL Linting

- `sqlfluff lint ./migrations`
- Optional: format via `sqlfluff fix`

### Migration Tool

- Preferred: `dbmate` (pure SQL, Cockroach-compatible)
- Alternative: manual SQL files with `sqlfluff` + versioning

## 10. Open Questions

| Question             | Options                                                         |
| -------------------- | --------------------------------------------------------------- |
| ORM                  | Kysely (recommended), Drizzle, Prisma (less Cockroach-friendly) |
| Background job infra | Fly cron, external runner, queue system                         |
| Auth                 | Remix Auth with cookie storage vs custom JWT                    |
| Migrations           | `dbmate` vs DIY SQL scripting                                   |
