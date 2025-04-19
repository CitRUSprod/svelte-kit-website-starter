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
scripts/dev <docker compose command>
scripts/prod <docker compose command>
```

Run the project by entering these commands and open http://localhost:6700 in your browser:

```sh
# Development
scripts/dev up -d
pnpm dev # or "cd apps/<app>" and "pnpm dev"

# Production
scripts/start
```

### Example of development mode commands

```sh
scripts/dev up -d # Start
scripts/dev down # Stop
scripts/dev logs <app> # View app logs
scripts/dev exec <app> sh # Enter the app container
scripts/dev <docker compose command> # Any docker compose command
```

### Example of production mode commands

```sh
scripts/prod up -d # Start
scripts/prod down # Stop
scripts/prod logs <app> # View app logs
scripts/prod exec <app> sh # Enter the app container
scripts/prod <docker compose command> # Any docker compose command

# or shortcuts

scripts/start # Start
scripts/stop # Stop
scripts/restart # Restart
```

### First run

##### Development mode

1. Enter this command and edit the `.env` file:

```sh
scripts/clone-env
```

2. Start required docker containers for development:

```sh
scripts/dev up -d
```

3. Install project dependencies:

```sh
pnpm i
```

4. Build packages:

```sh
pnpm build
```

5. Run database migrations:

```sh
pnpm --filter api prisma:migrations:run
```

6. Seed the database:

```sh
pnpm --filter api prisma:seeds:run
```

7. Start web and api in development mode:

```sh
pnpm dev
```

##### Production mode

1. Enter this command and edit the `.env` file:

```sh
scripts/clone-env
```

2. Start required docker containers for production:

```sh
scripts/start
```

3. Seed the database:

```sh
scripts/prod exec api sh
pnpm prisma:seeds:run
```

After completing all steps, the application will be available at `http://localhost:<WEBSITE_PORT>` (default is http://localhost:6700).

### Project Structure

- `apps` - Applications
- `packages` - Local libraries
- `configs` - Configuration files (docker, nginx, prettier, etc.)
- `scripts` - Project management scripts (start, stop, restart, backup, etc.)
- `storage` - Storage directory for backups and other data that should not be in the repository
- `tests` - E2E tests with Playwright

### Tools

Commit with `commitizen`:

```sh
pnpm commit
```

Check types with `tsc`:

```sh
pnpm check-types
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

Migrations and seeds are located in `apps/api/src/prisma` in the `migrations` folder and `seeds.ts` file. To work with them, you need to go to the api app directory:

```sh
# Development
cd apps/api

# Production
scripts/prod exec api sh
```

Then you can enter any of the following commands:

```sh
pnpm prisma:migrations:create # Create migrations
pnpm prisma:migrations:run # Run migrations
pnpm prisma:migrations:reset # Reset migrations
pnpm prisma:seeds:run # Run default seeds
pnpm prisma:seeds:run --seed test-users # Run test users seeds
```

### Backups

Backups are placed in `storage/backups` folder.

For manual backup you can use this command:

```sh
scripts/create-backup
```

For automatic backups you can use these commands:

```sh
scripts/enable-automatic-backups # Enable automatic backups (using cron)
scripts/check-automatic-backups # Check if automatic backups are enabled
scripts/disable-automatic-backups # Disable automatic backups
```

The schedule for automatic backups can be configured in `.env` file using `BACKUPS_SCHEDULE` variable in cron format.
Example: `BACKUPS_SCHEDULE="0 3 * * *"` for daily backup at 3 AM.

To restore a database from backup you can use this command:

```sh
scripts/restore-backup <YYYY-MM-DD_hh-mm-ss> # For example 2020-05-13_21-35-00
```

### Swagger

Swagger UI is available at: http://localhost:6700/api/v1/swagger.

To enable Swagger UI, set the `ENABLE_SWAGGER=true` variable in your `.env` file.

### Adminer

Adminer is available at: http://localhost:6700/admin/adminer.
Login credentials: `POSTGRES_USER`, `POSTGRES_PASSWORD` and `POSTGRES_DB` from `.env`.

### MinIO

MinIO Console is available at: http://localhost:6700/admin/minio.
Login credentials: `MINIO_USER` and `MINIO_PASSWORD` from `.env`.
