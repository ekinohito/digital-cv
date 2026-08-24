# AGENTS.md

## Project

This repository contains a production-style digital developer card built as a small backend-heavy full-stack application.

The goal is to demonstrate practical TypeScript backend engineering with NestJS, GraphQL, Prisma, CockroachDB, S3-compatible object storage, Docker, and a maintainable React frontend.

Prefer simple, explicit solutions over unnecessary abstraction. The application must be easy to understand and modify during live coding.

## Architecture

Use a pnpm workspace:

```text
apps/
  api/    NestJS backend
  web/    React + Vite frontend
```

The application is a modular monolith.

```text
React
  ↓ GraphQL
NestJS
  ├─ Prisma → CockroachDB
  └─ StorageService → MinIO / S3-compatible storage
```

Use GraphQL for application data and mutations.

Use REST only where it is a better protocol fit, primarily binary asset upload/download and health checks.

## Backend

Stack:

* TypeScript
* Node.js
* NestJS
* GraphQL, code-first
* Prisma
* CockroachDB
* AWS SDK S3 client
* MinIO for local S3-compatible storage

Organize backend code by feature:

```text
src/
  common/
  infrastructure/
    prisma/
    storage/
  modules/
    profile/
    experience/
    projects/
    skills/
    assets/
```

Resolvers/controllers must be thin.

Business/application logic belongs in services.

Prisma calls must not be scattered through resolvers or controllers.

Do not introduce repository interfaces, CQRS, event sourcing, microservices, or other abstractions unless an actual requirement justifies them.

## Frontend

Stack:

* React
* Vite
* TypeScript
* React Router
* Apollo Client
* react-i18next

Routes:

```text
/
 /architecture
 /admin
```

The public website supports Russian and English.

Persist the selected locale in localStorage.

The `/admin` route provides CRUD editing for portfolio content.

## Authentication

There is intentionally no user/account system.

The server receives the admin token from:

```text
ADMIN_ACCESS_TOKEN
```

Protected GraphQL mutations and admin REST endpoints require:

```text
Authorization: Bearer <token>
```

Never expose `ADMIN_ACCESS_TOKEN` through frontend environment variables or build output.

The admin UI asks the user for the token and stores it in sessionStorage for the current browser session.

All authorization must be enforced server-side.

## Database

Use Prisma with the CockroachDB provider.

Persist:

* profile
* experience
* projects
* skills
* project-skill relationships
* social links
* asset metadata

Keep the schema explicit and easy to evolve during live coding.

Every schema change must include a Prisma migration.

Provide deterministic seed data.

## Localization

The product supports exactly two locales: `en` and `ru`.

For editable localized content, prefer explicit fields such as:

```text
titleEn
titleRu
descriptionEn
descriptionRu
```

Do not build a generic CMS localization framework.

## Storage

Store binary assets in S3-compatible storage.

Local development uses MinIO.

Keep object-storage details behind `StorageService`.

CockroachDB stores asset metadata; binary data belongs in object storage.

The backend may stream uploaded/downloaded files instead of introducing GraphQL multipart upload complexity.

## Docker

`docker compose up --build` must start a complete usable application including:

* CockroachDB
* MinIO
* MinIO bucket initialization
* API
* frontend

No external database or cloud account must be required for local use.

## Quality

Before considering work complete, run:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

Add focused tests for important backend behavior and at least a small GraphQL e2e suite.

Do not weaken TypeScript types to silence errors.

Do not use `any` unless integration with an external untyped boundary genuinely requires it.

Do not leave generated code, dead abstractions, placeholder TODOs, or fake production behavior.

## Git

Keep changes logically separated and commits understandable.

Prefer conventional commits such as:

```text
feat(api): add project management
feat(web): add portfolio experience section
test(api): cover protected project mutations
```

## Definition of Done

A feature is complete when:

1. its behavior works through the real application;
2. authorization is enforced where required;
3. data persists correctly;
4. errors are handled visibly and predictably;
5. TypeScript, linting, tests, and builds pass;
6. Docker setup still starts the complete project;
7. the implementation remains straightforward enough to explain and modify during an interview.
