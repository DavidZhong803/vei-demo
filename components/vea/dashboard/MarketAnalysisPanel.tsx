"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUp,
  BatteryCharging,
  Bot,
  Braces,
  Cpu,
  Dna,
  Landmark,
  Layers,
  Minus,
  Radio,
  Rocket,
  Server,
  type LucideIcon,
} from "lucide-react";
import { getIndustry, INDUSTRIES, type ValueNode } from "@/lib/market";
import { hhmmss } from "./useNow";
import { useLang, useT } from "./lang";

type LiveNode = ValueNode & { updatedAt: number; flash: boolean };

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

function ChangeBadge({ delta, flash }: { delta: number; flash: boolean }) {
  const base =
    "inline-flex min-w-12 items-center justify-center gap-1 rounded-md px-2 py-1 text-xs font-semibold transition-transform";
  if (delta > 0) {
    return (
      <span
        className={`${base} bg-vea-neon/10 text-vea-neon ${
          flash ? "scale-110" : ""
        }`}
      >
        <ArrowUp className="h-3 w-3" />+{delta}
      </span>
    );
  }

  if (delta < 0) {
    return (
      <span
        className={`${base} bg-rose-400/10 text-rose-300 ${
          flash ? "scale-110" : ""
        }`}
      >
        <ArrowDown className="h-3 w-3" />
        {delta}
      </span>
    );
  }

  return (
    <span className={`${base} bg-white/[0.06] text-white/38`}>
      <Minus className="h-3 w-3" />
    </span>
  );
}

export default function MarketAnalysisPanel({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const { lang } = useLang();
  const t = useT();
  const industry = getIndustry(selectedId) ?? INDUSTRIES[0];
  const [nodes, setNodes] = useState<LiveNode[]>([]);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const now = Date.now();
    setNodes(
      industry.nodes.map((n, i) => ({
        ...n,
        updatedAt: now - (12 + i * 13) * 1000,
        flash: false,
      }))
    );
  }, [industry]);

  useEffect(() => {
    const iv = setInterval(() => {
      setNodes((prev) => {
        if (prev.length < 2) return prev;
        const next = prev.map((n) => ({ ...n, flash: false }));
        const i = Math.floor(Math.random() * next.length);
        const goUp = i > 0 && Math.random() > 0.28;
        const delta = (goUp ? 1 : -1) * (1 + Math.floor(Math.random() * 3));

        next[i] = {
          ...next[i],
          positionChange: delta,
          updatedAt: Date.now(),
          flash: true,
        };

        if (goUp && i > 0) {
          [next[i - 1], next[i]] = [next[i], next[i - 1]];
        } else if (!goUp && i < next.length - 1) {
          [next[i], next[i + 1]] = [next[i + 1], next[i]];
        }

        return next;
      });

      if (flashTimer.current) clearTimeout(flashTimer.current);
      flashTimer.current = setTimeout(() => {
        setNodes((prev) => prev.map((n) => ({ ...n, flash: false })));
      }, 1400);
    }, 2600);

    return () => {
      clearInterval(iv);
      if (flashTimer.current) clearTimeout(flashTimer.current);
    };
  }, [industry]);

  return (
    <section className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-white/[0.09] bg-[#07140f]/78 shadow-2xl shadow-black/25 backdrop-blur-xl">
      <div className="border-b border-white/[0.08] p-4 sm:p-5">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-vea-amber/20 bg-vea-amber/[0.08] px-3 py-1 text-[11px] font-medium text-vea-amber-soft">
              <Radio className="h-3.5 w-3.5 animate-pulse" />
              {t("Live market analysis", "实时市场分析")}
            </div>
            <h1 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {lang === "zh" ? industry.nameZh : industry.nameEn}
            </h1>
            <p className="mt-1 max-w-3xl text-sm leading-6 text-white/48">
              {t(
                "Continuous signals from market events, value-chain nodes, and monetization windows.",
                "持续读取市场事件、价值链节点和技术货币化窗口。"
              )}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            {[
              ["128", "nodes"],
              ["36", "models"],
              ["7×24", "online"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-lg border border-white/[0.08] bg-white/[0.035] px-3 py-2"
              >
                <p className="font-mono text-lg font-semibold text-vea-neon">
                  {value}
                </p>
                <p className="text-[10px] uppercase tracking-wider text-white/32">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {INDUSTRIES.map((ind) => {
            const Icon = ICONS[ind.id] ?? Cpu;
            const active = ind.id === selectedId;
            return (
              <button
                key={ind.id}
                onClick={() => onSelect(ind.id)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-xs font-medium transition-colors ${
                  active
                    ? "bg-vea-neon/15 text-vea-neon ring-1 ring-vea-neon/25"
                    : "bg-white/[0.045] text-white/52 hover:bg-white/[0.075] hover:text-white"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {lang === "zh" ? ind.nameZh : ind.nameEn}
              </button>
            );
          })}
        </div>
      </div>

      <div className="hidden grid-cols-[1.1fr_auto_1.55fr_auto] items-center gap-4 border-b border-white/[0.07] px-5 py-3 text-[10px] uppercase tracking-wider text-white/30 sm:grid">
        <span>{t("Node", "节点")}</span>
        <span className="text-center">{t("Shift", "变化")}</span>
        <span>{t("Next event", "下一事件")}</span>
        <span className="text-right">{t("Updated", "更新")}</span>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {nodes.map((node) => (
          <motion.div
            key={node.id}
            layout
            transition={{ layout: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
            animate={{
              backgroundColor: node.flash
                ? "rgba(245,166,35,0.10)"
                : "rgba(255,255,255,0)",
            }}
            className="border-b border-white/[0.055]"
          >
            <div className="px-4 py-4 sm:hidden">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white">
                    {lang === "zh" ? node.nameZh : node.nameEn}
                  </p>
                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-white/46">
                    {lang === "zh" ? node.nextEventZh : node.nextEventEn}
                  </p>
                </div>
                <ChangeBadge delta={node.positionChange} flash={node.flash} />
              </div>
            </div>

            <div className="hidden grid-cols-[1.1fr_auto_1.55fr_auto] items-center gap-4 px-5 py-3.5 sm:grid">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="truncate text-sm font-medium text-white/88">
                    {lang === "zh" ? node.nameZh : node.nameEn}
                  </span>
                  {node.flash && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="rounded bg-vea-amber/15 px-1.5 py-0.5 text-[9px] font-semibold text-vea-amber-soft"
                    >
                      LIVE
                    </motion.span>
                  )}
                </div>
                <span className="block truncate text-[10px] text-white/28">
                  {lang === "zh" ? node.nameEn : node.nameZh}
                </span>
              </div>

              <div className="flex justify-center">
                <ChangeBadge delta={node.positionChange} flash={node.flash} />
              </div>

              <p className="truncate text-sm text-white/54">
                {lang === "zh" ? node.nextEventZh : node.nextEventEn}
              </p>

              <span
                className={`text-right font-mono text-[11px] tabular-nums ${
                  node.flash ? "text-vea-amber-soft" : "text-white/30"
                }`}
              >
                {hhmmss(new Date(node.updatedAt))}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex shrink-0 items-center gap-2 border-t border-white/[0.07] px-4 py-3 text-xs text-white/36">
        <Braces className="h-3.5 w-3.5 text-vea-amber-soft" />
        {t(
          "Market view stays visible while the copilot works on the right.",
          "市场视图常驻左侧，右侧对话框执行具体分析。"
        )}
      </div>
    </section>
  );
}
