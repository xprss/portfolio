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
