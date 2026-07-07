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
  },
  {
    en: "Validates every result against markets, outcomes, and capital.",
  },
  {
    en: "Shows your position in the value chain — and where it is heading.",
  },
  {
    en: "Delivers the result. The computation stays inside the engine.",
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
      {/* SECTION 1 — hero */}
      <section className="relative flex min-h-[100dvh] snap-start snap-always flex-col overflow-hidden px-4 pb-14 pt-[env(safe-area-inset-top)] text-center sm:px-6">
        {/* hero nav — scrolls away with this section (no overlap on mission) */}
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-20 shrink-0"
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between py-4 sm:py-5">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-md border border-vea-neon/30 bg-vea-neon/10 text-sm font-bold text-vea-neon sm:h-9 sm:w-9 sm:text-base">
                V
              </span>
              <span className="text-2xl font-semibold tracking-tight text-white sm:text-[1.7rem]">
                VEA
              </span>
              <span className="hidden rounded bg-white/[0.08] px-1.5 py-0.5 text-sm text-white/38 md:inline">
                Technical Asset Monetization Engine
              </span>
            </div>
            <div className="flex items-center gap-1 sm:gap-1.5">
              <Link
                href="/app"
                className="group inline-flex items-center gap-1 rounded-full border border-vea-neon/30 bg-vea-neon/10 px-2.5 py-1.5 text-[11px] font-medium text-vea-neon transition-colors hover:bg-vea-neon/15 sm:gap-1.5 sm:px-4 sm:py-2 sm:text-xs"
              >
                <span className="hidden sm:inline">Try the Beta</span>
                <span className="sm:hidden">Beta</span>
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 sm:h-3.5 sm:w-3.5" />
              </Link>
            </div>
          </div>
        </motion.header>
        {/* ambient */}
        <div className="pointer-events-none absolute inset-0 engine-glow" />
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-50" />
        <EngineCore />
        <div className="pointer-events-none absolute inset-0 vignette" />

        {/* center content */}
        <div className="relative z-10 mx-auto flex w-full max-w-5xl translate-y-8 flex-col items-center justify-center pb-12 pt-16 sm:translate-y-12 sm:pb-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-vea-neon/25 bg-vea-neon/[0.06] px-3 py-1 text-[10px] font-medium tracking-wide text-vea-neon/90 backdrop-blur sm:mb-7 sm:px-4 sm:py-1.5 sm:text-xs"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-vea-neon opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-vea-neon" />
          </span>
          <span className="hidden sm:inline">7&times;24 Continuous Computation · ONLINE</span>
          <span className="sm:hidden">7×24 · ONLINE</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
          className="max-w-5xl text-balance text-[2.35rem] font-semibold leading-[1.04] tracking-tight sm:text-7xl md:text-8xl"
        >
          Compute the value of technology{" "}
          <span className="neon-text">in time.</span>
        </motion.h1>

        {/* cycling value prop */}
        <div className="mt-4 flex h-14 max-w-xl items-start justify-center sm:mt-7 sm:h-16">
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
            </motion.div>
          </AnimatePresence>
        </div>

        {/* live counters */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-4 flex items-center gap-5 sm:mt-6 sm:gap-8"
        >
          {METRICS.map((m) => (
            <div key={m.label} className="text-center">
              <p
                className={`font-mono text-xl font-semibold sm:text-3xl ${
                  m.live ? "text-vea-amber-soft" : "text-vea-neon"
                }`}
              >
                <Counter value={m.value} live={m.live} />
              </p>
              <p className="mt-0.5 text-[10px] uppercase tracking-wide text-white/35 sm:text-[11px]">
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
          className="mt-6 flex w-full max-w-xs flex-col items-stretch gap-2.5 sm:mt-10 sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-3"
        >
          <Link
            href="/app"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-vea-neon px-5 py-2.5 text-sm font-semibold text-black transition-transform hover:scale-[1.03] active:scale-95 sm:px-6 sm:py-3"
          >
            <span className="hidden sm:inline">Beta available — start computing</span>
            <span className="sm:hidden">Start computing</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/cases"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/70 backdrop-blur transition-colors hover:border-white/30 hover:text-white sm:px-6 sm:py-3"
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
          className="group absolute bottom-[3.25rem] left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-[10px] font-medium uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-vea-neon sm:bottom-16 sm:text-[11px]"
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
