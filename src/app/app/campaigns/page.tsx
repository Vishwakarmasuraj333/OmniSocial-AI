"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AppLayout } from "@/components/layout/AppLayout";
import { renderPlatformIcon } from "@/components/icons/PlatformIcons";
import { useToast } from "@/components/ui/toast";
import { useBrand } from "@/context/BrandContext";
import {
  Megaphone,
  Plus,
  Calendar,
  Share2,
  TrendingUp,
  Users,
  CheckCircle2,
  Clock,
  Layers,
  Search,
  Filter,
  BarChart3,
  DollarSign,
  X,
  Target,
  Sparkles,
} from "lucide-react";

interface CampaignItem {
  id: string;
  name: string;
  description: string;
  status: "ACTIVE" | "SCHEDULED" | "COMPLETED" | "DRAFT";
  startDate: string;
  endDate: string;
  platforms: string[];
  postCount: number;
  totalReach: number;
  engagementRate: number;
  budget?: number;
}

export default function CampaignsPage() {
  const { toast } = useToast();
  const { activeBrand } = useBrand();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Form states for modal
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["instagram", "linkedin"]);
  const [budget, setBudget] = useState("");

  const [campaigns, setCampaigns] = useState<CampaignItem[]>([
    {
      id: "camp-1",
      name: "Q4 Global Brand Product Launch",
      description: "Cross-network awareness campaign for the next-generation OmniSocial AI release.",
      status: "ACTIVE",
      startDate: "2026-11-01",
      endDate: "2026-12-15",
      platforms: ["instagram", "x", "linkedin", "youtube"],
      postCount: 18,
      totalReach: 42800,
      engagementRate: 5.4,
      budget: 5000,
    },
    {
      id: "camp-2",
      name: "Black Friday & Cyber Week Push",
      description: "Direct conversion and promo codes across consumer visual channels.",
      status: "SCHEDULED",
      startDate: "2026-11-25",
      endDate: "2026-12-02",
      platforms: ["instagram", "facebook", "tiktok", "pinterest"],
      postCount: 12,
      totalReach: 18400,
      engagementRate: 4.8,
      budget: 3500,
    },
    {
      id: "camp-3",
      name: "Creator Thought Leadership Series",
      description: "B2B LinkedIn and X deep-dives on the future of autonomous AI social agents.",
      status: "ACTIVE",
      startDate: "2026-10-15",
      endDate: "2026-11-30",
      platforms: ["linkedin", "x", "threads"],
      postCount: 24,
      totalReach: 89300,
      engagementRate: 6.2,
      budget: 1200,
    },
  ]);

  const togglePlatform = (p: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(p) ? prev.filter((item) => item !== p) : [...prev, p]
    );
  };

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newCamp: CampaignItem = {
      id: `camp-${Date.now()}`,
      name: name.trim(),
      description: description.trim() || "Multi-network strategic campaign.",
      status: "ACTIVE",
      startDate: startDate || new Date().toISOString().split("T")[0],
      endDate: endDate || new Date(Date.now() + 30 * 86400000).toISOString().split("T")[0],
      platforms: selectedPlatforms.length > 0 ? selectedPlatforms : ["instagram", "x"],
      postCount: 0,
      totalReach: 0,
      engagementRate: 0,
      budget: budget ? parseFloat(budget) : undefined,
    };

    setCampaigns([newCamp, ...campaigns]);
    setIsCreateModalOpen(false);
    setName("");
    setDescription("");
    setBudget("");
    toast({
      title: "Campaign Created",
      message: `Campaign "${newCamp.name}" is now active in your workspace.`,
      type: "success",
    });
  };

  const filtered = campaigns.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-600/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Megaphone className="w-4 h-4" />
              </div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                Campaign Management
              </h1>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Organize multi-network posts, track unified reach, and analyze cross-platform campaign performance.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider transition shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Create Campaign</span>
          </button>
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-[#121214] p-3 rounded-2xl border border-slate-200 dark:border-white/10 shadow-2xs">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search campaigns..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-[#18181B] border border-slate-200 dark:border-white/10 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            />
          </div>

          <div className="flex items-center gap-2">
            {["ALL", "ACTIVE", "SCHEDULED", "COMPLETED"].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  statusFilter === st
                    ? "bg-emerald-600 text-white shadow-2xs"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5"
                }`}
              >
                {st.charAt(0) + st.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Campaign Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((c) => (
            <div
              key={c.id}
              className="bg-white dark:bg-[#121214] border border-slate-200 dark:border-white/10 rounded-2xl p-5 shadow-xs space-y-4 hover:border-slate-300 dark:hover:border-white/20 transition flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                      c.status === "ACTIVE"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-500/30"
                        : c.status === "SCHEDULED"
                        ? "bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:border-amber-500/30"
                        : "bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300"
                    }`}
                  >
                    {c.status}
                  </span>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
                    <Calendar className="w-3 h-3" />
                    {c.startDate} to {c.endDate}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                    {c.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {c.description}
                  </p>
                </div>

                {/* Platform Badges */}
                <div className="flex items-center gap-1.5 pt-1">
                  {c.platforms.map((p) => (
                    <div
                      key={p}
                      className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center"
                      title={p}
                    >
                      {renderPlatformIcon(p, "w-3.5 h-3.5")}
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats Footer */}
              <div className="pt-4 border-t border-slate-100 dark:border-white/5 grid grid-cols-3 gap-2 text-center">
                <div className="bg-slate-50 dark:bg-[#18181B] p-2 rounded-xl">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Posts</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">{c.postCount}</div>
                </div>
                <div className="bg-slate-50 dark:bg-[#18181B] p-2 rounded-xl">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Reach</div>
                  <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                    {c.totalReach.toLocaleString()}
                  </div>
                </div>
                <div className="bg-slate-50 dark:bg-[#18181B] p-2 rounded-xl">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Engage</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">{c.engagementRate}%</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center space-y-3 bg-white dark:bg-[#121214] border border-slate-200 dark:border-white/10 rounded-2xl">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-white/5 mx-auto flex items-center justify-center text-slate-400">
              <Megaphone className="w-6 h-6" />
            </div>
            <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">No campaigns found</div>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Create a new campaign to coordinate posts and track cross-platform results.
            </p>
          </div>
        )}

        {/* Create Campaign Modal */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#121214] border border-slate-200 dark:border-white/10 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-xl animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <Megaphone className="w-4 h-4" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">New Social Campaign</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateCampaign} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Campaign Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. 2026 Product Keynote"
                    className="w-full p-3 bg-slate-50 dark:bg-[#18181B] border border-slate-200 dark:border-white/10 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                    Description & Objectives
                  </label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Key campaign angle, tags, and expected outcome..."
                    className="w-full p-3 bg-slate-50 dark:bg-[#18181B] border border-slate-200 dark:border-white/10 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 dark:bg-[#18181B] border border-slate-200 dark:border-white/10 rounded-xl text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 dark:bg-[#18181B] border border-slate-200 dark:border-white/10 rounded-xl text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    Target Channels
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {["instagram", "facebook", "linkedin", "x", "youtube", "tiktok", "pinterest", "threads"].map((p) => {
                      const isSel = selectedPlatforms.includes(p);
                      return (
                        <button
                          key={p}
                          type="button"
                          onClick={() => togglePlatform(p)}
                          className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition ${
                            isSel
                              ? "border-emerald-600 bg-emerald-50/50 dark:border-emerald-500 dark:bg-emerald-500/10"
                              : "border-slate-200 dark:border-white/10 hover:border-slate-300"
                          }`}
                        >
                          {renderPlatformIcon(p, "w-4 h-4")}
                          <span className="text-[10px] font-semibold capitalize">{p}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition shadow-sm"
                  >
                    Save & Launch Campaign
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
