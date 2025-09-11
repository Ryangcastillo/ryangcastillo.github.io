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
- Simple Admin UI (no backend required) to manage projects and site settings.
- Extended Admin UI: Dashboard, Projects, Content (Hero/Skills/Links), Data Sources, Site Settings.

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

## Admin UI (CMS-lite)

- Route: visit `/admin` in your browser.
- Auth: optionally protect with a password by setting `VITE_ADMIN_PASSWORD` in `.env.local`.
  - If unset, the admin is open locally (useful for quick edits during development).
- Storage modes:
  - If `VITE_API_BASE` is set, admin uses your backend endpoints.
  - Otherwise, it stores changes in `localStorage` so you can iterate without a backend.
    - Projects are saved under `portfolio.projects`.
    - Site settings (bio, contact email) are saved under `portfolio.siteSettings`.

What you can edit now:
- Dashboard: quick stats and shortcuts.
- Projects: add, edit, delete (feeds homepage + `/projects`).
- Content: hero title/subtitle, skills (adds a “Custom Skills” tab), external links.
- Data Sources: configure connection style (none/API/database/URL) and store related fields (no runtime connections are made yet).
- Site settings: bio override and contact email (Contact page).

Code layout:
- `src/admin/AdminApp.tsx` – Admin router and pages
- `src/admin/components/*` – Admin layout, auth gate, forms
- `src/admin/pages/*` – Dashboard, Projects, Content, Data Sources, Site Settings
- `src/admin/services/*` – Plug-and-play services abstraction and default adapters
- `src/admin/examples/*` – Examples showing how to inject custom services and mount the Admin
- `src/services/projectService.ts` – Now supports CRUD with localStorage/API fallback
- `src/services/siteSettingsService.ts` – Site settings read/write with fallback
- `src/services/cmsSettingsService.ts` – Content (hero/skills/links/data source) settings service
- `src/services/geminiService.ts` – Reads admin bio override before calling OpenRouter

Security note:
- This is a client-side admin (for GitHub Pages/static hosting). For multi-user or secure editing, connect a real backend and set `VITE_API_BASE` + `VITE_ADMIN_PASSWORD`.

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
import { fetchBio } from '@/services/geminiService'; // Now uses OpenRouter
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
- Added simple Express server under `server/` with JSON file storage and endpoints:
  - `GET/POST/PUT/DELETE /projects`
  - `GET/PUT /site-settings`
  - `GET/PUT /cms-settings`
  - Start with `npm run server` (defaults to `http://localhost:5174`).

## Local API Server (Optional)

- Start: `npm run server` (port 5174). Health check at `/health`.
- Combined dev: `npm run dev:full` to run Vite and API together.
- Point the app to it by setting `VITE_API_BASE=http://localhost:5174` in `.env.local`.

Storage
- Persists JSON under `server/data/`.
- Safe for local development; not intended for production use.

## Reusing the Admin Module in Another Project

- Copy `src/admin/` into your project.
- Implement the service interfaces defined in `src/admin/services/types.ts`:
  - `IProjectService`, `ISiteSettingsService`, `ICmsSettingsService`.
- Provide your implementations via `AdminServicesProvider`.

Minimal example using custom services:

```tsx
// src/admin/examples/customServicesExample.ts has a full example
import { AdminServicesProvider } from '@/admin/services/AdminServicesContext';
import { customAdminServices } from '@/admin/examples/customServicesExample';
import AdminApp from '@/admin/AdminApp';

export function AdminMount() {
  return (
    <AdminServicesProvider services={customAdminServices}>
      <AdminApp />
    </AdminServicesProvider>
  );
}
```

Mount under your router:

```tsx
import { Routes, Route } from 'react-router-dom';

<Routes>
  <Route path="/admin/*" element={<AdminMount />} />
  {/* ...other routes */}
  
</Routes>
```

Standalone admin entry (debug separately):
- Add an `admin.html` like in this repo and a small entry file similar to `src/admin/main-admin.tsx`.
- Run with `vite --config vite.admin.config.ts`.

## Deploying to GitHub Pages

- This repo name suggests a user site (`<username>.github.io`), so it deploys at the domain root and needs no Vite `base` setting.
- Commit the included `404.html` so client-side routes (`/about`, `/projects`, etc.) work on refresh.
- Build and publish the `dist/` folder via GitHub Pages (Actions or Pages settings):
  - Build: `npm run build`
  - Deploy: serve the `dist/` directory
  - If using Actions, use a standard Vite deploy workflow (upload `dist` as artifact, then deploy).
