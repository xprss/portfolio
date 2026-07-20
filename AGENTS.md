# Repository Guidelines

## Project Structure & Module Organization

This repository is a frontend-only portfolio built with React, TypeScript, and Vite. Application code lives in `src/`.

- `src/components/`: reusable UI, split into `common/`, `home/`, and `layout/`
- `src/pages/`: route-level page components
- `src/content/site-content.json`: editable portfolio content source
- `src/models/portfolio.ts`: typed data models that wrap raw JSON content
- `src/styles/index.css`: global styling
- `scripts/`: deployment and webhook helpers
- `dist/`: production build output; do not edit manually

## Build, Test, and Development Commands

- `npm install`: install dependencies
- `npm run dev`: start the Vite development server
- `npm run build`: run TypeScript checks and produce a production build
- `npm run preview`: serve the built app locally for final verification
- `npm run lint`: run the project’s TypeScript checks; this repo does not use ESLint

For containerized verification, use `docker build -t classic-dev-portfolio .`.

## Coding Style & Naming Conventions

Use TypeScript with React function components and hooks. Follow the existing style:

- Use 2-space indentation in TypeScript, TSX, JSON, and CSS to match the current codebase
- `PascalCase` for components and model classes
- `camelCase` for variables, props, and functions
- kebab-case for CSS class blocks such as `.carousel__track`
- Prefer relative imports within `src/`

Keep components focused, move structured content into `site-content.json`, and preserve strict typing instead of passing raw JSON through the UI.

## Testing Guidelines

There is currently no dedicated test framework in this repository. Treat `npm run build` and `npm run lint` as required validation for every change. When adding tests later, place them near the feature or under a dedicated `src/tests/` directory and use filenames like `ComponentName.test.tsx`.

## Commit & Pull Request Guidelines

Recent history favors short, scoped commit messages such as `feat(ui): refine responsive navigation` and `update(navbar): better for mobile`. Prefer:

- `feat(scope): ...`
- `fix(scope): ...`
- `perf(scope): ...`
- `update(scope): ...`

Pull requests should include a concise summary, note any content or routing changes, link the related issue when applicable, and attach screenshots or short recordings for UI updates.

## Deployment & Configuration Notes

Production deployment is supported through `Dockerfile`, `nginx.conf`, and the scripts in `scripts/`. If you change routes or asset handling, verify both `npm run build` and the Docker image still work correctly.
