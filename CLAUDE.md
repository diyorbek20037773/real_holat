# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

**Real Holat** — fuqarolar uchun infratuzilma monitoring platformasi. Foydalanuvchilar Telegram Mini App (TMA) orqali maktab, shifoxona, yo'l, sport ob'yektlari haqida murojaat ("Signal") yuboradi va volontyor sifatida joydagi ob'yektlarni tekshiradi (geo-validatsiya 200 m radius). UI tili: O'zbek (lotin); model nomlari ham o'zbekcha (Murojaat, Maktab, Tekshiruv, Vaada, Sorovnoma, Savol, Javob).

## Tech stack

- **Backend**: Django 4.2+ + Django REST Framework, PostgreSQL (`dj-database-url`), Gunicorn 2 workers, WhiteNoise.
- **Bot**: Aiogram 3.7+ (async). Django va bot bitta konteynerda — `start.sh` ikkalasini ishga tushiradi (bot fonda).
- **Frontends** (ikkita, mustaqil):
  - `tma_frontend/` — Telegram Mini App, **build qilinmaydi**: 7 ta static HTML, vanilla JS + Leaflet + Tailwind (CDN). Django uni `TEMPLATES['DIRS']` orqali to'g'ridan-to'g'ri render qiladi.
  - `map_frontend/` — React 19 + TypeScript + Vite + react-leaflet + Tailwind 4. Alohida SPA.
- **Deploy**: Railway (Docker, `Dockerfile` + `railway.json`); `Procfile` ham bor. Python 3.12.

## Common commands

Backend:
- `python manage.py runserver` — local dev
- `python manage.py migrate` — DB schema apply
- `python manage.py seed_data` — boshlang'ich maktab/dastur ma'lumotlarini yuklash (`app/management/commands/seed_data.py`)
- `python manage.py createsuperuser` — admin foydalanuvchi
- `python manage.py collectstatic --noinput` — static yig'ish
- `python bot/bot.py` — Telegram botni alohida ishga tushirish
- `bash start.sh` — to'liq deploy ssenariyasi (migrate → collectstatic → seed → bot fonda → gunicorn)

Map frontend (`cd map_frontend`):
- `npm install`
- `npm run dev` — Vite dev server `:3000`, `/api/*` ni `127.0.0.1:8000` ga proxy qiladi
- `npm run build` — `tsc -b && vite build` → `dist/`
- `npm run lint` — ESLint flat config

**Test framework yo'q** — backend uchun ham, frontend uchun ham. Yangi test qo'shilganda framework ham qo'shish kerak.

## Architecture

### Backend (`core/`, `app/`)

- `core/settings.py` — DATABASE_URL avtomatik (Railway), aks holda `PG*` env vars; `CORS_ALLOW_ALL_ORIGINS=True`; DRF default'da auth/permission classes bo'sh — har endpoint o'zi auth qiladi.
- `core/urls.py` — root `/` → `/tma/murojaat/` redirect; `/geojson/<filename>` ildizdagi geojson fayllarni xizmat qiladi; barcha boshqa marshrutlar `app.urls`.
- `app/` — **monolit single Django app** (14 model, 25+ endpoint, `views.py` 1167 qator).
- `app/auth.py` — `validate_telegram_init_data()` Telegram WebApp `initData` ni HMAC-SHA256 bilan tekshiradi. **Markazlashtirilgan middleware emas — har endpoint qo'lda chaqiradi.** `DEBUG=True` da HMAC tekshiruvi skip bo'ladi.
- `app/utils.py` — `haversine_m()` masofa hisoblash; `GEO_RADIUS_M=200` — tekshiruv ob'yekt 200 m radiusida bo'lishi shart.
- **DRF Serializerlar yo'q** — viewlar qo'lda `dict` qaytaradi.

### Bot (`bot/bot.py`)

- `/start` → Inline tugma `{APP_URL}/tma/murojaat/` (Signal sahifasi) ochiladi.
- `web_app_data` handler → kelgan JSON ni `{APP_URL}/api/murojaat/` ga POST qiladi (`telegram_user_id`, `telegram_username`, `telegram_full_name` qo'shiladi). **`init_data` (HMAC) yuborilmaydi** — bot Django'ga to'g'ridan-to'g'ri murojaat qilganda HMAC validatsiyadan o'tmaydi va `DEBUG=True` ga tayanadi.

### Geo data

- Ildizdagi `uz-viloyatlar.geojson` (528 KB) va `uz-tumanlar.geojson` (3.7 MB) — `core.urls.serve_geojson` orqali `/geojson/<filename>` da ochiladi.
- `app/models.VILOYATLAR` — 14 viloyat hardcoded; `app/views.VILOYAT_COORDS` — markaziy koord.
- Maktab statusi (yashil/sariq/qizil/kulrang) tekshiruvlar va vaqt-decay asosida hisoblanadi.

### TMA navigation

Pastki nav bar 3 ta tugma: **Lenta** (`/tma/feed/`), **Signal/FAB** (markaziy, `/tma/murojaat/`), **Tahlil** (`/tma/tahlil/`). TMA ochilganda Signal sahifasi default — bu xulq `bot/bot.py` va `core/urls.py` da hardcoded.

## Environment variables

`.env.example` ga qarang. Majburiy: `BOT_TOKEN`, `DJANGO_SECRET_KEY`, `APP_URL`, `DATABASE_URL` (yoki `PG*`). Ixtiyoriy: `MONITORING_ESKIRISH_KUNI` (default 90).

## Coding conventions

- Model va URL nomlari **o'zbek tilida** (lotin yozuvi). `Murojaat`, `Maktab`, `Tekshiruv`, `viloyat`, `tuman`, `holat`. Yangi qo'shilganda shu uslubni saqlang.
- View javoblari `Response({...})` ko'rinishida — DRF serializer ishlatilmaydi.
- `LANGUAGE_CODE='uz'`, `TIME_ZONE='Asia/Tashkent'`.

## Repo notes

- Ildizda **`geoportal-tma-main/`** — loyihaning ikkinchi nusxasi (deyarli aynan o'xshash, eski/backup ko'rinishida). E'tibor bering: `tma_frontend/` da o'zgarish kiritsangiz, `geoportal-tma-main/tma_frontend/` ga ham kiritish kerakmi yoki yo'q — buni alohida hal qiling.
- `media/` `.gitignore` da, lekin `video_rasmlar/` ataylab tracked (deploy seed media uchun).
- `*.docx` `.gitignore` da — `tz.docx` (texnik topshiriq) commit qilinmaydi; texnik talab manbai sifatida lokal saqlanadi.
- `start.sh` har deploy'da `seed_data` ni qayta ishga tushiradi — idempotent bo'lishi shart.

## Known notes / gotchas

- **Auth har endpoint'da takrorlanadi** — markazlashtirilgan decorator yo'q.
- **`CORS_ALLOW_ALL_ORIGINS=True`** va **`ALLOWED_HOSTS=['*']`** — production-ready emas.
- **`SECRET_KEY` default qiymati** production-fallback bilan keladi (`django-insecure-...`) — env yo'q bo'lsa silently default ishlatadi.
- **Bot Django API'ga `init_data` yubormaydi** → API `DEBUG=True` ga tayanmasa har doim 401.
