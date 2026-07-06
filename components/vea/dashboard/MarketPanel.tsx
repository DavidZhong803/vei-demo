"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUp, ArrowDown, Minus, Radio } from "lucide-react";
import { INDUSTRIES, getIndustry } from "@/lib/market";
import { useNow, hhmmss } from "./useNow";

function ChangeBadge({ delta }: { delta: number }) {
  if (delta > 0)
    return (
      <span className="inline-flex items-center gap-1 rounded-md bg-vea-emerald/10 px-1.5 py-0.5 text-xs font-semibold text-vea-emerald">
        <ArrowUp className="h-3 w-3" />+{delta}
      </span>
    );
  if (delta < 0)
    return (
      <span className="inline-flex items-center gap-1 rounded-md bg-rose-500/10 px-1.5 py-0.5 text-xs font-semibold text-rose-500">
        <ArrowDown className="h-3 w-3" />
        {delta}
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-slate-400/10 px-1.5 py-0.5 text-xs font-semibold text-slate-400">
      <Minus className="h-3 w-3" />
    </span>
  );
}

export default function MarketPanel({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const now = useNow();
  const industry = getIndustry(selectedId) ?? INDUSTRIES[0];

  return (
    <section className="paper-card flex h-full flex-col rounded-2xl">
      {/* header */}
      <div className="flex items-start justify-between gap-3 border-b border-black/[0.06] p-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-slate-900">
              {industry.nameZh}
            </h2>
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-vea-emerald">
              <Radio className="h-3 w-3 animate-pulse" />
              7×24 实时
            </span>
          </div>
          <p className="mt-0.5 text-xs text-slate-400">
            {industry.nameEn} value chain · live computation
          </p>
        </div>
        <span className="hidden shrink-0 rounded-full bg-black/[0.04] px-2.5 py-1 text-[11px] text-slate-500 sm:block">
          {industry.companies} 家企业
        </span>
      </div>

      {/* industry chips — mobile only (sidebar handles desktop) */}
      <div className="flex gap-2 overflow-x-auto border-b border-black/[0.06] px-4 py-3 lg:hidden">
        {INDUSTRIES.map((ind) => (
          <button
            key={ind.id}
            onClick={() => onSelect(ind.id)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              ind.id === selectedId
                ? "bg-vea-emerald text-white"
                : "bg-black/[0.04] text-slate-500"
            }`}
          >
            {ind.nameZh}
          </button>
        ))}
      </div>

      {/* column headers */}
      <div className="grid grid-cols-[1.4fr_auto_1.6fr_auto] items-center gap-3 px-5 py-2.5 text-[10px] uppercase tracking-wider text-slate-400 sm:gap-4">
        <span>节点 Node</span>
        <span className="text-center">位置</span>
        <span className="hidden sm:block">下一事件 Next Event</span>
        <span className="sm:hidden">事件</span>
        <span className="text-right">更新</span>
      </div>

      {/* rows */}
      <div className="flex-1 divide-y divide-black/[0.04] overflow-y-auto">
        {industry.nodes.map((node, i) => {
          const t = new Date(now.getTime() - (12 + i * 13) * 1000);
          return (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`grid grid-cols-[1.4fr_auto_1.6fr_auto] items-center gap-3 px-5 py-3 transition-colors hover:bg-black/[0.015] sm:gap-4 ${
                node.hot ? "bg-vea-emerald/[0.03]" : ""
              }`}
            >
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="truncate text-sm font-medium text-slate-800">
                    {node.nameZh}
                  </span>
                  {node.hot && (
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-vea-emerald" />
                  )}
                </div>
                <span className="block truncate text-[10px] text-slate-400">
                  {node.nameEn}
                </span>
              </div>

              <div className="flex justify-center">
                <ChangeBadge delta={node.positionChange} />
              </div>

              <div className="min-w-0">
                <p className="truncate text-xs text-slate-600">
                  {node.nextEventZh}
                </p>
                <p className="hidden truncate text-[10px] text-slate-400 sm:block">
                  {node.nextEventEn}
                </p>
              </div>

              <span className="text-right font-mono text-[11px] tabular-nums text-slate-400">
                {hhmmss(t)}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* footer */}
      <button className="flex items-center justify-center gap-1.5 border-t border-black/[0.06] py-3 text-xs font-medium text-slate-500 transition-colors hover:text-vea-emerald">
        查看全部价值链 View full value chain
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </section>
  );
}
