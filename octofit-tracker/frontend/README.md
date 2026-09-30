# Octofit Tracker frontend

React 19 and Vite presentation tier for Octofit Tracker.

## Configure the API

The frontend needs a Codespace name to build the API URL. Set `VITE_CODESPACE_NAME` in `octofit-tracker/frontend/.env.local` when running outside a Codespace:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

In Codespaces, Vite uses the built-in `CODESPACE_NAME` when `VITE_CODESPACE_NAME` is not set; an explicit `VITE_CODESPACE_NAME` takes precedence. Requests use `https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/`. If neither variable is available, requests safely fall back to `http://localhost:8000/api/`. Restart Vite after changing `.env.local`.

## Run locally

```bash
npm install
npm run dev
```
