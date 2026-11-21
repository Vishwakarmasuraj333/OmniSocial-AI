# OmniSocial AI — Next-Generation AI Social Media Management Platform

[![Next.js 15](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Google Gemini AI](https://img.shields.io/badge/AI-Google%20Gemini%202.5-4285F4?logo=google)](https://aistudio.google.com/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma)](https://www.prisma.io/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Security: AES-256-GCM](https://img.shields.io/badge/Security-AES--256--GCM-green)](https://en.wikipedia.org/wiki/Galois/Counter_Mode)

**OmniSocial AI** is a production-grade, enterprise multi-tenant social media management SaaS platform engineered for brands, agencies, and high-growth creator teams to compose, schedule, publish, analyze, and monitor cross-network campaigns from one unified workspace.

---

## 🌟 Key Features

1. **Unified Social Media Workspace (`/app`)**:
   - Manage multiple brands and organizations from one unified workspace switcher.
   - Real-time connected account summary, upcoming scheduled posts, and performance trends.

2. **13 Official Social Media Platform Integrations**:
   - **Instagram Professional**: Feed posts, Reels, Carousels, comments, insights.
   - **Facebook Pages**: Page publishing, video, carousel, engagement metrics.
   - **YouTube**: Channels, Shorts, long-form video, video telemetry.
   - **LinkedIn**: Profiles and Organization pages, PDF carousels, text & video.
   - **X (Twitter)**: Tweets, threads, media upload, DM monitoring.
   - **TikTok**: Direct video publishing via Content Posting API.
   - **Pinterest**: Pins, video Pins, board selection.
   - **Threads**: Official Meta Threads API text, images, and video threads.
   - **Google Business Profile**: Location updates, offers, events, and reviews.
   - **WhatsApp Business**: Cloud API customer communications and template broadcasts.
   - **Telegram**: Bot API channel broadcasting and group announcements.
   - **Reddit**: Subreddit post authoring, flairs, and link sharing.
   - **Snapchat**: Creative Kit and Marketing API video workflows.

3. **Advanced AI Content Studio (`/app/ai-studio`)**:
   - Integrated with server-side **Google Gemini** (`@google/genai`).
   - 8-step creation workflow: Goal Selection → Target Channels → Topic Context → Persona Tuning → AI Synthesis → Section Refinement → Platform Previews → Send to Composer / Save Draft.
   - 17 generation capabilities including viral hooks, tone rewriting, hashtags, alt text, CTAs, and multilingual translation.

4. **Universal Post Composer (`/app/publish`)**:
   - Multi-platform simultaneous authoring with per-platform character counts.
   - Pixel-accurate live preview simulators for Instagram, X, LinkedIn, Facebook, YouTube, TikTok, and Pinterest.
   - Media attachments with aspect ratio validation.
   - Publishing options: Publish Now, Schedule, Queue, and Submit for Approval.

5. **Content Calendar & Background Scheduler (`/app/calendar`, `/app/queue`)**:
   - Interactive Month, Week, Day, and List views with drag-and-drop rescheduling.
   - Durable background job worker (`/api/cron/publisher`) using database-backed idempotency keys and locks.

6. **Unified Social Inbox (`/app/inbox`)**:
   - Multi-channel thread view for comments, direct messages, and brand mentions with sentiment indicators and saved replies.

7. **Cross-Network Analytics & Reports (`/app/analytics`, `/app/reports`)**:
   - Audience trends, reach, engagement rates, video views, and downloadable CSV reports based on real connected data.

8. **Team Collaboration & Content Approvals (`/app/team`, `/app/approvals`)**:
   - Granular RBAC: `OWNER`, `ADMIN`, `MANAGER`, `EDITOR`, `ANALYST`, `VIEWER`.
   - Multi-tier approval workflows with revision feedback and audit logging.

9. **Security & Governance**:
   - Hardware-grade **AES-256 GCM** token vault with per-record IVs.
   - Zero password collection for third-party platforms.
   - Complete server-side `/admin` command center with tenant management and operational audit logs.

---

## 🚀 Quick Start & Installation

### 1. Install Dependencies
```bash
npm install
```

### 2. Generate Prisma Client
```bash
npx prisma generate
```

### 3. Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Ensure `TOKEN_ENCRYPTION_KEY` is a 64-character hex string and configure your database and Google Gemini API keys:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/omnisocial?schema=public"
AUTH_SECRET="your_32_character_jwt_auth_secret_key_minimum"
TOKEN_ENCRYPTION_KEY="0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"
GEMINI_API_KEY="your_google_gemini_api_key"
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build
```bash
npm run build
npm run start
```

---

## 📖 Documentation
- [Master Architecture & Specification](docs/OMNISOCIAL_MASTER_SPECIFICATION.md)
- [OAuth & Platform Integration Guide](OAUTH_SETUP_GUIDE.md)
- [Database Schema & Prisma Models](DATABASE_SCHEMA.md)
- [Environment Configuration Guide](ENVIRONMENT_SETUP.md)
- [Production Deployment Guide](DEPLOYMENT_GUIDE.md)
- [Known Limitations & Policy Boundaries](KNOWN_LIMITATIONS.md)

---

## 🛡️ License & Copyright
Copyright © 2026 OmniSocial AI Inc. All rights reserved.
