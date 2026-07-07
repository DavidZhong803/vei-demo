"use client";

import {
  Cpu,
  BatteryCharging,
  Dna,
  Bot,
  Server,
  Layers,
  Landmark,
  Rocket,
  TrendingUp,
  RefreshCw,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { INDUSTRIES } from "@/lib/market";
import { useNow, hhmmss } from "./useNow";
import { useLang, useT } from "./lang";

const ICONS: Record<string, LucideIcon> = {
  "ai-semi": Cpu,
  energy: BatteryCharging,
  biotech: Dna,
  robotics: Bot,
  "ai-infra": Server,
  materials: Layers,
  fintech: Landmark,
  aerospace: Rocket,
};

export default function IndustrySidebar({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const now = useNow();
  const { lang } = useLang();
  const t = useT();

  return (
    <aside className="relative flex h-full w-full flex-col overflow-hidden bg-ink text-white/80">
      {/* ambient: emerald light from top, amber flare rising from the base */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 30% at 30% 0%, rgba(16,185,129,0.10), transparent 60%), radial-gradient(80% 34% at 50% 100%, rgba(224,138,18,0.10), transparent 62%)",
        }}
      />
      <div className="relative px-5 pb-4 pt-6">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold tracking-tight text-white">
            {t("Market Computation", "市场计算")}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-vea-amber/30 bg-vea-amber/10 px-2 py-0.5 text-[10px] font-medium text-vea-amber-soft">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-vea-amber-soft" />
            {t("Live", "运行中")}
          </span>
        </div>
        <p className="mt-1 text-[11px] leading-relaxed text-white/40">
          {t(
            "VEA computes the global market 7×24, continuously.",
            "AI 正在 7×24 小时持续计算全球市场。"
          )}
        </p>
      </div>

      <nav className="relative flex-1 space-y-1 overflow-y-auto px-3">
        {INDUSTRIES.map((ind) => {
          const Icon = ICONS[ind.id] ?? Cpu;
          const active = ind.id === selectedId;
          return (
            <button
              key={ind.id}
              onClick={() => onSelect(ind.id)}
              className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                active
                  ? "bg-vea-neon/10 ring-1 ring-inset ring-vea-neon/25"
                  : "hover:bg-white/[0.04]"
              }`}
            >
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                  active
                    ? "bg-vea-neon/15 text-vea-neon"
                    : "bg-white/[0.05] text-white/50 group-hover:text-white/80"
                }`}
              >
                <Icon className="h-4 w-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span
                  className={`block truncate text-[13px] font-medium ${
                    active ? "text-white" : "text-white/80"
                  }`}
                >
                  {lang === "zh" ? ind.nameZh : ind.nameEn}
                </span>
                <span className="block truncate text-[10px] text-white/35">
                  {ind.companies} {t("companies", "家企业")}
                </span>
              </span>
              <span
                className={`flex items-center gap-0.5 text-[10px] ${
                  active ? "text-vea-neon" : "text-white/40"
                }`}
              >
                <TrendingUp className="h-3 w-3" />
              </span>
            </button>
          );
        })}
      </nav>

      <div className="relative mt-2 border-t border-white/[0.06] px-5 py-4">
        <button className="mb-3 flex w-full items-center justify-between rounded-lg bg-white/[0.04] px-3 py-2 text-xs text-white/60 transition-colors hover:bg-white/[0.07]">
          {t("View all sectors", "查看全部产业")}
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
        <div className="flex items-center justify-between text-[10px] text-white/30">
          <span className="font-mono">
            {t("Updated", "最后更新")} {hhmmss(now)}
          </span>
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          >
            <RefreshCw className="h-3 w-3" />
          </motion.span>
        </div>
      </div>
    </aside>
  );
}
