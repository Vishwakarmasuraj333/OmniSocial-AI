/**
 * OmniSocial AI — Centralized Enterprise Brand Configuration
 * Single source of truth for all brand identity, copy, logos, metadata, and theme tokens.
 * Modifying values here updates brand presentation application-wide without string replacements.
 */

export interface BrandConfig {
  name: string;
  shortName: string;
  wordmark: string;
  tagline: string;
  subTagline: string;
  description: string;
  legalName: string;
  domain: string;
  appUrl: string;
  supportEmail: string;
  contactEmail: string;
  social: {
    x?: string;
    linkedin?: string;
    youtube?: string;
    instagram?: string;
    facebook?: string;
    github?: string;
  };
  navigation: {
    public: Array<{ label: string; href: string }>;
    app: Array<{ label: string; href: string; icon: string }>;
    admin: Array<{ label: string; href: string; icon: string }>;
  };
  theme: {
    primary: {
      emerald: string;
      emeraldHover: string;
      emeraldLight: string;
      teal: string;
      tealHover: string;
    };
    action: {
      coral: string;
      coralHover: string;
      coralLight: string;
    };
    surfaces: {
      lightBg: string;
      lightSurface: string;
      lightSurfaceSecondary: string;
      lightBorder: string;
      darkBg: string;
      darkSurface: string;
      darkSurfaceSecondary: string;
      darkBorder: string;
    };
    typography: {
      charcoal: string;
      charcoalMuted: string;
      darkText: string;
      darkTextMuted: string;
    };
  };
}

export const BRAND_CONFIG: BrandConfig = {
  name: "OmniSocial AI",
  shortName: "OmniSocial",
  wordmark: "OmniSocial AI",
  tagline: "Next-Generation AI Social Media Intelligence & Publishing Suite",
  subTagline: "Unified Social Media Workspace for Creators, Agencies & Global Brands",
  description:
    "Compose, schedule, publish, analyze, and automate cross-network social campaigns with certified Google Gemini AI intelligence and official platform integrations.",
  legalName: "OmniSocial AI Inc.",
  domain: process.env.NEXT_PUBLIC_APP_DOMAIN || "omnisocial.ai",
  appUrl: process.env.NEXT_PUBLIC_APP_URL || "https://omnisocial.ai",
  supportEmail: "support@omnisocial.ai",
  contactEmail: "contact@omnisocial.ai",
  social: {
    x: "https://x.com/omnisocialai",
    linkedin: "https://linkedin.com/company/omnisocialai",
    youtube: "https://youtube.com/@omnisocialai",
    instagram: "https://instagram.com/omnisocialai",
    facebook: "https://facebook.com/omnisocialai",
  },
  navigation: {
    public: [
      { label: "Features", href: "/features" },
      { label: "Platforms", href: "/platforms" },
      { label: "Solutions", href: "/solutions" },
      { label: "Pricing", href: "/pricing" },
      { label: "Resources", href: "/resources" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
    app: [
      { label: "Overview", href: "/app", icon: "LayoutDashboard" },
      { label: "Accounts", href: "/app/accounts", icon: "Share2" },
      { label: "Publish", href: "/app/publish", icon: "PenTool" },
      { label: "Calendar", href: "/app/calendar", icon: "Calendar" },
      { label: "Drafts", href: "/app/drafts", icon: "FileEdit" },
      { label: "Queue", href: "/app/queue", icon: "Clock" },
      { label: "Published", href: "/app/published", icon: "CheckCircle2" },
      { label: "AI Studio", href: "/app/ai-studio", icon: "Sparkles" },
      { label: "Unified Inbox", href: "/app/inbox", icon: "MessageSquare" },
      { label: "Analytics", href: "/app/analytics", icon: "BarChart3" },
      { label: "Reports", href: "/app/reports", icon: "PieChart" },
      { label: "Media Library", href: "/app/media", icon: "Image" },
      { label: "Approvals", href: "/app/approvals", icon: "ShieldCheck" },
      { label: "Team", href: "/app/team", icon: "Users" },
      { label: "Campaigns", href: "/app/campaigns", icon: "Megaphone" },
      { label: "Settings", href: "/app/settings", icon: "Settings" },
      { label: "Billing", href: "/app/billing", icon: "CreditCard" },
    ],
    admin: [
      { label: "Overview", href: "/admin", icon: "LayoutDashboard" },
      { label: "Users", href: "/admin/users", icon: "Users" },
      { label: "Organizations", href: "/admin/organizations", icon: "Building2" },
      { label: "Accounts", href: "/admin/social-accounts", icon: "Share2" },
      { label: "Posts", href: "/admin/posts", icon: "FileText" },
      { label: "Billing & Plans", href: "/admin/billing", icon: "CreditCard" },
      { label: "Audit Logs", href: "/admin/audit-logs", icon: "Shield" },
      { label: "System Health", href: "/admin/system-health", icon: "Activity" },
      { label: "Settings", href: "/admin/settings", icon: "Sliders" },
    ],
  },
  theme: {
    primary: {
      emerald: "#059669",
      emeraldHover: "#047857",
      emeraldLight: "#ECFDF5",
      teal: "#0D9488",
      tealHover: "#0F766E",
    },
    action: {
      coral: "#F43F5E",
      coralHover: "#E11D48",
      coralLight: "#FFF1F2",
    },
    surfaces: {
      lightBg: "#FAFAF9",
      lightSurface: "#FFFFFF",
      lightSurfaceSecondary: "#F5F5F4",
      lightBorder: "#E4E4E7",
      darkBg: "#09090B",
      darkSurface: "#121214",
      darkSurfaceSecondary: "#18181B",
      darkBorder: "rgba(255, 255, 255, 0.08)",
    },
    typography: {
      charcoal: "#18181B",
      charcoalMuted: "#71717A",
      darkText: "#F4F4F5",
      darkTextMuted: "#A1A1AA",
    },
  },
};

/**
 * Standardized page title builder
 */
export function getPageTitle(subtitle?: string): string {
  if (!subtitle) {
    return `${BRAND_CONFIG.name} — ${BRAND_CONFIG.tagline}`;
  }
  return `${subtitle} | ${BRAND_CONFIG.name}`;
}

export default BRAND_CONFIG;
