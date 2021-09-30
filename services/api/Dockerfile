ARG NODE_IMAGE

FROM ${NODE_IMAGE}

ARG POSTGRES_HOST

ARG POSTGRES_USER

ARG POSTGRES_PASSWORD

ARG POSTGRES_DB

WORKDIR /app

RUN npm i -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm i

COPY . .

RUN pnpm build

CMD pnpm db:migrations:run && pnpm start
