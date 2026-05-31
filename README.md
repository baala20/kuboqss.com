# Kuboqss Store — كوبوكس

Premium Arabic RTL COD beauty and self-care store for Libya.

- Frontend: `https://kuboqss.com`
- Backend: `https://api.kuboqss.com`
- Market: Libya
- Model: Cash on delivery

## What Is Implemented

This repo now contains actual starter code, not only docs:

- `frontend/`: Next.js 14 App Router, TypeScript, Tailwind, Arabic RTL pages, product landing pages, cart drawer, checkout modal, Libya phone validation, and deferred browser pixel loader.
- `backend/`: FastAPI, PostgreSQL order model, Alembic migration, COD order endpoint, Libya phone normalization, Google Sheets webhook sender, and best-effort Meta/TikTok/Snapchat CAPI purchase senders.
- `templates/`: Google Apps Script webhook and CSV sheet columns.
- `docs/`: strategy, CRO, architecture, deployment, tracking, and AI-coder prompt.

## Project Structure

```text
kuboqss-store/
  frontend/
  backend/
  docs/
  templates/
  docker-compose.yml
```

## Local Frontend

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

Runs on `http://localhost:3000`.

Required frontend env:

```text
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Production frontend env:

```text
NEXT_PUBLIC_SITE_URL=https://kuboqss.com
NEXT_PUBLIC_API_URL=https://api.kuboqss.com
NEXT_PUBLIC_META_PIXEL_ID=
NEXT_PUBLIC_TIKTOK_PIXEL_CODE=
NEXT_PUBLIC_SNAP_PIXEL_ID=
NEXT_PUBLIC_ENABLE_PIXELS=true
```

Never put CAPI access tokens in frontend env.

## Local Backend

```bash
cd backend
cp .env.example .env
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload --port 8000
```

Health check:

```text
http://localhost:8000/health
```

Production backend env:

```text
DATABASE_URL=postgres://kuboqss:kuboqss@kuboqss_database:5432/kuboqss?sslmode=disable
FRONTEND_URL=https://kuboqss.com
BACKEND_URL=https://api.kuboqss.com
ALLOWED_ORIGINS=https://kuboqss.com,https://www.kuboqss.com
GOOGLE_SHEETS_WEBHOOK_URL=
ORDER_WEBHOOK_SECRET=
META_PIXEL_ID=
META_ACCESS_TOKEN=
TIKTOK_PIXEL_CODE=
TIKTOK_ACCESS_TOKEN=
SNAP_PIXEL_ID=
SNAP_ACCESS_TOKEN=
```

## Docker

Local full-stack file is included:

```bash
docker compose up --build
```

EasyPanel should deploy `frontend/` and `backend/` as two separate apps using their included Dockerfiles.

## Google Sheets Webhook

1. Create a Google Sheet.
2. Add the row from `templates/orders_sheet_columns.csv` as the header.
3. Open Extensions -> Apps Script.
4. Paste `templates/google-sheets-webhook.js`.
5. Add script property `ORDER_WEBHOOK_SECRET`.
6. Deploy as Web App.
7. Put the deployed URL in backend `GOOGLE_SHEETS_WEBHOOK_URL`.

## Tracking Notes

- Browser pixels are loaded through `frontend/components/pixel-loader.tsx`.
- Event IDs are generated in `frontend/lib/tracking.ts` for deduplication.
- Backend CAPI payloads and hashing rules live in `backend/app/services/tracking.py`.
- Meta/Snap phone hash input: `2189xxxxxxx`.
- TikTok phone hash input: `+2189xxxxxxx`.

## Current Local Tooling Status

On this machine, Python is available and backend compile/import passed. `npm`, Docker, pnpm, and yarn are not currently available in PATH, so frontend build and Docker build could not be executed locally here.
