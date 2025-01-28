ARG DOCKER_REGISTRY=docker.io
ARG NODE_VERSION

FROM ${DOCKER_REGISTRY}/node:${NODE_VERSION}-alpine AS base

FROM base AS install-all-deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

FROM install-all-deps AS install-prod-deps
# Use NPM cache from `install-all-deps` and re-run `npm ci` with `--omit=dev`
RUN rm -rf node_modules && npm ci --ignore-scripts --omit=dev

FROM base AS builder-and-server-base
WORKDIR /app
ARG CI
ARG BUILD_VERSION=123
ENV CI=$CI
ENV BUILD_VERSION=$BUILD_VERSION

FROM builder-and-server-base AS builder

COPY --from=install-all-deps /app/node_modules ./node_modules
COPY . ./

RUN time npm run build \
    && find . ! -name .next -mindepth 1 -maxdepth 1 -exec rm -rf {} + # Remove everything except ".next" folder

FROM builder-and-server-base AS server

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY package.json ./
COPY --from=install-prod-deps /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next

USER nextjs

EXPOSE 7900
CMD ["npm", "start"]
