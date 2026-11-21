import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ToastProvider } from "@/components/ui/toast";
import { BrandProvider } from "@/context/BrandContext";
import { CookieConsentBanner } from "@/components/consent/CookieConsentBanner";
import { BRAND_CONFIG } from "@/lib/brand-config";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || BRAND_CONFIG.appUrl;

export const viewport: Viewport = {
  themeColor: "#059669",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${BRAND_CONFIG.name} — ${BRAND_CONFIG.tagline}`,
    template: `%s | ${BRAND_CONFIG.name}`,
  },
  description: BRAND_CONFIG.description,
  keywords: [
    "social media management",
    "AI social media scheduler",
    "social inbox",
    "content calendar",
    "multi-brand workspace",
    "OmniSocial AI",
    "Google Gemini social AI",
    "social listening",
  ],
  authors: [{ name: `${BRAND_CONFIG.name} Engineering Team` }],
  creator: BRAND_CONFIG.name,
  publisher: BRAND_CONFIG.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: [
      { url: "/icon.svg", sizes: "180x180", type: "image/svg+xml" },
    ],
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: BRAND_CONFIG.name,
    title: `${BRAND_CONFIG.name} — ${BRAND_CONFIG.tagline}`,
    description: BRAND_CONFIG.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND_CONFIG.name} — ${BRAND_CONFIG.tagline}`,
    description: BRAND_CONFIG.description,
    images: [`${siteUrl}/PulseSocial_1024x1024_App_Icon.png`],
    creator: "@SocialPulseHQ",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/#software`,
      name: "SocialPulse",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: siteUrl,
      description:
        "Professional social media management SaaS platform for scheduling, publishing, monitoring, and cross-platform analytics.",
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "USD",
        lowPrice: "0",
        highPrice: "99",
        offerCount: "4",
      },
      featureList: [
        "Social media publishing and scheduling",
        "Visual content calendar",
        "Unified social inbox",
        "Social listening and brand monitoring",
        "Cross-platform analytics and reporting",
        "AI-powered caption and content assistance",
        "Team collaboration and post approvals",
        "Multi-brand and agency workspaces",
        "Secure social account management",
        "Mobile-responsive workflows",
      ],
    },
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "SocialPulse",
      url: siteUrl,
      logo: `${siteUrl}/PulseSocial_1024x1024_App_Icon.png`,
      sameAs: [
        "https://twitter.com/SocialPulseHQ",
        "https://www.linkedin.com/company/socialpulse-hq",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('pulsesocial_theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var isDark = saved === 'dark' || (!saved && prefersDark) || (saved === 'system' && prefersDark);
                  if (saved === 'light') isDark = false;
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch(e) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="h-full antialiased font-sans bg-slate-50 dark:bg-[#0D0D0E] text-slate-900 dark:text-[#9CA3AF]"
        suppressHydrationWarning
      >
        <ToastProvider>
          <BrandProvider>
            {children}
            <CookieConsentBanner />
          </BrandProvider>
        </ToastProvider>
      </body>
    </html>
  );
}

