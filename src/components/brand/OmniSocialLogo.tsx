"use client";

import React, { useId } from "react";
import Link from "next/link";
import { BRAND_CONFIG } from "@/lib/brand-config";

export type LogoThemeMode = "dark" | "light" | "system" | "auto";

export interface OmniSocialLogoProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: "full" | "icon" | "with-tagline" | "monogram" | "collapsed";
  theme?: LogoThemeMode;
  className?: string;
  href?: string | null;
  animated?: boolean;
}

export function OmniSocialLogo({
  size = "md",
  variant = "full",
  theme = "auto",
  className = "",
  href,
  animated = true,
}: OmniSocialLogoProps) {
  const reactId = useId().replace(/[^a-zA-Z0-9]/g, "");

  const iconSizes = {
    xs: { w: 22, h: 22, spark: 6 },
    sm: { w: 28, h: 28, spark: 8 },
    md: { w: 36, h: 36, spark: 10 },
    lg: { w: 44, h: 44, spark: 12 },
    xl: { w: 56, h: 56, spark: 16 },
  };

  const textSizes = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  const currentIcon = iconSizes[size] || iconSizes.md;
  const isExplicitDark = theme === "dark";
  const isExplicitLight = theme === "light";

  const emeraldGradId = `omniEmeraldGrad_${reactId}`;
  const tealGradId = `omniTealGrad_${reactId}`;
  const coralGradId = `omniCoralGrad_${reactId}`;
  const glowFilterId = `omniGlowFilter_${reactId}`;

  // Unique custom SVG Icon combining interconnected nodes (social), flow ribbons (creation), and 4-point AI spark
  const logoIcon = (
    <div
      className={`relative shrink-0 flex items-center justify-center select-none ${
        animated ? "group" : ""
      }`}
      style={{ width: currentIcon.w, height: currentIcon.h }}
      role="img"
      aria-label={`${BRAND_CONFIG.name} Emblem`}
    >
      {/* Ambient Glow */}
      <div
        className={`absolute inset-0 rounded-2xl opacity-40 blur-md pointer-events-none transition-all duration-300 ${
          isExplicitDark
            ? "bg-emerald-500/30"
            : isExplicitLight
            ? "bg-emerald-600/20"
            : "bg-emerald-600/20 dark:bg-emerald-500/30"
        }`}
      />

      {/* Custom Vector Emblem */}
      <svg
        width={currentIcon.w}
        height={currentIcon.h}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`relative z-10 transition-transform duration-300 ${
          animated ? "group-hover:scale-105 motion-safe:animate-pulse-subtle" : ""
        }`}
      >
        <defs>
          {/* Emerald Gradient */}
          <linearGradient id={emeraldGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="50%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>

          {/* Teal Accent Gradient */}
          <linearGradient id={tealGradId} x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0D9488" />
            <stop offset="100%" stopColor="#14B8A6" />
          </linearGradient>

          {/* Warm Coral Accent Gradient */}
          <linearGradient id={coralGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F43F5E" />
            <stop offset="100%" stopColor="#FB7185" />
          </linearGradient>

          {/* Soft Filter */}
          <filter id={glowFilterId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Interconnected Orbital Rings */}
        <circle
          cx="32"
          cy="32"
          r="26"
          stroke={`url(#${emeraldGradId})`}
          strokeWidth="3.5"
          strokeDasharray="6 3"
          strokeOpacity="0.75"
        />

        {/* Inner Continuous Infinity Flow (Content Creation & Multi-platform) */}
        <path
          d="M20 32C20 25.3726 25.3726 20 32 20C38.6274 20 44 25.3726 44 32C44 38.6274 38.6274 44 32 44C25.3726 44 20 38.6274 20 32Z"
          stroke={`url(#${tealGradId})`}
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Central Dynamic AI Spark (4-pointed star) */}
        <path
          d="M32 16L34.2 27.8L46 30L34.2 32.2L32 44L29.8 32.2L18 30L29.8 27.8L32 16Z"
          fill={`url(#${coralGradId})`}
        />

        {/* Interconnected Node Satellites */}
        <circle cx="16" cy="20" r="3.5" fill="#10B981" />
        <circle cx="48" cy="20" r="3.5" fill="#0D9488" />
        <circle cx="48" cy="44" r="3.5" fill="#F43F5E" />
        <circle cx="16" cy="44" r="3.5" fill="#10B981" />

        {/* Central Core Photon */}
        <circle cx="32" cy="30" r="2.5" fill="#FFFFFF" />
      </svg>
    </div>
  );

  if (variant === "icon" || variant === "monogram" || variant === "collapsed") {
    if (href) {
      return (
        <Link
          href={href}
          className={`inline-flex items-center justify-center rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${className}`}
          aria-label={BRAND_CONFIG.name}
        >
          {logoIcon}
        </Link>
      );
    }
    return <div className={`inline-flex items-center ${className}`}>{logoIcon}</div>;
  }

  const content = (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {logoIcon}

      {/* Typography Wordmark */}
      <div className="flex flex-col select-none">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-black tracking-tight ${
              isExplicitDark
                ? "text-white"
                : isExplicitLight
                ? "text-slate-900"
                : "text-slate-900 dark:text-white"
            } ${textSizes[size]}`}
          >
            Omni<span className="text-emerald-600 dark:text-emerald-400">Social</span>
          </span>

          {/* AI Intelligence Micro-Pill */}
          <span
            className={`px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded-md border ${
              isExplicitDark
                ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                : isExplicitLight
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/30"
            }`}
          >
            AI
          </span>
        </div>

        {variant === "with-tagline" && (
          <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 tracking-wide mt-0.5">
            {BRAND_CONFIG.tagline}
          </span>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex items-center rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
        aria-label={`${BRAND_CONFIG.name} Home`}
      >
        {content}
      </Link>
    );
  }

  return content;
}

export default OmniSocialLogo;
