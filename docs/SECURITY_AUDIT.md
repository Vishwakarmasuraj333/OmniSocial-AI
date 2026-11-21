# OmniSocial AI — Security & Penetration Audit

## 1. Executive Security Summary
OmniSocial AI implements a multi-layered defense-in-depth security model designed to safeguard customer credentials, connected social media API tokens, organization assets, and sensitive session data.

---

## 2. Core Security Controls

### 2.1 AES-256-GCM Token Encryption Vault
- **Algorithm**: `aes-256-gcm` (Galois/Counter Mode authenticated cipher).
- **Key Derivation**: SHA-256 hash of `TOKEN_ENCRYPTION_KEY` combined with key version identifier (`CURRENT_KEY_VERSION = "v1"`).
- **IV / Nonce**: 16-byte cryptographically secure random bytes generated via `crypto.randomBytes(16)` per encryption operation. Nonces are never reused.
- **Authentication Tag**: 16-byte authentication tag verified during decryption to guarantee token authenticity and prevent ciphertext tampering.
- **Plaintext Leakage Prevention**: Access tokens and refresh tokens are encrypted prior to insertion into the `SocialToken` database table and decrypted exclusively in memory at runtime when executing official provider requests.

### 2.2 Multi-Tenancy & Tenant Isolation
- **Organization Boundary Enforcement**: All database queries for accounts, posts, drafts, queues, inbox messages, media assets, team invitations, and analytics are strictly filtered by `organizationId`.
- **Session Authentication Gate**: The workspace layout (`src/app/app/layout.tsx`) and API routes use `getSession()` or `ensureSession()` to verify JWT authenticity and validate that the requesting user possesses an active membership in the target organization.
- **Cross-Tenant Access Rejection**: Requests attempting to query or mutate resources belonging to another organization receive HTTP 403 Forbidden or HTTP 404 Not Found, preventing Insecure Direct Object References (IDOR).

### 2.3 SSRF & Safe Webhook Handling
- **SSRF Guard**: External URLs processed by media importers and webhooks are validated against private, link-local, and reserved IP ranges (e.g. `127.0.0.1`, `169.254.169.254`, `10.0.0.0/8`, `192.168.0.0/16`) in `src/lib/security/ssrf.ts`.
- **Cron Job Authentication**: Background publishing workers and engagement sync endpoints are protected by Bearer token authorization matching `CRON_SECRET`.
- **OAuth CSRF State Protection**: OAuth connection flows generate cryptographically secure random state parameters stored in session cookies and verified upon provider callback.

### 2.4 Session Security & HTTP Cookies
- **Cookie Flags**:
  - `httpOnly: true` (prevents JavaScript access and XSS theft).
  - `secure: true` in production environments (restricts transmission to HTTPS).
  - `sameSite: "lax"` (mitigates CSRF attacks across origins).
- **Suspension Enforcement**: Suspended users are immediately rejected during session validation.

---

## 3. Vulnerability Assessment Checklist

| Area | Threat Model | Mitigation Implemented | Status |
|---|---|---|---|
| **Token Storage** | Database breach exposing social API keys | AES-256-GCM authenticated encryption | VERIFIED |
| **Cross-Tenant Leakage** | User reads another organization's posts/inbox | Scoped Prisma queries on `organizationId` | VERIFIED |
| **IDOR** | Direct API mutation of another tenant's asset | Role and membership validation | VERIFIED |
| **Injection (SQL)** | SQL injection via dynamic query parameters | Parameterized queries via Prisma ORM | VERIFIED |
| **Injection (XSS)** | Malicious script payload in social comments | React 19 automatic JSX escaping | VERIFIED |
| **SSRF** | Server fetching internal metadata endpoints | Internal IP blocking in `ssrf.ts` | VERIFIED |
| **Brute Force** | Password guessing / OTP cracking | Max attempts limit & OTP expiration | VERIFIED |
| **Secret Exposure** | Client bundles leaking `GEMINI_API_KEY` | Server-only invocation in `/api/ai/*` | VERIFIED |
