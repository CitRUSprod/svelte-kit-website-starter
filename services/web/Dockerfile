ARG NODE_IMAGE

FROM ${NODE_IMAGE}

ARG PUBLIC_TITLE

ARG PUBLIC_BASE_URL

WORKDIR /app

RUN npm add -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm i

COPY . .

RUN pnpm build

CMD pnpm start
