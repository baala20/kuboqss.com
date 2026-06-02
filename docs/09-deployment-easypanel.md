# Deployment On EasyPanel

## Domains

Frontend:

```text
https://kuboqss.com
https://www.kuboqss.com
```

Backend:

```text
https://api.kuboqss.com
```

## Database

Postgres is already installed in EasyPanel.

Internal connection:

```text
postgres://kuboqss:kuboqss@kuboqss_database:5432/kuboqss?sslmode=disable
```

Backend should use this as `DATABASE_URL`.

## Apps

Create two EasyPanel apps:

1. `kuboqss-frontend`
2. `kuboqss-backend`

## Frontend Docker Requirements

The AI coder should create `frontend/Dockerfile`.

Recommended:

- Node 20 Alpine.
- Install dependencies.
- Build Next.js.
- Run standalone output if configured.

Next config:

- Enable `output: "standalone"` for Docker.

Frontend port:

```text
3000
```

Frontend env:

- `NEXT_PUBLIC_SITE_URL=https://kuboqss.com`
- `NEXT_PUBLIC_API_URL=https://api.kuboqss.com`
- Pixel public IDs only.

Never put CAPI access tokens in frontend env.

## Backend Docker Requirements

The AI coder should create `backend/Dockerfile`.

Recommended:

- Python 3.12 slim.
- Install dependencies.
- Run migrations on app startup.
- Start Uvicorn.

Backend port:

```text
8000
```

Health:

```text
GET /health
```

## Backend Env

Use `backend/.env.example` as the source of truth.

Important:

```text
DATABASE_URL=postgres://kuboqss:kuboqss@kuboqss_database:5432/kuboqss?sslmode=disable
FRONTEND_URL=https://kuboqss.com
BACKEND_URL=https://api.kuboqss.com
```

## CORS

Production allowed origins:

```text
https://kuboqss.com
https://www.kuboqss.com
```

Local dev:

```text
http://localhost:3000
```

## Database Migration On Start

Backend Docker uses `backend/scripts/docker-entrypoint.sh`:

1. Runs `alembic upgrade head` (retries up to 30 times if Postgres is not ready yet).
2. Starts Uvicorn on port `8000`.

After deploy, confirm in backend logs:

```text
[entrypoint] Migrations applied successfully.
```

Then open pgweb and check table `orders` exists.

## If pgweb Is Empty (No Tables)

1. Open **kuboqss-backend** logs in EasyPanel.
2. If you see `No module named 'psycopg2'`, redeploy backend from latest GitHub code (migrations must use `postgresql+psycopg://`).
3. Confirm backend env `DATABASE_URL` matches the Postgres service (same host, db name, user, password):

```text
postgres://kuboqss:kuboqss@kuboqss_database:5432/kuboqss?sslmode=disable
```

4. **Rebuild** backend (not only restart) so Docker image includes the new entrypoint.
5. Test: `https://api.kuboqss.com/health` should return `"database": "connected"`.

## Google Sheet Webhook

Deploy Apps Script as web app:

- Execute as: Me
- Who has access: Anyone with the link

Set the deployed URL as:

```text
GOOGLE_SHEETS_WEBHOOK_URL=
```

Use:

```text
ORDER_WEBHOOK_SECRET=
```

The backend should send this secret in payload or header. Apps Script verifies it.

## Launch Checklist

Before ads:

- Frontend loads on `kuboqss.com`.
- Backend health works on `api.kuboqss.com/health`.
- Product page loads fast on mobile.
- Cart drawer works.
- Checkout validates Libya phone.
- Test order appears in Postgres.
- Test order appears in Google Sheet.
- Thank-you page shows order number.
- Meta browser event appears.
- Meta CAPI event appears and dedupes.
- TikTok browser/server event appears.
- Snapchat browser/server event appears.
- No access tokens exposed in browser.
- Privacy/terms/delivery pages published.

## GitHub

The final code should be ready to push to GitHub:

- No secrets committed.
- `.env.example` files included.
- `README.md` includes local dev and deployment instructions.
- Dockerfiles included.
- Migrations included.
- Templates included.

Note: current local machine does not have `git` available in PATH, so repository initialization may need to be done manually or after installing Git.
