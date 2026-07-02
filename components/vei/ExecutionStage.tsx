"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Clock,
  Radar,
  RotateCcw,
  Route,
  Target,
} from "lucide-react";
import type { ContinuousSignal, VEICase } from "@/lib/cases";

const CHANNEL_COLORS: Record<ContinuousSignal["channel"], string> = {
  Market: "#5eead4",
  Technology: "#7c9cff",
  "Business Model": "#a78bfa",
  Competition: "#f0abfc",
  Capital: "#fbbf24",
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export default function ExecutionStage({
  data,
  onRestart,
}: {
  data: VEICase;
  onRestart: () => void;
}) {
  const exec = data.execution;

  // Continuous optimization: append signals over time, cycling forever.
  const [feed, setFeed] = useState<{ id: number; signal: ContinuousSignal }[]>(
    []
  );
  useEffect(() => {
    let n = 0;
    const push = () => {
      const signal = data.continuous[n % data.continuous.length];
      setFeed((prev) => [{ id: n, signal }, ...prev].slice(0, 5));
      n += 1;
    };
    push();
    const iv = setInterval(push, 4200);
    return () => clearInterval(iv);
  }, [data.continuous]);

  return (
    <motion.div
      key="execution"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(6px)" }}
      transition={{ duration: 0.5 }}
      className="mx-auto w-full max-w-5xl px-6 py-20"
    >
      <div className="mb-10 flex flex-col items-center text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/60">
          <span
            className="h-1.5 w-1.5 animate-pulse-glow rounded-full"
            style={{ background: data.accent }}
          />
          Execution Plan · {data.name}
        </div>
        <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          The best value path — with actions, not just analysis
        </h2>
      </div>

      {/* Hero path card */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="glass-strong relative overflow-hidden rounded-3xl p-8"
      >
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${data.accent}, transparent)`,
          }}
        />
        <div className="grid gap-8 md:grid-cols-2">
          <motion.div variants={item}>
            <p className="text-xs uppercase tracking-[0.2em] text-white/30">
              Current Value Subject
            </p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {exec.valueSubject}
            </p>
            <div className="mt-6 flex items-start gap-3">
              <Route className="mt-1 h-5 w-5" style={{ color: data.accent }} />
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-white/30">
                  Best Value Path
                </p>
                <p
                  className="mt-1 text-xl font-semibold"
                  style={{ color: data.accent }}
                >
                  {exec.bestPath}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={item} className="grid grid-cols-2 gap-4">
            <InfoTile
              icon={<Clock className="h-4 w-4" />}
              label="Time Window"
              value={exec.timeWindow}
              accent={data.accent}
            />
            <InfoTile
              icon={<Target className="h-4 w-4" />}
              label="Business Model"
              value={exec.businessModel}
              accent={data.accent}
            />
            {exec.metrics.map((m) => (
              <InfoTile
                key={m.label}
                label={m.label}
                value={m.value}
                sub={m.sub}
                accent={data.accent}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Recommended actions */}
      <div className="mt-10">
        <p className="mb-4 text-xs uppercase tracking-[0.2em] text-white/30">
          Recommended Actions
        </p>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-3 sm:grid-cols-2"
        >
          {exec.actions.map((a, i) => (
            <motion.div
              variants={item}
              key={a.title}
              className="group flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-white/20"
            >
              <span
                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold"
                style={{ background: `${data.accent}22`, color: data.accent }}
              >
                {i + 1}
              </span>
              <div>
                <p className="text-sm font-medium text-white">{a.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-white/45">
                  {a.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Continuous optimization — the "always working" section */}
      <div className="mt-12 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                style={{ background: data.accent }}
              />
              <span
                className="relative inline-flex h-2.5 w-2.5 rounded-full"
                style={{ background: data.accent }}
              />
            </span>
            <h3 className="text-base font-semibold text-white">
              Continuous Optimization
            </h3>
            <span className="text-xs text-white/40">持续优化 · Live</span>
          </div>
          <Radar className="h-4 w-4 animate-pulse-glow text-white/40" />
        </div>
        <p className="mt-2 text-xs leading-relaxed text-white/45">
          The agent never stops. It keeps monitoring the market, technology,
          business model, competition and capital — and updates your best value
          path the moment a better one appears.
        </p>

        <div className="mt-5 flex flex-col gap-2">
          <AnimatePresence initial={false}>
            {feed.map(({ id, signal }) => (
              <motion.div
                key={id}
                layout
                initial={{ opacity: 0, y: -10, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-2.5"
              >
                <span
                  className="rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                  style={{
                    color: CHANNEL_COLORS[signal.channel],
                    background: `${CHANNEL_COLORS[signal.channel]}1a`,
                  }}
                >
                  {signal.channel}
                </span>
                <span className="text-xs text-white/70">{signal.message}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <button
          onClick={onRestart}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm text-white/70 transition-colors hover:border-white/30 hover:text-white"
        >
          <RotateCcw className="h-4 w-4" />
          Try another value subject
        </button>
      </div>
    </motion.div>
  );
}

function InfoTile({
  icon,
  label,
  value,
  sub,
  accent,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  accent: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-center gap-1.5 text-white/40">
        {icon && <span style={{ color: accent }}>{icon}</span>}
        <p className="text-[10px] uppercase tracking-[0.15em]">{label}</p>
      </div>
      <p className="mt-1.5 text-lg font-semibold leading-tight text-white">
        {value}
      </p>
      {sub && <p className="mt-0.5 text-[11px] text-white/35">{sub}</p>}
    </div>
  );
}
