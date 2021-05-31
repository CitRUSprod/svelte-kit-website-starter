# SvelteKit Website Template

### Get started

> **NOTE:** Before using this template, you need to install `pnpm` (only for development), `docker` and `docker-compose`.

Create a new project based on this template using degit:

```sh
pnpx degit CitRUSprod/svelte-kit-website-template my-website
cd my-website
```

The launch is done through docker-compose, but via scripts `scripts/dev` and `scripts/prod`:

```sh
scripts/dev [docker-compose command]
scripts/prod [docker-compose command]
```

Run the project just enter these commands and open http://localhost:6700 in your browser:

```sh
# Development
scripts/dev up -d
pnpm i
pnpm dev --parallel

# Production
scripts/start
```

Make a commit via commitizen:

```sh
pnpm git:commit
```

### Development mode commands example

```sh
scripts/dev up -d # Start
scripts/dev down # Stop
scripts/dev logs [service] # View service logs
scripts/dev exec [service] sh # Enter the service container
scripts/dev [docker-compose command] # Any docker-compose command
```

### Production mode commands example

```sh
scripts/prod up -d # Start
scripts/prod down # Stop
scripts/prod logs [service] # View service logs
scripts/prod exec [service] sh # Enter the service container
scripts/prod [docker-compose command] # Any docker-compose command

# or shortcuts

scripts/start # Start
scripts/stop # Stop
scripts/restart # Restart
```

### Settings

All settings for docker-compose are written to a `.env` file. If it doesn't exist just enter these command:

```sh
scripts/clone-env
```
