ARG NODE_IMAGE
FROM ${NODE_IMAGE} AS base
WORKDIR /project
RUN npm add -g pnpm@8.10.5
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json ./apps/web/
COPY apps/api/package.json ./apps/api/
COPY apps/api/src/prisma/schema.prisma ./apps/api/src/prisma/
COPY packages/configs/package.json ./packages/configs/
RUN pnpm i
COPY . .

FROM base AS web
WORKDIR /project/apps/web
ARG PUBLIC_TITLE
ARG PUBLIC_BASE_URL
RUN pnpm build
CMD pnpm start

FROM base AS api
WORKDIR /project/apps/api
RUN pnpm build
CMD pnpm prisma:migrations:run && pnpm start
