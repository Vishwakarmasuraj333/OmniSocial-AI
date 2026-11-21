"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppLayout } from "@/components/layout/AppLayout";
import { renderPlatformIcon } from "@/components/icons/PlatformIcons";
import { useToast } from "@/components/ui/toast";
import { useBrand } from "@/context/BrandContext";
import {
  Sparkles,
  Wand2,
  CheckCircle2,
  ArrowRight,
  Send,
  Save,
  Copy,
  Check,
  RefreshCw,
  Hash,
  Sliders,
  Layers,
  Eye,
  AlertCircle,
  FileText,
  Target,
  Globe,
  Users,
  Compass,
  MessageSquare,
  ThumbsUp,
  Share2,
  Info,
} from "lucide-react";

const GOALS = [
  { id: "growth", label: "Audience Growth", desc: "Broad reach & follower acceleration" },
  { id: "engagement", label: "Community Engagement", desc: "Provoke replies, saves & discussions" },
  { id: "leads", label: "Conversions & Sales", desc: "Direct traffic to links, offers & products" },
  { id: "launch", label: "Product / Feature Launch", desc: "Build anticipation and highlight benefits" },
  { id: "education", label: "Educational Value", desc: "Bite-sized tips, breakdowns & how-tos" },
  { id: "storytelling", label: "Brand Storytelling", desc: "Behind the scenes, founder insights & values" },
];

const PLATFORMS = [
  { id: "instagram", name: "Instagram Pro", limit: 2200 },
  { id: "linkedin", name: "LinkedIn", limit: 3000 },
  { id: "x", name: "X (Twitter)", limit: 280 },
  { id: "facebook", name: "Facebook Pages", limit: 63206 },
  { id: "youtube", name: "YouTube Shorts / Video", limit: 5000 },
  { id: "tiktok", name: "TikTok", limit: 2200 },
  { id: "pinterest", name: "Pinterest Pins", limit: 500 },
  { id: "threads", name: "Threads", limit: 500 },
];

const TONES = [
  "Conversational & Warm",
  "Professional & Authoritative",
  "Witty & Energetic",
  "Inspiring & Thought-Provoking",
  "Direct & Minimalist",
  "Urgent & Promotional",
];

const AUDIENCES = [
  "B2B Founders & Executives",
  "Content Creators & Influencers",
  "Tech Early Adopters & Developers",
  "General Consumers (DTC)",
  "Marketing & Social Media Managers",
  "Students & Young Professionals",
];

export default function AIStudioPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { activeBrand } = useBrand();

  // 8-step workflow states
  const [step, setStep] = useState<number>(1);
  const [selectedGoal, setSelectedGoal] = useState<string>("growth");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["instagram", "x"]);
  const [activePreviewPlatform, setActivePreviewPlatform] = useState<string>("instagram");
  const [topic, setTopic] = useState<string>("");
  const [tone, setTone] = useState<string>("Conversational & Warm");
  const [audience, setAudience] = useState<string>("B2B Founders & Executives");
  const [language, setLanguage] = useState<string>("English (US)");
  const [brandVoice, setBrandVoice] = useState<string>("Modern, innovative, credible");

  // Output states
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [generatedHook, setGeneratedHook] = useState<string>("");
  const [generatedBody, setGeneratedBody] = useState<string>("");
  const [generatedHashtags, setGeneratedHashtags] = useState<string[]>([]);
  const [generatedCta, setGeneratedCta] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const togglePlatform = (id: string) => {
    setSelectedPlatforms((prev) => {
      const next = prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id];
      if (!next.includes(activePreviewPlatform) && next.length > 0) {
        setActivePreviewPlatform(next[0]);
      }
      return next;
    });
  };

  const fullCompiledCopy = `${generatedHook ? generatedHook + "\n\n" : ""}${generatedBody}${
    generatedCta ? "\n\n" + generatedCta : ""
  }${generatedHashtags.length > 0 ? "\n\n" + generatedHashtags.map((h) => (h.startsWith("#") ? h : `#${h}`)).join(" ") : ""}`;

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast({ title: "Topic required", message: "Please enter a topic or concept to generate content.", type: "error" });
      return;
    }

    setIsGenerating(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: topic.trim(),
          platform: selectedPlatforms[0] || "Instagram",
          tone,
          audience,
          goal: selectedGoal,
          language,
          brandVoice,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Generation request failed.");
      }

      // Parse structured output
      if (typeof data.content === "string") {
        const text = data.content;
        const lines = text.split("\n").filter((l: string) => l.trim().length > 0);
        if (lines.length > 0) {
          setGeneratedHook(lines[0].replace(/^["']|["']$/g, ""));
          setGeneratedBody(lines.slice(1).join("\n\n"));
        } else {
          setGeneratedBody(text);
        }
      } else {
        setGeneratedHook(data.hook || "");
        setGeneratedBody(data.caption || data.body || "");
      }

      if (Array.isArray(data.hashtags)) {
        setGeneratedHashtags(data.hashtags);
      } else {
        setGeneratedHashtags(["AI", "SocialMedia", "Marketing", "Growth"]);
      }

      setGeneratedCta(data.callToAction || data.cta || "Drop a comment below with your thoughts!");
      setStep(5);

      toast({
        title: "Content Synthesized!",
        message: "AI copy tailored for your target channels is ready for refinement.",
        type: "success",
      });
    } catch (err: any) {
      const msg = err.message || "Failed to generate AI content.";
      setErrorMessage(msg);
      toast({
        title: "AI Synthesis Error",
        message: msg,
        type: "error",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: fullCompiledCopy,
          platforms: selectedPlatforms,
          isDraft: true,
          status: "DRAFT",
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to save draft.");
      }

      toast({
        title: "Saved as Draft!",
        message: "Your AI-generated post has been saved to your drafts queue.",
        type: "success",
      });
      router.push("/app/drafts");
    } catch (err: any) {
      toast({
        title: "Draft Error",
        message: err.message || "Could not save draft.",
        type: "error",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSendToComposer = () => {
    const encoded = encodeURIComponent(fullCompiledCopy);
    router.push(`/app/publish?initialText=${encoded}`);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(fullCompiledCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "Copied!", message: "Text copied to clipboard.", type: "success" });
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-600/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                AI Content Studio
              </h1>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Multi-modal Google Gemini social copywriting, campaign ideation, and platform-specific adaptation.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/app/publish"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Direct Composer</span>
            </Link>
          </div>
        </div>

        {/* 8-Step Studio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Configuration Pane (Steps 1-4) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Step 1: Content Goal */}
            <div className="bg-white dark:bg-[#121214] border border-slate-200 dark:border-white/10 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5" /> Step 1 • Content Objective
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {GOALS.map((g) => {
                  const isSel = selectedGoal === g.id;
                  return (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setSelectedGoal(g.id)}
                      className={`p-2.5 rounded-xl border text-left transition ${
                        isSel
                          ? "border-emerald-600 bg-emerald-50/50 dark:border-emerald-500 dark:bg-emerald-500/10 ring-1 ring-emerald-500"
                          : "border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20"
                      }`}
                    >
                      <div className="text-xs font-bold text-slate-900 dark:text-white">{g.label}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">{g.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Target Channels */}
            <div className="bg-white dark:bg-[#121214] border border-slate-200 dark:border-white/10 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5" /> Step 2 • Target Social Platforms
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {PLATFORMS.map((p) => {
                  const isSel = selectedPlatforms.includes(p.id);
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => togglePlatform(p.id)}
                      className={`p-2 rounded-xl border flex flex-col items-center gap-1 text-center transition ${
                        isSel
                          ? "border-emerald-600 bg-emerald-50/50 dark:border-emerald-500 dark:bg-emerald-500/10 ring-1 ring-emerald-500"
                          : "border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20"
                      }`}
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        {renderPlatformIcon(p.id, "w-4 h-4")}
                      </div>
                      <span className="text-[10px] font-semibold text-slate-900 dark:text-white truncate w-full">
                        {p.name.split(" ")[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Topic & Input */}
            <div className="bg-white dark:bg-[#121214] border border-slate-200 dark:border-white/10 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" /> Step 3 • Topic, Seed Text or Angle
              </span>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Announcing our new AI auto-scheduling feature that saves creator teams 10+ hours per week..."
                rows={3}
                className="w-full p-3 bg-slate-50 dark:bg-[#18181B] border border-slate-200 dark:border-white/10 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-none"
              />
            </div>

            {/* Step 4: Tone, Audience & Voice */}
            <div className="bg-white dark:bg-[#121214] border border-slate-200 dark:border-white/10 rounded-2xl p-4 sm:p-5 shadow-xs space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5" /> Step 4 • Persona & Brand Voice
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    Tone of Voice
                  </label>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="w-full p-2 bg-slate-50 dark:bg-[#18181B] border border-slate-200 dark:border-white/10 rounded-lg text-xs"
                  >
                    {TONES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                    Target Audience
                  </label>
                  <select
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                    className="w-full p-2 bg-slate-50 dark:bg-[#18181B] border border-slate-200 dark:border-white/10 rounded-lg text-xs"
                  >
                    {AUDIENCES.map((a) => (
                      <option key={a} value={a}>
                        {a}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  Brand Voice Directives
                </label>
                <input
                  type="text"
                  value={brandVoice}
                  onChange={(e) => setBrandVoice(e.target.value)}
                  placeholder="e.g. Crisp, bold, no corporate fluff, focus on data"
                  className="w-full p-2 bg-slate-50 dark:bg-[#18181B] border border-slate-200 dark:border-white/10 rounded-lg text-xs"
                />
              </div>

              {/* Generate Trigger */}
              <button
                type="button"
                disabled={isGenerating || !topic.trim()}
                onClick={handleGenerate}
                className="w-full mt-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-sm"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Gemini AI Synthesizing Copy...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Step 5 • Generate Social Copy</span>
                  </>
                )}
              </button>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 text-rose-700 dark:text-rose-300 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Output & Interactive Refinement Pane (Steps 6-8) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Step 6: Editable Generated Output */}
            <div className="bg-white dark:bg-[#121214] border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                  <Wand2 className="w-3.5 h-3.5" /> Step 6 • Refine & Edit AI Sections
                </span>
                {generatedBody && (
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied" : "Copy All"}</span>
                  </button>
                )}
              </div>

              {!generatedBody && !isGenerating && (
                <div className="py-16 text-center space-y-3 border border-dashed border-slate-200 dark:border-white/10 rounded-xl">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/5 mx-auto flex items-center justify-center text-slate-400">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Ready to Generate Content
                  </div>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Configure your goal and topic on the left, then click Generate to create tailored copy.
                  </p>
                </div>
              )}

              {isGenerating && (
                <div className="py-16 text-center space-y-3">
                  <div className="w-10 h-10 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Contacting Google Gemini API with platform heuristics...
                  </p>
                </div>
              )}

              {generatedBody && !isGenerating && (
                <div className="space-y-4">
                  {/* Hook */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                      Viral Hook / Opening Statement
                    </label>
                    <input
                      type="text"
                      value={generatedHook}
                      onChange={(e) => setGeneratedHook(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 dark:bg-[#18181B] border border-slate-200 dark:border-white/10 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    />
                  </div>

                  {/* Body Copy */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                      Body Caption
                    </label>
                    <textarea
                      value={generatedBody}
                      onChange={(e) => setGeneratedBody(e.target.value)}
                      rows={6}
                      className="w-full p-3 bg-slate-50 dark:bg-[#18181B] border border-slate-200 dark:border-white/10 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-y"
                    />
                  </div>

                  {/* Call to Action */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                      Call to Action (CTA)
                    </label>
                    <input
                      type="text"
                      value={generatedCta}
                      onChange={(e) => setGeneratedCta(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 dark:bg-[#18181B] border border-slate-200 dark:border-white/10 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    />
                  </div>

                  {/* Hashtags */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                      Hashtag Recommendations
                    </label>
                    <div className="flex flex-wrap gap-1.5 p-2 bg-slate-50 dark:bg-[#18181B] border border-slate-200 dark:border-white/10 rounded-xl">
                      {generatedHashtags.map((h, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 text-[11px] font-semibold"
                        >
                          {h.startsWith("#") ? h : `#${h}`}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Step 7: Platform Live Preview */}
            {generatedBody && !isGenerating && (
              <div className="bg-white dark:bg-[#121214] border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" /> Step 7 • Platform Previews
                  </span>

                  <div className="flex items-center gap-1">
                    {selectedPlatforms.map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setActivePreviewPlatform(p)}
                        className={`p-1.5 rounded-lg border transition ${
                          activePreviewPlatform === p
                            ? "bg-slate-100 dark:bg-white/10 border-slate-300 dark:border-white/20"
                            : "border-transparent text-slate-400 hover:text-slate-600"
                        }`}
                      >
                        {renderPlatformIcon(p, "w-4 h-4")}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mockup Card */}
                <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#18181B] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-300 dark:bg-slate-700 flex items-center justify-center text-xs font-bold">
                        {renderPlatformIcon(activePreviewPlatform, "w-4 h-4")}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">
                          {activeBrand?.name || "Your Brand"}
                        </div>
                        <div className="text-[10px] text-slate-400 capitalize">{activePreviewPlatform} Preview</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-slate-500">
                      {fullCompiledCopy.length} /{" "}
                      {PLATFORMS.find((p) => p.id === activePreviewPlatform)?.limit || 2200} chars
                    </span>
                  </div>

                  <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">
                    {fullCompiledCopy}
                  </div>
                </div>
              </div>
            )}

            {/* Step 8: Action Execution */}
            {generatedBody && !isGenerating && (
              <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={handleSaveDraft}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 text-xs font-bold uppercase tracking-wider transition"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isSaving ? "Saving..." : "Save to Drafts"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleSendToComposer}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider transition shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send to Post Composer</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
