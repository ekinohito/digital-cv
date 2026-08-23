# syntax=docker/dockerfile:1.7

ARG NODE_VERSION=24
ARG PNPM_VERSION=11.22.0


# -----------------------------------------------------------------------------
# Base
# -----------------------------------------------------------------------------

FROM node:${NODE_VERSION}-bookworm-slim AS base

ARG PNPM_VERSION

RUN apt-get update -y \
    && apt-get install -y --no-install-recommends openssl \
    && rm -rf /var/lib/apt/lists/*

RUN npm install --global pnpm@${PNPM_VERSION}

WORKDIR /app


# -----------------------------------------------------------------------------
# Dependencies
# -----------------------------------------------------------------------------

FROM base AS deps

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN --mount=type=cache,id=api-pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile --prod=false


# -----------------------------------------------------------------------------
# Build
# -----------------------------------------------------------------------------

FROM deps AS build

COPY prisma/schema.prisma ./prisma/schema.prisma
COPY prisma.config.ts tsconfig.json ./

# Generate the typed Prisma client into src/generated before compiling the app.
# tsconfig.json must be present so Prisma emits the correct module format.
RUN pnpm exec prisma generate

COPY . .

RUN pnpm run build


# -----------------------------------------------------------------------------
# Migration / seed image
# -----------------------------------------------------------------------------

FROM build AS migrate

ENV NODE_ENV=production

CMD ["sh", "-c", "pnpm run prisma:deploy && pnpm run db:seed"]


# -----------------------------------------------------------------------------
# Production dependencies
# -----------------------------------------------------------------------------

FROM build AS production-deps

RUN pnpm prune --prod


# -----------------------------------------------------------------------------
# Runtime
# -----------------------------------------------------------------------------

FROM node:${NODE_VERSION}-bookworm-slim AS runtime

ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /app

RUN groupadd --system --gid 10001 app \
    && useradd \
        --system \
        --uid 10001 \
        --gid app \
        --home-dir /app \
        --shell /usr/sbin/nologin \
        app

COPY --from=production-deps --chown=app:app /app/package.json ./
COPY --from=production-deps --chown=app:app /app/node_modules ./node_modules
COPY --from=production-deps --chown=app:app /app/dist ./dist

# The application regenerates schema.gql at startup, so the runtime user
# needs write access to the working directory.
RUN chown app:app /app

USER app

EXPOSE 3000

HEALTHCHECK \
    --interval=10s \
    --timeout=3s \
    --start-period=10s \
    --retries=5 \
    CMD node -e "fetch('http://127.0.0.1:3000/api/health').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

CMD ["node", "dist/main.js"]
