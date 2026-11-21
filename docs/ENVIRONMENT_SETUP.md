# OmniSocial AI — Environment Setup & Configuration Guide

## 1. System Requirements
- **Node.js**: `v20.x` or higher (tested on Node v24.20.0 x64)
- **Package Manager**: `npm` (v10+ or v11.19.0)
- **Database**: PostgreSQL (or Supabase / Neon / AWS RDS)
- **Media Storage**: Cloudinary (or AWS S3)
- **AI Synthesis**: Google Gemini API via `@google/genai`

---

## 2. Environment Variables Reference (.env)

| Variable Name | Required | Purpose / Format |
|---|---|---|
| `DATABASE_URL` | **Yes** | PostgreSQL connection string (`postgresql://user:pass@host:5432/db?schema=public`) |
| `DIRECT_URL` | Optional | Direct connection string for Prisma migrations bypassing connection poolers |
| `JWT_SECRET` | **Yes** | 32+ character random string for signing user session tokens |
| `TOKEN_ENCRYPTION_KEY` | **Yes** | 64-character hex key for AES-256-GCM token encryption vault |
| `NEXT_PUBLIC_APP_URL` | **Yes** | Canonical public URL of the application (e.g. `https://omnisocial.ai` or `http://localhost:3000`) |
| `GEMINI_API_KEY` | **Yes** | Google Gemini AI Studio API key |
| `CRON_SECRET` | **Yes** | Secret bearer token required to trigger `/api/cron/*` publishing queues |
| `NEXT_PUBLIC_BRAND_NAME` | Optional | Overrides display brand name (default: "OmniSocial AI") |
| `CLOUDINARY_CLOUD_NAME` | Optional | Cloudinary cloud identifier for media uploads |
| `CLOUDINARY_API_KEY` | Optional | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Optional | Cloudinary API secret |

---

## 3. Social Media OAuth Provider Keys

| Provider | App Client ID Variable | App Client Secret Variable |
|---|---|---|
| **Instagram / Facebook** | `META_CLIENT_ID` | `META_CLIENT_SECRET` |
| **Google / YouTube** | `GOOGLE_CLIENT_ID` | `GOOGLE_CLIENT_SECRET` |
| **LinkedIn** | `LINKEDIN_CLIENT_ID` | `LINKEDIN_CLIENT_SECRET` |
| **X (Twitter)** | `TWITTER_CLIENT_ID` | `TWITTER_CLIENT_SECRET` |
| **TikTok** | `TIKTOK_CLIENT_KEY` | `TIKTOK_CLIENT_SECRET` |
| **Pinterest** | `PINTEREST_CLIENT_ID` | `PINTEREST_CLIENT_SECRET` |
| **Threads** | `THREADS_APP_ID` | `THREADS_APP_SECRET` |
| **WhatsApp Business** | `WHATSAPP_PHONE_NUMBER_ID` | `WHATSAPP_ACCESS_TOKEN` |
| **Telegram** | `TELEGRAM_BOT_TOKEN` | `TELEGRAM_BOT_USERNAME` |
| **Reddit** | `REDDIT_CLIENT_ID` | `REDDIT_CLIENT_SECRET` |
| **Snapchat** | `SNAPCHAT_CLIENT_ID` | `SNAPCHAT_CLIENT_SECRET` |

---

## 4. Local Development Quickstart

1. **Clone & Install**:
   ```powershell
   git clone https://github.com/Vishwakarmasuraj333/OmniSocial-AI.git
   cd OmniSocial-AI
   npm install
   ```

2. **Generate Prisma Client**:
   ```powershell
   npm run db:generate
   ```

3. **Validate Codebase**:
   ```powershell
   node --stack-size=8192 ./node_modules/typescript/bin/tsc --noEmit
   npm run lint
   ```

4. **Run Production Build**:
   ```powershell
   npm run build
   npm run start
   ```
