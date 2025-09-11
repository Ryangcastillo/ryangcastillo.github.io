# Admin Starter Template (Standalone)

Minimal, plug-and-play Admin CMS shell that mounts the Admin UI from `src/admin`. Copy this folder to a new repo, then copy your `src/admin` directory from your project into `templates/admin-starter/src/admin`.

## Quick Start

1) Copy to a new repo/folder, then copy your Admin module:

- From your main project: copy `src/admin` → `templates/admin-starter/src/admin`

2) Install deps and run:

```bash
npm install
npm run dev:admin
# open http://localhost:5176
```

3) Optional API server

Set `VITE_API_BASE` in `.env.local` to point to your API (e.g., http://localhost:5174). Admin will call your endpoints via the injected services inside `src/admin`.

## What’s inside

- `admin.html` — entry HTML for the admin app (Tailwind via CDN)
- `src/main-admin.tsx` — mounts `<AdminApp />` with `BrowserRouter`
- `vite.admin.config.ts` — dev server on 5176, builds admin.html only
- `tsconfig.json`, `vite.config.ts` — basic TS and aliasing to `@` → `src`

## Notes

- This template expects `src/admin` to exist. Bring the Admin module from your project as-is, or adapt it.
- If you already use a different services layer, wrap `<AdminApp />` in `AdminServicesProvider` and pass your custom services (see `src/admin/examples/*` in the main project).

