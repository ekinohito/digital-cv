# syntax=docker/dockerfile:1.7

# -----------------------------------------------------------------------------
# Build
# -----------------------------------------------------------------------------

FROM ghcr.io/voidzero-dev/vite-plus:0.2.9 AS build

WORKDIR /app

COPY --chown=vp:vp package.json pnpm-lock.yaml pnpm-workspace.yaml .node-version* ./

RUN vp install --frozen-lockfile

COPY --chown=vp:vp . .

RUN vp run build

# -----------------------------------------------------------------------------
# Runtime
# -----------------------------------------------------------------------------

FROM nginxinc/nginx-unprivileged:1.28-alpine AS runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build \
    /app/dist \
    /usr/share/nginx/html

EXPOSE 8080

HEALTHCHECK \
    --interval=10s \
    --timeout=3s \
    --start-period=5s \
    --retries=5 \
    CMD wget -q -O /dev/null http://127.0.0.1:8080/healthz || exit 1
