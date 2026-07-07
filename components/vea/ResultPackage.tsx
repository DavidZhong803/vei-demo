"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  Circle,
  Clock,
  Compass,
  Flag,
  Gauge,
  Loader2,
  RotateCcw,
  Route,
  ShieldCheck,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Minus,
} from "lucide-react";
import type {
  Outlook,
  VEAResultPackage,
  ValidationItem,
} from "@/lib/vea";

const cardIn = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
};

function Card({
  index,
  label,
  icon,
  children,
  className = "",
}: {
  index: number;
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      custom={index}
      variants={cardIn}
      initial="hidden"
      animate="show"
      className={`paper-card rounded-2xl p-6 ${className}`}
    >
      <div className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-slate-400">
        <span className="text-vea-emerald">{icon}</span>
        {label}
      </div>
      {children}
    </motion.div>
  );
}

const OUTLOOK_META: Record<
  Outlook,
  { icon: React.ReactNode; tone: string }
> = {
  Acceleration: {
    icon: <TrendingUp className="h-4 w-4" />,
    tone: "text-vea-emerald bg-vea-emerald/10",
  },
  Stable: {
    icon: <Minus className="h-4 w-4" />,
    tone: "text-amber-600 bg-amber-500/10",
  },
  Deceleration: {
    icon: <TrendingDown className="h-4 w-4" />,
    tone: "text-rose-500 bg-rose-500/10",
  },
};

const STRENGTH_TONE: Record<ValidationItem["strength"], string> = {
  Strong: "text-vea-emerald bg-vea-emerald/10",
  Moderate: "text-amber-600 bg-amber-500/10",
  Emerging: "text-slate-500 bg-slate-500/10",
};

const EVENT_TONE = {
  Done: "text-vea-emerald bg-vea-emerald/10",
  "In Progress": "text-amber-600 bg-amber-500/10",
  Upcoming: "text-slate-500 bg-slate-400/10",
} as const;

export default function ResultPackage({
  data,
  onRestart,
}: {
  data: VEAResultPackage;
  onRestart: () => void;
}) {
  const outlook = OUTLOOK_META[data.outlook.trend];

  return (
    <motion.div
      key="result"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="mx-auto w-full max-w-5xl px-6 py-16"
    >
      {/* header */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-vea-emerald/20 bg-vea-emerald/[0.06] px-3.5 py-1.5 text-xs font-medium text-vea-emerald">
            <Sparkles className="h-3.5 w-3.5" />
            Technical Asset Monetization Result Package
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {data.subject}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {data.kind} · computed {data.computedAt}
          </p>
        </div>
        <button
          onClick={onRestart}
          className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm text-slate-600 transition-colors hover:border-black/20 hover:text-slate-900"
        >
          <RotateCcw className="h-4 w-4" />
          Compute another
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Card 1 — Executive Summary (full width) */}
        <Card
          index={0}
          label="Executive Summary"
          icon={<Flag className="h-4 w-4" />}
          className="md:col-span-2 lg:col-span-3"
        >
          <p className="text-lg font-medium leading-relaxed text-slate-800">
            {data.executiveSummary}
          </p>
        </Card>

        {/* Card 2 — Current Position */}
        <Card
          index={1}
          label="Current Position"
          icon={<Compass className="h-4 w-4" />}
        >
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-semibold text-slate-900">
              {data.currentPosition.rank}
            </span>
            <span className="text-xs font-medium text-vea-emerald">
              {data.currentPosition.percentile}
            </span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">
            {data.currentPosition.statement}
          </p>
        </Card>

        {/* Card 3 — Time Window */}
        <Card
          index={2}
          label="Time Window"
          icon={<Clock className="h-4 w-4" />}
        >
          <div className="flex flex-col gap-2">
            {data.timeWindows.map((w) => (
              <div
                key={w.span}
                className={`rounded-lg border px-3 py-2 ${
                  w.emphasis
                    ? "border-vea-emerald/40 bg-vea-emerald/[0.06]"
                    : "border-black/[0.06] bg-black/[0.02]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-sm font-semibold ${
                      w.emphasis ? "text-vea-emerald" : "text-slate-700"
                    }`}
                  >
                    {w.label}
                  </span>
                  {w.emphasis && (
                    <span className="text-[10px] font-medium uppercase tracking-wide text-vea-emerald">
                      Focus
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-xs leading-snug text-slate-500">
                  {w.focus}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Card 4 — Best Strategy */}
        <Card
          index={3}
          label="Best Strategy"
          icon={<Route className="h-4 w-4" />}
        >
          <p className="text-base font-semibold leading-snug text-slate-900">
            {data.bestStrategy.headline}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-500">
            {data.bestStrategy.detail}
          </p>
        </Card>

        {/* Card 5 — Key Events */}
        <Card
          index={4}
          label="Key Events"
          icon={<Flag className="h-4 w-4" />}
        >
          <div className="flex flex-col gap-3">
            {data.keyEvents.map((e) => (
              <div key={e.title} className="flex items-start gap-3">
                <span className="mt-0.5 font-mono text-xs text-slate-400">
                  {e.date}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-800">
                    {e.title}
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <span
                      className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${EVENT_TONE[e.status]}`}
                    >
                      {e.status}
                    </span>
                    <span className="text-xs text-slate-400">
                      {e.probability}% prob.
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Card 6 — Monetization Outlook */}
        <Card
          index={5}
          label="Monetization Outlook"
          icon={<Gauge className="h-4 w-4" />}
        >
          <div
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold ${outlook.tone}`}
          >
            {outlook.icon}
            {data.outlook.trend}
          </div>
          <div className="mt-4">
            <div className="h-2 w-full overflow-hidden rounded-full bg-black/[0.06]">
              <motion.div
                className="h-full rounded-full bg-vea-emerald"
                initial={{ width: 0 }}
                animate={{ width: `${data.outlook.momentum}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
            <p className="mt-1 text-right font-mono text-xs text-slate-400">
              momentum {data.outlook.momentum}
            </p>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            {data.outlook.detail}
          </p>
        </Card>

        {/* Card 7 — Validation */}
        <Card
          index={6}
          label="Validation"
          icon={<ShieldCheck className="h-4 w-4" />}
        >
          <div className="flex flex-col gap-3">
            {data.validation.map((v) => (
              <div key={v.channel}>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-700">
                    {v.channel}
                  </span>
                  <span
                    className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${STRENGTH_TONE[v.strength]}`}
                  >
                    {v.strength}
                  </span>
                </div>
                <p className="mt-0.5 text-xs leading-snug text-slate-500">
                  {v.verdict}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Card 8 — Position Evolution */}
        <Card
          index={7}
          label="Position Evolution"
          icon={<TrendingUp className="h-4 w-4" />}
          className="md:col-span-2"
        >
          <div className="flex flex-wrap items-center gap-2">
            {data.positionEvolution.steps.map((s, i) => (
              <div key={s.label} className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium ${
                    s.state === "current"
                      ? "border-vea-emerald/40 bg-vea-emerald/10 text-vea-emerald"
                      : s.state === "past"
                        ? "border-black/10 bg-black/[0.03] text-slate-400"
                        : "border-black/10 bg-white text-slate-600"
                  }`}
                >
                  {s.state === "current" ? (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  ) : (
                    <Circle className="h-3 w-3" />
                  )}
                  {s.label}
                </span>
                {i < data.positionEvolution.steps.length - 1 && (
                  <ArrowUpRight className="h-3.5 w-3.5 rotate-45 text-slate-300" />
                )}
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-500">
            {data.positionEvolution.detail}
          </p>
        </Card>

        {/* Card 9 — Recommended Actions */}
        <Card
          index={8}
          label="Recommended Actions"
          icon={<Sparkles className="h-4 w-4" />}
        >
          <div className="flex flex-col gap-3">
            {data.recommendedActions.map((a, i) => (
              <div key={a.title} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-vea-emerald/10 text-[11px] font-semibold text-vea-emerald">
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-medium text-slate-800">
                    {a.title}
                  </p>
                  <p className="mt-0.5 text-xs leading-snug text-slate-500">
                    {a.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* footer */}
      <div className="mt-10 flex flex-col items-center gap-4 border-t border-black/[0.06] pt-8 text-center">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Loader2 className="h-3.5 w-3.5 animate-spin text-vea-emerald" />
          VEA keeps recomputing this result as markets, results, and capital move.
        </div>
        <p className="text-xs text-slate-400">
          Mock data for illustration only · Not investment advice.
        </p>
        <Link
          href="/cases"
          className="text-sm font-medium text-vea-emerald transition-colors hover:text-vea-emerald-soft"
        >
          Explore more computed cases →
        </Link>
      </div>
    </motion.div>
  );
}
