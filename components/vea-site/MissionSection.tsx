"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CHAIN = [
  { en: "Idea", zh: "想法" },
  { en: "Technology", zh: "技术" },
  { en: "Product", zh: "产品" },
  { en: "Market", zh: "市场" },
  { en: "Value", zh: "商业价值" },
];

// Accelerating cadence: gaps between activations shrink toward the end,
// so the chain visibly "speeds up" from idea to realized value.
const STEP_DELAY = [0, 1.15, 1.7, 2.1, 2.4];
const LOOP = 3.8; // total period (s)

export default function MissionSection() {
  return (
    <section
      id="mission"
      className="relative flex h-[100dvh] snap-start snap-always flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* ambient */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 50%, rgba(45,212,160,0.08) 0%, transparent 60%), radial-gradient(50% 40% at 85% 90%, rgba(124,156,255,0.06) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 w-full max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.6 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-vea-neon/25 bg-vea-neon/[0.06] px-4 py-1.5 text-xs font-medium tracking-wide text-vea-neon/90"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-vea-neon" />
          使命 · Our Mission
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.6 }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="text-balance text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl"
        >
          From idea to business —{" "}
          <span className="neon-text">accelerated.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.6 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="mx-auto mt-6 max-w-2xl text-balance text-base leading-relaxed text-white/55 sm:text-lg"
        >
          Every breakthrough stalls in the gap between invention and income. VEA
          computes the shortest path across the entire value chain — compressing
          the distance from a raw idea to a monetized business, and moving faster
          than the market can react.
        </motion.p>

        {/* acceleration chain */}
        <div className="relative mx-auto mt-14 w-full max-w-3xl">
          {/* base track */}
          <div className="absolute inset-x-0 top-2 h-px bg-white/10" />
          {/* accelerating comet sweeping the chain */}
          <motion.div
            className="absolute top-2 h-[3px] w-32 -translate-y-1/2 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(45,212,160,0.9), transparent)",
              filter: "blur(1px)",
            }}
            initial={{ left: "-12%" }}
            animate={{ left: ["-12%", "112%"] }}
            transition={{
              duration: 2.4,
              ease: "easeIn",
              repeat: Infinity,
              repeatDelay: LOOP - 2.4,
            }}
          />

          <div className="relative flex justify-between">
            {CHAIN.map((node, i) => (
              <div key={node.en} className="flex flex-col items-center">
                <motion.span
                  className="h-4 w-4 rounded-full bg-white/15"
                  animate={{
                    backgroundColor: [
                      "rgba(255,255,255,0.15)",
                      "rgba(45,212,160,1)",
                      "rgba(255,255,255,0.15)",
                    ],
                    boxShadow: [
                      "0 0 0px rgba(45,212,160,0)",
                      "0 0 16px rgba(45,212,160,0.8)",
                      "0 0 0px rgba(45,212,160,0)",
                    ],
                    scale: [1, 1.35, 1],
                  }}
                  transition={{
                    duration: 0.6,
                    delay: STEP_DELAY[i],
                    repeat: Infinity,
                    repeatDelay: LOOP - 0.6,
                    ease: "easeOut",
                  }}
                />
                <span className="mt-4 text-sm font-medium text-white/80">
                  {node.en}
                </span>
                <span className="mt-0.5 text-[11px] text-white/35">{node.zh}</span>
              </div>
            ))}
          </div>
        </div>

        {/* zh manifesto + cta */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-14 max-w-2xl text-balance text-sm leading-relaxed text-white/40"
        >
          我们的使命：加速价值链的实现 —— 让每一个想法，以最短的路径，
          成为真正的商业与价值。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.6 }}
          transition={{ duration: 0.5, delay: 0.28 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            href="/app"
            className="group inline-flex items-center gap-2 rounded-full bg-vea-neon px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.03] active:scale-95"
          >
            Enter the Beta
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <span className="text-xs text-white/35">
            The distance from idea to value is a computation — we make it shorter.
          </span>
        </motion.div>
      </div>
    </section>
  );
}
