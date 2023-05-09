# SvelteKit Website Starter

### Get started

> **NOTE:** Before using this template, you need to install `pnpm` (only for development), `docker` and `docker compose`.

Create a new project based on this template using `degit`:

```sh
pnpx degit CitRUSprod/svelte-kit-website-starter my-website
cd my-website
pnpm i
```

The launch is done through `docker compose`, but with scripts `scripts/dev` and `scripts/prod`:

```sh
scripts/dev [docker compose command]
scripts/prod [docker compose command]
```

Run the project by entering these commands and open http://localhost:6700 in your browser:

```sh
# Development
scripts/dev up -d
pnpm --parallel dev # or "cd services/[service]" and "pnpm dev"

# Production
scripts/start
```

### Example of development mode commands

```sh
scripts/dev up -d # Start
scripts/dev down # Stop
scripts/dev logs [service] # View service logs
scripts/dev exec [service] sh # Enter the service container
scripts/dev [docker compose command] # Any docker compose command
```

### Example of production mode commands

```sh
scripts/prod up -d # Start
scripts/prod down # Stop
scripts/prod logs [service] # View service logs
scripts/prod exec [service] sh # Enter the service container
scripts/prod [docker compose command] # Any docker compose command

# or shortcuts

scripts/start # Start
scripts/stop # Stop
scripts/restart # Restart
```

### Tools

Commit with `commitizen`:

```sh
pnpm commit
```

Check types with `tsc`:

```sh
pnpm validate
```

Lint with linters:

```sh
pnpm lint
```

Format with formatters:

```sh
pnpm format
```

### Environment variables

All environment variables are written to the `.env` file. If it doesn't exist, just enter this command:

```sh
scripts/clone-env
```

### Migrations and seeds

The project uses `prisma` to work with the database.

Migrations and seeds are located in `services/api/src/prisma` in the `migrations` folder and `seeds.ts` file. To work with them, you need to go to the api service directory:

```sh
# Development
cd services/api

# Production
scripts/prod exec api sh
```

Then you can enter any of the following commands:

```sh
pnpm prisma:migrations:create # Create migrations
pnpm prisma:migrations:run # Run migrations
pnpm prisma:migrations:reset # Reset migrations
pnpm prisma:seeds:run # Run seeds
```
