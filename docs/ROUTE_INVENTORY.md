# OmniSocial AI — Complete Route Inventory

## Route Architecture
The OmniSocial AI application is built on Next.js 15 App Router architecture. It comprises **182 static and dynamic routes**, organized into public marketing surfaces, authenticated core workspace routes (`/app/*`), administrative dashboards (`/admin/*`), and backend REST / streaming API handlers (`/api/*`).

---

## 1. Public Marketing & Informational Routes
| Route | Method | Access | Purpose |
|---|---|---|---|
| `/` | GET | Public | OmniSocial AI official homepage & hero showcase |
| `/features` | GET | Public | Detailed platform feature walkthrough |
| `/platforms` | GET | Public | 13-platform integration matrix & specifications |
| `/solutions` | GET | Public | Enterprise, agency, and creator solutions |
| `/pricing` | GET | Public | Transparent tier pricing & annual billing switcher |
| `/contact` | GET | Public | Customer support & enterprise inquiry form |
| `/blog` | GET | Public | Social media marketing guides & company updates |
| `/resources` | GET | Public | Playbooks, whitepapers, and ROI calculators |
| `/privacy` | GET | Public | Data privacy, GDPR, and consumer consent policies |
| `/terms` | GET | Public | Terms of service and SLA policies |
| `/cookie-policy` | GET | Public | Cookie classification and tracking preferences |
| `/data-deletion` | GET | Public | User data erasure request instructions |

---

## 2. Authentication & Onboarding Routes
| Route | Method | Access | Purpose |
|---|---|---|---|
| `/login` | GET | Public | Email/password & Google OAuth authentication |
| `/signup` | GET | Public | Account creation with workspace provisioning |
| `/forgot-password` | GET | Public | Password reset initiation |
| `/reset-password` | GET | Public | Token-validated password reset form |
| `/onboarding` | GET | Auth | 3-step organization setup wizard |
| `/onboarding/socials` | GET | Auth | Social account connection step |
| `/verify-email` | GET | Public/Auth | Email OTP code verification |

---

## 3. Dedicated Workspace Routes (`/app/*`)
All routes in this group are protected by `src/app/app/layout.tsx`. Unauthenticated visitors are redirected to `/login?redirectTo=<path>`.

| Route | Purpose | Key Sub-Components |
|---|---|---|
| `/app` | Executive Social Overview | Key metrics, channel breakdown, upcoming schedule |
| `/app/accounts` | Connected Accounts Hub | Connect, reconnect, diagnostic health for 13 networks |
| `/app/publish` | Universal Multi-Network Composer | Character limits, media upload, live preview cards |
| `/app/calendar` | Multi-Platform Content Calendar | Drag-and-drop scheduling, day/week/month views |
| `/app/drafts` | Drafts Management | Filter by channel, review notes, one-click edit |
| `/app/published` | Published Archive | Engagement scores, external links, live post stats |
| `/app/queue` | Scheduled Post Queue | Execution timestamps, retry actions, queue order |
| `/app/inbox` | Unified Social Inbox | Multi-network comments, direct messages, quick replies |
| `/app/analytics` | Deep Realtime Analytics | Engagement rates, audience growth, top posts |
| `/app/reports` | Exportable Performance Reports | CSV / PDF exports, custom date ranges |
| `/app/ai-studio` | Google Gemini AI Studio | 8-step synthesis: persona, channels, drafting |
| `/app/media` | Media Asset Library | Cloudinary asset management, tag filtering |
| `/app/approvals` | Approval Workflow Engine | Multi-tier review, editor submissions, audit logs |
| `/app/team` | Team Collaboration & RBAC | Role assignment, email invitations, member limits |
| `/app/campaigns` | Multi-Channel Campaigns | Campaign objectives, budget, multi-post tracking |
| `/app/settings` | Workspace Configuration | Brand voice, timezones, default UTM parameters |
| `/app/billing` | Billing & Plans | Tier upgrades, payment status, usage meters |

---

## 4. Administration Suite (`/admin/*`)
Restricted to users possessing the system `ADMIN` role or listed in `ADMIN_EMAILS`.

| Route | Purpose |
|---|---|
| `/admin` | Master system overview & KPIs |
| `/admin/users` | Tenant user management & account status |
| `/admin/organizations` | Workspace isolation & enterprise quotas |
| `/admin/posts` | Global content moderation & flag review |
| `/admin/social-accounts` | Connected provider token health & API status |
| `/admin/billing` | Plan configuration & transaction history |
| `/admin/system-health` | Queue latency, memory, worker health |
| `/admin/audit-logs` | Immutable system audit log trail |
| `/admin/feedback` | User bug reports & feature feedback |
