<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Ryan Castillo — Data Analyst Portfolio

Modern, responsive portfolio built with React + Vite, showcasing projects, skills, and an AI-powered chat assistant. The app uses a clean, modular `src/` architecture and Tailwind via CDN for fast iteration without extra tooling.

## Features

- Modular React app with TypeScript and React Router v6.
- AI-style chat assistant (mocked) that can show project and content previews.
- Accessible tab system with keyboard navigation and persisted selection.
- Responsive UI with Tailwind CSS via CDN; no Tailwind build step required.
- Mocked services for local development; easy swap to real backend.

## Tech Stack

- React 19, React Router 6, TypeScript 5, Vite 6
- Tailwind (CDN in `index.html`)

## Getting Started

- Prerequisites: Node.js 18+
- Install: `npm install`
- Dev server: `npm run dev`
- Production build: `npm run build`
- Preview build: `npm run preview`

Notes:
- Tailwind is loaded from CDN; `index.css` is optional. Vite will warn if it’s not present — safe to ignore.
- No backend is required to run; services are mocked in `src/services/`.

## Project Structure

- Entry: `src/main.tsx`
- App shell: `src/App.tsx`
- Pages: `src/pages/*`
- Components: `src/components/*`
- Icons: `src/components/icons/*`
- Services (mock APIs): `src/services/*`
- Types: `src/types.ts`

Import Alias:
- `@` resolves to `src/` (configured in `vite.config.ts` and `tsconfig.json`). Prefer `@/components/Hero` over deep relative paths.

Legacy Files:
- There are older top-level `components/`, `pages/`, etc. These are not used by Vite (entrypoints live in `src/`). Keep them untouched unless intentionally migrating content.

## Backend Integration (Python Backend-repo)

Current services are mocked and return local data:
- `src/services/projectService.ts`
- `src/services/geminiService.ts` - AI service using OpenRouter API

To connect your Python backend:
- Replace mock functions with real API calls while keeping signatures stable.
- Centralize base URL and headers in the provided client util: `src/services/api.ts`.
- Feature flag: set `VITE_API_BASE` in `.env.local` to enable live API calls. When unset, services fall back to local mocks.
  - Optional: override endpoints with `VITE_API_CHAT_ENDPOINT` (default `/chat`) and `VITE_API_BIO_ENDPOINT` (default `/bio`).
- Example (pseudo):

```ts
// src/services/projectService.ts
export const getProjects = async (): Promise<Project[]> => {
  const { api } = await import('./api');
  return api.get<Project[]>('/projects');
};
```

Bio and chat services use the backend if configured:

```ts
// src/services/geminiService.ts - OpenRouter integration
export const fetchBio = async (): Promise<string> => { /* calls /bio or mock */ };
export const chatWithRyanAI = async (message: string) => { /* posts to /chat or mock */ };
```

And the Home page now fetches bio asynchronously:

```ts
// src/pages/Home.tsx
import { fetchBio } from '../services/geminiService'; // Now uses OpenRouter
useEffect(() => { fetchBio().then(setBio); /* ... */ }, []);
```

Environment variables go in `.env.local` (Vite exposes `VITE_*` only):
- `VITE_API_BASE=https://api.example.com`

## Collaboration Protocol (GitHub Copilot / AI Agent)

- Scope: Modify/add under `src/` only; avoid creating new top-level folders.
- Imports: Use `@` alias, keep typings strict, and maintain stable function signatures.
- Components: Co-locate icons under `src/components/icons/`.
- Tabs: Use `src/components/RepoTabs.tsx` (exports `Tabs`) for tabbed UI.
- Styling: Tailwind utilities only unless global styles are required.
- Services: Keep side effects minimal, centralize error handling.

Acceptance Criteria (when reviewing Copilot proposals):
- Accept when changes compile (`npm run build`), preserve types, follow `src/` architecture, and keep UX consistent.
- Reject when proposals add root-level duplicates, break imports, add untyped APIs, or hardcode environment specifics.
- Feedback format for rework: include a short rationale and precise file and line references.

Suggested Review Prompt for Copilot:
- “Evaluate this change against our modular `src/` architecture, alias `@`, and typed services. If it compiles, preserves types, and UX remains consistent, proceed. Otherwise, revert and propose a minimal fix.”

## Troubleshooting

- Tailwind classes not applying: ensure the CDN `<script src="https://cdn.tailwindcss.com">` is present in `index.html`.
- `index.css` warning during build: harmless if you don’t use a CSS file. Create `/index.css` only if needed.
- Router paths on static hosting: for GitHub Pages, consider a `basename` if deploying to a subpath.
- API not reachable: if `VITE_API_BASE` is set but calls fail, the app logs a warning and falls back to mock data to keep the UI working.

## Change Log (Maintained by Codex)

- Standardized Vite app to use `src/` entrypoint; `index.html` now loads `/src/main.tsx` and removed ESM import map for React.
- Ensured Vite alias `@` resolves to `src/`.
- Replaced `src/components/RepoTabs.tsx` with the accessible `Tabs` implementation (keyboard nav + persisted state).
- Added icons to `src/components/icons/`: `ArrowRightIcon`, `ChipIcon`, `DocumentIcon`, `MailIcon`, `LinkedInIcon`.
- Added pages in `src/pages/`: `About.tsx`, `Projects.tsx`, `Contact.tsx`.
- Build verified: `npm run build` produces valid artifacts in `dist/`.
- Type-safety: limited `tsc` scope to `src/` and included `types/**/*.d.ts` so legacy root files don’t block type-checking; PNG module types are resolved.
- Added SPA fallback `404.html` so GitHub Pages deep links work.

## Deploying to GitHub Pages

- This repo name suggests a user site (`<username>.github.io`), so it deploys at the domain root and needs no Vite `base` setting.
- Commit the included `404.html` so client-side routes (`/about`, `/projects`, etc.) work on refresh.
- Build and publish the `dist/` folder via GitHub Pages (Actions or Pages settings):
  - Build: `npm run build`
  - Deploy: serve the `dist/` directory
  - If using Actions, use a standard Vite deploy workflow (upload `dist` as artifact, then deploy).
