# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Real Holat** ("Real Situation") is a civic infrastructure monitoring platform for Uzbekistan, built as a hackathon entry. Citizens report problems with public facilities (schools/maktab, kindergartens/bogcha, hospitals/shifoxona, roads/yo'l, sports/sport) via a Telegram Mini App; officials track inspections, promises, and resolution status. **Source code, comments, model fields, and UI strings are in Uzbek (Latin script)** — preserve Uzbek field names (`murojaat`, `maktab`, `viloyat`, `tuman`, `holat`, `tekshiruv`, `vaada`, `sorovnoma`) when editing. Do not rename to English.

## Architecture

The repo is a **single Django project that fronts three different consumers** plus a Telegram bot:

```
core/               Django project (settings, urls, wsgi)
app/                Single Django app — all models, views, URLs, seed
bot/bot.py          aiogram 3.x Telegram bot (separate process)
tma_frontend/       Django HTML templates for the Telegram Mini App
                    (registered as a TEMPLATES DIR — not a static SPA)
templates/          Generic Django templates
admin_panel/        Standalone React 19 + Vite + TS SPA (officials dashboard)
map_frontend/       Standalone React 19 + Vite + TS SPA (geospatial view)
static/, media/     Static assets and uploaded media
```

Key non-obvious points:

- **`tma_frontend/` is *not* a JS build** — it's plain HTML files (`index.html` map, `maktablar.html`, `feed.html`, `profil.html`, `tahlil.html`, `murojaat.html`, `maktab_detail.html`, `signal.html`) registered in `TEMPLATES['DIRS']` ([core/settings.py:44](core/settings.py#L44)) and rendered by views like `tma_dashboard`, `tma_maktablar` in [app/views.py](app/views.py). Vanilla JS + Tailwind (CDN) + Leaflet inside the templates calls REST endpoints under `/api/`.
- **`admin_panel/` and `map_frontend/` are *separate* React/Vite SPAs** that talk to the Django API. They are not served by Django; they ship independently. Both have identical npm scripts.
- **Single Django app `app`** holds *everything* — there is no per-feature app split. All models, URLs, and views live there.
- **Bot ↔ Web integration**: `bot/bot.py` sends users `WebAppInfo` buttons pointing at `/tma/...` URLs (via `APP_URL` env). Mini-App form submissions return to the bot via `message.web_app_data`, which the bot POSTs to `/api/murojaat/`.
- **Root URL `/` redirects to `/tma/feed/`** ([core/urls.py:20](core/urls.py#L20)). The TMA *is* the homepage.
- **GeoJSON files (`uz-tumanlar.geojson`, `uz-viloyatlar.geojson`) are served from repo root** via `/geojson/<filename>` ([core/urls.py:11-16](core/urls.py#L11-L16)) — they are not in `static/`.
- **Locale**: `LANGUAGE_CODE='uz'`, `TIME_ZONE='Asia/Tashkent'`.

### Core domain model ([app/models.py](app/models.py))

- `Murojaat` — citizen complaint (viloyat/tuman, infratuzilma type, status, telegram user id, `is_anonim` bool). Statuses: `kutilmoqda` → `korib_chiqilmoqda` → `hal_qilindi`. Anonymous complaints show as "Anonim fuqaro" in feed.
- `MurojaatRasm` — FK to `Murojaat` (related_name=`rasmlar`). Complaints support **multiple images**, not just one.
- `Maktab` — facility (despite the name, `tur` field covers maktab/bogcha/shifoxona/sport). Has `lat/lng`, `holat` (yaxshi/etiborga_muhtoj/nosoz). **`holat` is auto-updated** by inspection results — ≥70% satisfaction → yaxshi, ≥40% → etiborga_muhtoj, else nosoz. Has computed methods: `mamnuniyat_foizi_vaznli()` (time-decay weighted satisfaction), `ishonch_darajasi()` (piecewise confidence score), `xarita_rangi()` (color for map marker).
- `Tekshiruv` — inspection record (lat/lng, `geo_valid` bool, result, `rasm`, `video` added in migration 0009). **Every inspection auto-creates a `Murojaat` feed entry.** Geo-validation enforces 200m radius (`GEO_RADIUS_M` in [app/utils.py](app/utils.py)); bypassed in DEBUG.
- `Vaada` — promise/commitment tied to a facility.
- `Like`, `Comment` — feed engagement on `Murojaat`. `Like` has unique_together on (murojaat, telegram_user_id).
- `Sorovnoma`, `Savol`, `Topshiriq`, `Javob` — survey/questionnaire system (added in migration 0008). `Javob.qiymat` is JSONField (bool, `'ha'`/`'yoq'`, 1-5 scale, or text).
- `Statistika` — singleton counters (defaults `maktablar_soni=11139`, etc.).

A facility is considered "stale" if not inspected in `MONITORING_ESKIRISH_KUNI` days (default 90, env-configurable).

### Key helpers ([app/utils.py](app/utils.py))

- `haversine_m(lat1, lng1, lat2, lng2)` — distance in metres between two points.
- `GEO_RADIUS_M = 200` — hard-coded inspection radius limit.
- `natija_javoblardan(javoblar_list)` — computes `'bajarildi'`/`'muammo'` from survey answers (50% positive threshold).

### URL surface ([app/urls.py](app/urls.py))

- TMA pages: `/tma/` (map/index), `/tma/murojaat/`, `/tma/signal/`, `/tma/maktablar/[/<id>/]`, `/tma/tahlil/`, `/tma/feed/`, `/tma/profil/`.
- API: `/api/statistika/`, `/api/murojaat[lar]/`, `/api/maktablar[/<id>/]`, `/api/tekshiruv/`, `/api/maktab-sync/`, `/api/maktab-izoh/`, `/api/tahlil/`, `/api/meta/`, `/api/viloyatlar/`, `/api/tumanlari/`, `/api/feed/[like|comment|<id>/comments/]`, `/api/profil/`, `/api/obyekt/<maktab_id>/sorovnoma/`, `/api/sorovnoma/<id>/preview/`, `/api/savol-turlari/`.
- DRF runs with **no auth and no permission classes** ([core/settings.py:121-122](core/settings.py#L121-L122)). `CORS_ALLOW_ALL_ORIGINS=True`. Identity for write endpoints is taken from the supplied `telegram_user_id` field — anyone with the URL can POST.
- **Telegram `initData` HMAC-SHA256 validation** lives in [app/auth.py](app/auth.py) and is checked in production on the inspection endpoint; DEBUG mode bypasses it entirely.

## Common Commands

### Backend (Django)

```bash
# Install
pip install -r requirements.txt

# DB (PostgreSQL required; set DATABASE_URL or PG* env vars per .env.example)
python manage.py migrate
python manage.py seed_data    # populates demo schools, vaada, tekshiruv

# Run dev server
python manage.py runserver

# Make migrations after model edits
python manage.py makemigrations
python manage.py migrate

# Collect static (production)
python manage.py collectstatic --noinput
```

There is **no test suite** in the repo. Don't claim tests pass — there are none.

### Telegram bot

```bash
# Run separately from Django (needs BOT_TOKEN and APP_URL in .env)
python bot/bot.py
```

The bot is an independent process. In production (`start.sh`) it runs in the background while gunicorn serves the web. Locally, run it in a second terminal.

### React SPAs (admin_panel/, map_frontend/ — identical scripts)

```bash
cd admin_panel    # or map_frontend
npm install
npm run dev       # vite dev server
npm run build     # tsc -b && vite build
npm run lint      # eslint .
npm run preview   # serve built dist/
```

### Production / Railway

Single command starts everything via [start.sh](start.sh):

```bash
bash start.sh
# = migrate + collectstatic + seed_data + bot (background) + gunicorn
```

`Procfile` defines `web: bash start.sh` and `worker: python bot/bot.py`. Railway uses `nixpacks.toml` (`builder: NIXPACKS` per `railway.json`).

## Environment

Required (.env, see `.env.example`):

- `BOT_TOKEN` — Telegram bot token from @BotFather.
- `DJANGO_SECRET_KEY` — change in production.
- `APP_URL` — public URL the bot embeds in `WebAppInfo` buttons. **WebApp buttons require HTTPS** in production; localhost works only via Telegram Desktop test mode.
- `DATABASE_URL` — full Postgres URL (Railway autofills). Falls back to `PGDATABASE/PGUSER/PGPASSWORD/PGHOST/PGPORT`.
- `DEBUG` — `True`/`False` string.
- `MONITORING_ESKIRISH_KUNI` — days before a facility is "stale" (default 90).

## Conventions and Gotchas

- **Language**: All identifiers, model fields, choices, comments, and user-facing strings are Uzbek. New code should match — don't introduce English field names like `status` alongside `holat`. Existing example: `Murojaat.izoh`, `Maktab.viloyat`, `Tekshiruv.natija`.
- **Single-app architecture**: Add new models/views to `app/` rather than creating new Django apps unless there is a strong reason.
- **`seed_data` is idempotent and runs on every deploy** ([app/management/commands/seed_data.py](app/management/commands/seed_data.py), invoked by `start.sh`). If you change demo data, update the command — don't rely on a one-time fixture.
- **Media directories are created at boot** (`media/murojaatlar`, `media/tekshiruvlar`) by `start.sh` — they may not exist after a fresh clone until you run it or `mkdir` manually.
- **No DRF auth means every write API trusts the client `telegram_user_id`.** When adding new write endpoints, follow the existing pattern (read `telegram_user_id` from the payload) but be aware this is not a security boundary.
- **`Maktab.tur` covers all facility types**, not just schools. The model is named for historical reasons; do not assume `Maktab` queries are school-only.
- **Migrations 0008 (sorovnoma) and 0009 (video field on Tekshiruv) are recent** — questionnaires and video-attached inspections are newer features; older code paths may not handle them.
- **`Statistika` endpoint is cached** in-memory for 60 seconds (key `statistika_v1`). No Redis — uses Django's default per-process cache. Cache doesn't survive process restart.
- **`feed_api` pagination** uses `limit` (max 50) + `offset` params; response includes `has_more` boolean.

## Reference Files in Repo Root

The root contains hackathon-related artifacts (`Real_Holat_Playbook.pdf/.pptx`, `presentation.html`, `Real_Holat_Architecture.html`, `NUTQ.md`, `TAQDIMOT.md`, `final_ТЗ_РеалХолат_GovMonitor_v1.0_2 uz.docx`, `пул вопросов (2) uz.docx`, photos, `API_surov.xlsx`). These are not code — they are demo/judging materials. Don't edit them as part of code changes.
