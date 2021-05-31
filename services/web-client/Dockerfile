ARG NODE_IMAGE

FROM ${NODE_IMAGE}

RUN npm i -g pnpm

WORKDIR /services/web-client

COPY . .

RUN pnpm i

RUN pnpm build
