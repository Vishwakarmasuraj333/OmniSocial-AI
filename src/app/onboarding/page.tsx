"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { OmniSocialLogo } from "@/components/brand/OmniSocialLogo";
import { BRAND_CONFIG } from "@/lib/brand-config";
import { renderPlatformIcon } from "@/components/icons/PlatformIcons";
import {
  Building2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Share2,
  Globe,
  Users,
  Compass,
  TrendingUp,
  Target,
  Zap,
} from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [orgName, setOrgName] = useState("");
  const [timezone, setTimezone] = useState("UTC");
  const [selectedGoals, setSelectedGoals] = useState<string[]>(["growth"]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["instagram", "x"]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleGoal = (id: string) => {
    setSelectedGoals((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const togglePlatform = (id: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleFinish = async () => {
    setIsSubmitting(true);
    try {
      // Provision/update active brand workspace
      if (orgName.trim()) {
        await fetch("/api/brand/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: orgName.trim(),
            timezone,
          }),
        }).catch(() => {});
      }
      router.push("/app");
    } catch {
      router.push("/app");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#09090B] text-slate-900 dark:text-slate-100 flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Top Header */}
      <div className="max-w-4xl w-full mx-auto flex items-center justify-between pb-6 border-b border-slate-200 dark:border-white/10">
        <OmniSocialLogo size="md" variant="full" href="/app" />
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Step {step} of 3
          </span>
          <div className="flex gap-1.5">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1.5 w-6 rounded-full transition-all duration-300 ${
                  s <= step ? "bg-emerald-600 dark:bg-emerald-400" : "bg-slate-200 dark:bg-white/10"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="max-w-2xl w-full mx-auto my-8 bg-white dark:bg-[#121214] border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-10 shadow-sm">
        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-emerald-700 bg-emerald-50 dark:text-emerald-300 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
                <Building2 className="w-3.5 h-3.5" /> Workspace Profile
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Name your social workspace
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Organize all your connected channels, team members, and scheduled posts under one brand.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  Workspace or Brand Name
                </label>
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="e.g. Acme Media Corp, Sarah's Studio"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-[#18181B] border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  Primary Publishing Timezone
                </label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-[#18181B] border border-slate-200 dark:border-white/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                >
                  <option value="UTC">UTC (Universal Coordinated Time)</option>
                  <option value="America/New_York">Eastern Time (US & Canada)</option>
                  <option value="America/Chicago">Central Time (US & Canada)</option>
                  <option value="America/Los_Angeles">Pacific Time (US & Canada)</option>
                  <option value="Europe/London">London (GMT / BST)</option>
                  <option value="Europe/Paris">Paris, Berlin, Rome (CET)</option>
                  <option value="Asia/Tokyo">Tokyo, Seoul (JST)</option>
                  <option value="Asia/Dubai">Dubai (GST)</option>
                  <option value="Asia/Kolkata">India Standard Time (IST)</option>
                  <option value="Australia/Sydney">Sydney, Melbourne (AEST)</option>
                </select>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition shadow-sm"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-teal-700 bg-teal-50 dark:text-teal-300 dark:bg-teal-500/10 border border-teal-200 dark:border-teal-500/20">
                <Target className="w-3.5 h-3.5" /> Strategy
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                What are your main social goals?
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                OmniSocial AI adapts its prompt models and analytics recommendations to your objectives.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: "growth", label: "Audience & Follower Growth", desc: "Scale viral reach and organic discovery", icon: TrendingUp },
                { id: "engagement", label: "Community Engagement", desc: "Foster active discussion, replies & loyalty", icon: Users },
                { id: "leads", label: "Conversions & Lead Gen", desc: "Drive traffic to landing pages and products", icon: Zap },
                { id: "brand", label: "Brand Authority & PR", desc: "Consistent thought leadership & announcements", icon: Compass },
              ].map((item) => {
                const isSelected = selectedGoals.includes(item.id);
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleGoal(item.id)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? "border-emerald-600 bg-emerald-50/50 dark:border-emerald-500 dark:bg-emerald-500/10 ring-1 ring-emerald-500"
                        : "border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 bg-transparent"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className={`p-2 rounded-xl ${isSelected ? "bg-emerald-600 text-white" : "bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300"}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
                    </div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">{item.label}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</div>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition shadow-sm"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-rose-700 bg-rose-50 dark:text-rose-300 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20">
                <Share2 className="w-3.5 h-3.5" /> Channels
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Select your core platforms
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                You can connect official accounts now or add them anytime from the Accounts center.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { id: "instagram", name: "Instagram Pro" },
                { id: "facebook", name: "Facebook Pages" },
                { id: "linkedin", name: "LinkedIn" },
                { id: "x", name: "X (Twitter)" },
                { id: "youtube", name: "YouTube" },
                { id: "tiktok", name: "TikTok" },
                { id: "pinterest", name: "Pinterest" },
                { id: "threads", name: "Threads" },
                { id: "googlebusiness", name: "Google Business" },
              ].map((p) => {
                const isSelected = selectedPlatforms.includes(p.id);
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => togglePlatform(p.id)}
                    className={`p-3.5 rounded-2xl border text-center flex flex-col items-center gap-2 transition ${
                      isSelected
                        ? "border-emerald-600 bg-emerald-50/50 dark:border-emerald-500 dark:bg-emerald-500/10 ring-1 ring-emerald-500"
                        : "border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 bg-transparent"
                    }`}
                  >
                    <div className="w-8 h-8 flex items-center justify-center">
                      {renderPlatformIcon(p.id, "w-6 h-6")}
                    </div>
                    <span className="text-xs font-semibold text-slate-900 dark:text-white">{p.name}</span>
                  </button>
                );
              })}
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                Back
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleFinish}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition shadow-sm disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isSubmitting ? "Preparing Workspace..." : "Complete & Open Workspace"}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer info */}
      <div className="text-center text-xs text-slate-400 dark:text-slate-500 py-4">
        {BRAND_CONFIG.legalName} • Enterprise Social Media Intelligence
      </div>
    </div>
  );
}
