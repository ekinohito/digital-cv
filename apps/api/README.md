# API

NestJS backend for the digital developer card.

## Stack

- TypeScript, NestJS 11
- GraphQL (code-first with `@nestjs/graphql` + Apollo Server)
- Prisma 7 with the CockroachDB provider (`@prisma/adapter-pg` driver adapter)
- S3-compatible object storage via `@aws-sdk/client-s3` (MinIO locally)

The GraphQL schema is generated from TypeScript decorators into `schema.gql`
at startup. TypeScript is the single source of truth for the API contract;
`schema.prisma` remains the source of truth for the database schema.

## Project setup

```bash
pnpm install
pnpm run prisma:generate
```

The typed Prisma client is generated into `src/generated/prisma` (gitignored).

## Environment

Copy the variables from the repository root `.env.example` and fill in
`apps/api/.env` for local development:

```dotenv
DATABASE_URL="postgresql://root@127.0.0.1:26257/portfolio?sslmode=disable"
ADMIN_ACCESS_TOKEN=some-long-random-value
S3_ENDPOINT=http://127.0.0.1:9000
S3_REGION=us-east-1
S3_BUCKET=portfolio
S3_ACCESS_KEY_ID=minioadmin
S3_SECRET_ACCESS_KEY=minioadmin
S3_FORCE_PATH_STYLE=true
```

## Database

```bash
# start CockroachDB + MinIO
docker compose up -d cockroach minio minio-init

# create/apply migrations during development
pnpm run prisma:migrate

# apply migrations in production-like environments
pnpm run prisma:deploy

# deterministic seed data
pnpm run db:seed
```

Note: the initial migration disables CockroachDB's `create_table_with_schema_locked`
default because locked tables reject the `ALTER TABLE ... ADD FOREIGN KEY`
statements Prisma emits. Keep that statement in mind when adding migrations
that create new tables.

## Compile and run

```bash
pnpm run start:dev   # watch mode
pnpm run start:prod  # compiled dist
```

- GraphQL endpoint: `POST /graphql`
- GraphiQL IDE: `GET /graphql` (HTML)
- Health check: `GET /api/health`
- Asset upload (admin): `POST /api/admin/assets` (multipart, `file` field)
- Asset download: `GET /api/assets/:id`

Admin operations require `Authorization: Bearer $ADMIN_ACCESS_TOKEN`.

## Tests

```bash
pnpm run lint        # eslint (+ prettier)
pnpm run typecheck   # tsc --noEmit
pnpm test            # unit tests (no database required)
pnpm run test:e2e    # GraphQL e2e suite (needs a migrated database)
```

The e2e suite runs against `DATABASE_URL` with an in-memory storage service,
so MinIO is not required for e2e runs.

## Docker

From the repository root:

```bash
docker compose up --build
```

starts CockroachDB, MinIO (with bucket init), migrations + seed, the API,
and the frontend — with no external services required.
