# Octofit Tracker frontend

React 19 and Vite presentation tier for Octofit Tracker.

## Configure the API

Define `VITE_CODESPACE_NAME` in `octofit-tracker/frontend/.env.local` with the Codespace name used by the API's forwarded port 8000:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

The frontend requests `https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/`. Restart the Vite development server after changing environment variables. If `VITE_CODESPACE_NAME` is unset, requests safely fall back to `http://localhost:8000/api/` for local development.

## Run locally

```bash
npm install
npm run dev
```
