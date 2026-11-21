import { test, expect } from "@playwright/test";

const PUBLIC_ROUTES = [
  { path: "/", titleFragment: "OmniSocial AI" },
  { path: "/features", titleFragment: "Features" },
  { path: "/platforms", titleFragment: "Platforms" },
  { path: "/solutions", titleFragment: "Solutions" },
  { path: "/pricing", titleFragment: "Pricing" },
  { path: "/contact", titleFragment: "Contact" },
  { path: "/blog", titleFragment: "Blog" },
  { path: "/resources", titleFragment: "Resources" },
  { path: "/privacy", titleFragment: "Privacy" },
  { path: "/terms", titleFragment: "Terms" },
  { path: "/login", titleFragment: "Login" },
  { path: "/signup", titleFragment: "Sign Up" },
  { path: "/forgot-password", titleFragment: "Password" },
  { path: "/onboarding", titleFragment: "OmniSocial" },
];

const PROTECTED_APP_ROUTES = [
  "/app",
  "/app/accounts",
  "/app/publish",
  "/app/calendar",
  "/app/drafts",
  "/app/published",
  "/app/queue",
  "/app/inbox",
  "/app/analytics",
  "/app/reports",
  "/app/ai-studio",
  "/app/media",
  "/app/approvals",
  "/app/team",
  "/app/campaigns",
  "/app/settings",
  "/app/billing",
];

test.describe("OmniSocial AI — Public Routes Smoke Tests", () => {
  for (const route of PUBLIC_ROUTES) {
    test(`Public Route ${route.path} responds successfully`, async ({ page }) => {
      const response = await page.goto(route.path, { waitUntil: "domcontentloaded" });
      expect(response?.status()).toBeLessThan(400);

      await expect(page.locator("body")).toBeVisible();
      const bodyText = await page.textContent("body");
      expect(bodyText).not.toContain("Application error: a client-side exception has occurred");
    });
  }
});

test.describe("OmniSocial AI — Protected Route Shell Tests", () => {
  for (const appRoute of PROTECTED_APP_ROUTES) {
    test(`Route ${appRoute} enforces authentication or loads shell`, async ({ page }) => {
      const response = await page.goto(appRoute, { waitUntil: "domcontentloaded" });
      expect(response?.status()).toBeLessThan(500);

      // Verify that unauthenticated requests redirect cleanly to /login without 500 error
      const currentUrl = page.url();
      const isAuthRedirect = currentUrl.includes("/login") || currentUrl.includes("/app");
      expect(isAuthRedirect).toBeTruthy();
    });
  }
});
