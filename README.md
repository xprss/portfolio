# Classic Developer Portfolio

Frontend-only developer portfolio built with React, TypeScript, and Vite. The UI uses a classic git/coding-inspired presentation while keeping content modular and maintainable through typed data classes and config-driven content.

## Scripts

- `npm install`
- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`

## Content Model

Portfolio content lives in `src/content/site-content.json`. The app converts the raw content into typed model instances defined in `src/models/portfolio.ts`, keeping page components clean and predictable.

## Docker

Build and run with Docker:

```bash
docker build -t classic-dev-portfolio .
docker run --rm -p 8080:80 classic-dev-portfolio
```

The production image uses a multi-stage build and serves the built SPA through Nginx with route fallback for project detail pages.

## Redeploy Script

To rebuild the image from the current repo state and restart the VPS container used by `nginx`:

```bash
./scripts/redeploy-portfolio.sh
```

Defaults:

- image: `classic-dev-portfolio:latest`
- container: `portfolio`
- binding: `127.0.0.1:8082 -> 80`

You can override them temporarily:

```bash
IMAGE_NAME=classic-dev-portfolio HOST_PORT=8082 ./scripts/redeploy-portfolio.sh
```

## GitHub Webhook Deploy

The repo also includes:

- `scripts/webhook-deploy.sh` to pull `origin/master` and redeploy the container
- `scripts/github-webhook-server.mjs` to receive signed GitHub push webhooks and trigger the deploy script

Recommended production wiring:

- run the webhook listener as a systemd service on `127.0.0.1:8090`
- proxy an exact `nginx` location such as `/__hooks/github-deploy` to that listener
- configure a GitHub repository webhook for `push` events only
