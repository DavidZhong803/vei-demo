"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import EngineCore from "./EngineCore";
import Counter from "./Counter";
import MissionSection from "./MissionSection";

const TAGLINES = [
  {
    en: "Computes the optimal path to monetize technology within a time window.",
    zh: "计算技术在特定时间窗口内的最优货币化路径。",
  },
  {
    en: "Validates every result against markets, outcomes, and capital.",
    zh: "以市场、商业结果与资本市场持续验证每一个结果。",
  },
  {
    en: "Shows your position in the value chain — and where it is heading.",
    zh: "呈现你在产业价值链中的位置，以及未来的演化方向。",
  },
  {
    en: "Delivers the result. The computation stays inside the engine.",
    zh: "只交付结果。复杂计算留在引擎内部。",
  },
];

const METRICS = [
  { label: "Nodes", value: 128, live: false },
  { label: "Models", value: 36, live: false },
  { label: "Events / h", value: 23674, live: true },
];

const STREAM = [
  "AI Semiconductor · HBM — probability updated",
  "Cloud Infrastructure · CapEx — path recalculated",
  "Energy Storage · Materials — signal detected",
  "Optical Interconnect — position shift up",
  "Biotech · Regenerative — event probability updated",
  "Robotics · Humanoid — strategy optimized",
  "Advanced Packaging — validation confirmed",
];

export default function EngineLanding() {
  const [tag, setTag] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setTag((t) => (t + 1) % TAGLINES.length), 3800);
    return () => clearInterval(iv);
  }, []);

  return (
    <main className="relative h-[100dvh] snap-y snap-mandatory overflow-y-auto scroll-smooth bg-ink text-white">
      {/* top bar (fixed across sections) */}
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-x-0 top-0 z-30"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-2.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-md border border-vea-neon/30 bg-vea-neon/10 text-[11px] font-bold text-vea-neon">
              V
            </span>
            <span className="text-sm font-semibold tracking-tight text-white/90">
              VEA
            </span>
            <span className="hidden text-xs text-white/35 md:inline">
              Technical Monetization Computational Framework
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Link
              href="/cases"
              className="rounded-full px-4 py-2 text-xs font-medium text-white/60 transition-colors hover:text-white"
            >
              Cases
            </Link>
            <Link
              href="/app"
              className="group inline-flex items-center gap-1.5 rounded-full border border-vea-neon/30 bg-vea-neon/10 px-4 py-2 text-xs font-medium text-vea-neon transition-colors hover:bg-vea-neon/15"
            >
              Try the Beta
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </motion.header>

      {/* SECTION 1 — hero */}
      <section className="relative flex h-[100dvh] snap-start snap-always flex-col items-center justify-center overflow-hidden px-6 text-center">
        {/* ambient */}
        <div className="pointer-events-none absolute inset-0 engine-glow" />
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-50" />
        <EngineCore />
        <div className="pointer-events-none absolute inset-0 vignette" />

        {/* center content */}
        <div className="relative z-10 flex w-full max-w-4xl flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-vea-neon/25 bg-vea-neon/[0.06] px-4 py-1.5 text-xs font-medium tracking-wide text-vea-neon/90 backdrop-blur"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-vea-neon opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-vea-neon" />
          </span>
          7&times;24 Continuous Computation · ONLINE
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
          className="max-w-4xl text-balance text-5xl font-semibold leading-[1.04] tracking-tight sm:text-6xl md:text-7xl"
        >
          Compute the value of technology{" "}
          <span className="neon-text">in time.</span>
        </motion.h1>

        {/* cycling value prop */}
        <div className="mt-7 flex h-16 max-w-xl items-start justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={tag}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <p className="text-balance text-base leading-relaxed text-white/60 sm:text-lg">
                {TAGLINES[tag].en}
              </p>
              <p className="mt-1 text-balance text-xs leading-relaxed text-white/30">
                {TAGLINES[tag].zh}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* live counters */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 flex items-center gap-8"
        >
          {METRICS.map((m) => (
            <div key={m.label} className="text-center">
              <p className="font-mono text-2xl font-semibold text-vea-neon sm:text-3xl">
                <Counter value={m.value} live={m.live} />
              </p>
              <p className="mt-0.5 text-[11px] uppercase tracking-wide text-white/35">
                {m.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Link
            href="/app"
            className="group inline-flex items-center gap-2 rounded-full bg-vea-neon px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.03] active:scale-95"
          >
            Beta available — start computing
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/cases"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white/70 backdrop-blur transition-colors hover:border-white/30 hover:text-white"
          >
            Explore cases
          </Link>
        </motion.div>
        </div>

        {/* scroll cue */}
        <motion.a
          href="#mission"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="group absolute bottom-16 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-[11px] font-medium uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-vea-neon"
        >
          Mission
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.span>
        </motion.a>

        {/* bottom live ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="absolute inset-x-0 bottom-0 z-10 border-t border-white/[0.06] bg-black/20 py-3 backdrop-blur-sm"
        >
          <div className="flex items-center gap-3 px-6 text-[11px] text-white/40">
            <span className="flex shrink-0 items-center gap-1.5 font-medium uppercase tracking-wide text-vea-neon/80">
              <span className="h-1.5 w-1.5 rounded-full bg-vea-neon" />
              Live
            </span>
            <div className="relative flex-1 overflow-hidden">
              <div className="flex w-max animate-marquee gap-10 font-mono whitespace-nowrap">
                {[...STREAM, ...STREAM].map((s, i) => (
                  <span key={i} className="text-white/45">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 2 — mission */}
      <MissionSection />
    </main>
  );
}
