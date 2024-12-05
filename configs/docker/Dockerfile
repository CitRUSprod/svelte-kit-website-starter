ARG NODE_IMAGE
FROM ${NODE_IMAGE} AS base
WORKDIR /project
RUN corepack enable && corepack prepare pnpm@9.14.4 --activate
ENV PNPM_HOME=/usr/local/bin

FROM base AS preparer
RUN pnpm add -g turbo@2.3.3
COPY . .
RUN turbo prune --docker web api

FROM base AS installer
COPY --from=preparer /project/out/json .
COPY --from=preparer /project/out/full/apps/api/src/prisma/schema.prisma ./apps/api/src/prisma/
RUN pnpm i
COPY . .

FROM installer AS web
ARG PUBLIC_TITLE
ARG PUBLIC_BASE_URL
ENV PUBLIC_IS_DOCKER_CONTAINER=true
RUN pnpm build --filter=web...
WORKDIR /project/apps/web
CMD pnpm start

FROM installer AS api
ENV IS_DOCKER_CONTAINER=true
RUN pnpm build --filter=api...
WORKDIR /project/apps/api
CMD pnpm prisma:migrations:run && pnpm start
