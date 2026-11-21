# OmniSocial AI — Master QA Test Plan

## 1. Objectives & Scope
The goal of this Master QA Test Plan is to validate the reliability, security, multi-tenancy, cross-platform capabilities, and UI/UX performance of the **OmniSocial AI** enterprise social media management platform.

### Scope of Testing
- **Public & Marketing Surfaces**: Marketing landing, features, platforms, solutions, pricing, contact, blog, resources, terms, and privacy.
- **Authentication & Authorization**: Email/password, OTP verification, Google OAuth, session management via HTTP-only JWT cookies, route guards, and role-based access control (RBAC).
- **Core Workspace (`/app/*`)**: 17 dedicated operational routes including Dashboard, Accounts Hub, Post Composer, Content Calendar, Queue, Drafts, Published Archive, Unified Inbox, Realtime Analytics, Performance Reports, Gemini AI Content Studio, Media Asset Library, Approvals Engine, Team Management, Multi-Channel Campaigns, Organization Settings, and Billing & Plans.
- **13 Social Media Platform Integrations**: Instagram Professional, Facebook Pages, YouTube Channels, LinkedIn Profiles/Pages, X (Twitter), TikTok, Pinterest, Threads, Google Business Profile, WhatsApp Business, Telegram, Reddit, and Snapchat.
- **AI Synthesis Pipeline**: Google Gemini 2.5 Flash / Pro 8-step content creation workflow.
- **Security & Data Isolation**: AES-256-GCM token vault, SSRF protections, CSRF mitigation, SQL/NoSQL injection prevention, rate limiting, and strict organization tenant boundary checks.

---

## 2. Test Strategy & Levels

### 2.1 Static & Compiler Analysis
- **TypeScript Compiler (`tsc --noEmit`)**: Validates complete type-safety across all server and client files without compilation emit.
- **ESLint (`eslint src`)**: Code quality, Next.js optimization checks, hook dependency rules, and JSX accessibility rules.

### 2.2 End-to-End (E2E) Browser Automation
- **Framework**: Playwright with Google Chrome, iPad Pro (tablet), and iPhone 16 (mobile) emulation.
- **Coverage**:
  - Smoke tests for all public routes (HTTP 200, HTML body visibility, footer rendering).
  - Auth boundary tests (unauthenticated visits to `/app/*` strictly redirect to `/login`).
  - Viewport responsive audit across 320px, 375px, 390px, 768px, 1024px, 1440px, and 1920px.
  - Form validation, dynamic button states, accordions, and interactive modals.

### 2.3 Security & Penetration Audit
- Verification of token encryption key derivation (SHA-256 seed, 16-byte random IV, 16-byte authentication tag).
- Verification that plaintext access tokens and refresh tokens are never logged or stored in database tables.
- Verification that unauthorized cross-tenant requests return HTTP 401/403 or 404 (preventing IDOR).

---

## 3. Critical Test Scenarios & Traceability Matrix

| ID | Scenario | Verification Method | Status |
|---|---|---|---|
| TC-01 | Public marketing routes return HTTP 200 | Playwright E2E (`omnisocial_routes.spec.ts`) | PASS |
| TC-02 | Unauthenticated visits to `/app/*` redirect to `/login` | Playwright E2E (`omnisocial_routes.spec.ts`) | PASS |
| TC-03 | Responsive layout has zero horizontal scrollbar on all viewports | Playwright E2E (`responsive.spec.ts`) | PASS |
| TC-04 | Mobile drawer toggles and renders navigation links | Playwright E2E (`responsive.spec.ts`) | PASS |
| TC-05 | Pricing toggles between monthly and annual plans | Playwright E2E (`pricing.spec.ts`) | PASS |
| TC-06 | Contact form validates mandatory fields and phone placeholders | Playwright E2E (`contact.spec.ts`) | PASS |
| TC-07 | Footer column alignments on iPad and Desktop viewports | Playwright E2E (`defect20_footer.spec.ts`) | PASS |
| TC-08 | Token encryption vault correctly uses AES-256-GCM authenticated cipher | Code review & crypto validation (`encryption.ts`) | PASS |
| TC-09 | Google Gemini AI Studio 8-step workflow validation | Route verification (`src/app/app/ai-studio/page.tsx`) | PASS |
| TC-10 | Multi-tenant organization scoping enforced on all database queries | Session & ORM audit (`session.ts`, `prisma.ts`) | PASS |
