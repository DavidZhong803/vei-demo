"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUp, ArrowDown, Minus, Radio } from "lucide-react";
import { INDUSTRIES, getIndustry, type ValueNode } from "@/lib/market";
import { hhmmss } from "./useNow";

type LiveNode = ValueNode & { updatedAt: number; flash: boolean };

function ChangeBadge({ delta, flash }: { delta: number; flash: boolean }) {
  const base =
    "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs font-semibold transition-transform";
  if (delta > 0)
    return (
      <span
        className={`${base} bg-vea-emerald/10 text-vea-emerald ${flash ? "scale-110" : ""}`}
      >
        <ArrowUp className="h-3 w-3" />+{delta}
      </span>
    );
  if (delta < 0)
    return (
      <span className={`${base} bg-rose-500/10 text-rose-500 ${flash ? "scale-110" : ""}`}>
        <ArrowDown className="h-3 w-3" />
        {delta}
      </span>
    );
  return (
    <span className={`${base} bg-slate-400/10 text-slate-400`}>
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
  const industry = getIndustry(selectedId) ?? INDUSTRIES[0];
  const [nodes, setNodes] = useState<LiveNode[]>([]);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset live state whenever the industry changes.
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

  // 7×24 live simulation: periodically a node's position moves, the row
  // reorders (framer layout animation), and it flashes as "just updated".
  useEffect(() => {
    const iv = setInterval(() => {
      setNodes((prev) => {
        if (prev.length < 2) return prev;
        const next = prev.map((n) => ({ ...n, flash: false }));
        const i = Math.floor(Math.random() * next.length);
        const goUp = i > 0 && Math.random() > 0.28; // mostly rise
        const delta = (goUp ? 1 : -1) * (1 + Math.floor(Math.random() * 3));
        next[i] = {
          ...next[i],
          positionChange: delta,
          updatedAt: Date.now(),
          flash: true,
        };
        // Reorder: risers move up one slot, fallers move down one slot.
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
      <div className="flex-1 overflow-y-auto">
        {nodes.map((node) => (
          <motion.div
            key={node.id}
            layout
            transition={{ layout: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
            animate={{
              backgroundColor: node.flash
                ? "rgba(5,150,105,0.09)"
                : "rgba(5,150,105,0)",
            }}
            className="grid grid-cols-[1.4fr_auto_1.6fr_auto] items-center gap-3 border-b border-black/[0.04] px-5 py-3 sm:gap-4"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="truncate text-sm font-medium text-slate-800">
                  {node.nameZh}
                </span>
                {node.flash && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded bg-vea-emerald/15 px-1 py-0.5 text-[9px] font-semibold text-vea-emerald"
                  >
                    LIVE
                  </motion.span>
                )}
              </div>
              <span className="block truncate text-[10px] text-slate-400">
                {node.nameEn}
              </span>
            </div>

            <div className="flex justify-center">
              <ChangeBadge delta={node.positionChange} flash={node.flash} />
            </div>

            <div className="min-w-0">
              <p className="truncate text-xs text-slate-600">{node.nextEventZh}</p>
              <p className="hidden truncate text-[10px] text-slate-400 sm:block">
                {node.nextEventEn}
              </p>
            </div>

            <span
              className={`text-right font-mono text-[11px] tabular-nums ${
                node.flash ? "text-vea-emerald" : "text-slate-400"
              }`}
            >
              {hhmmss(new Date(node.updatedAt))}
            </span>
          </motion.div>
        ))}
      </div>

      {/* footer */}
      <button className="flex items-center justify-center gap-1.5 border-t border-black/[0.06] py-3 text-xs font-medium text-slate-500 transition-colors hover:text-vea-emerald">
        查看全部价值链 View full value chain
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </section>
  );
}
