"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-24 text-center">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8 inline-flex items-center gap-2 rounded-full border border-vea-neon/25 bg-vea-neon/[0.06] px-4 py-1.5 text-xs font-medium tracking-wide text-vea-neon/90"
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-vea-neon opacity-70" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-vea-neon" />
        </span>
        7&times;24 Continuous Computation · ONLINE
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18 }}
        className="max-w-4xl text-balance text-5xl font-semibold leading-[1.06] tracking-tight sm:text-6xl md:text-7xl"
      >
        Compute the value of technology <span className="neon-text">in time.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28 }}
        className="mt-7 max-w-2xl text-balance text-lg leading-relaxed text-white/55 sm:text-xl"
      >
        VEA is an AI framework that computes the optimal path to monetize
        technology within a given time window — and keeps validating it against
        markets, results, and capital.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.36 }}
        className="mt-4 max-w-xl text-balance text-sm leading-relaxed text-white/35"
      >
        VEA 是一套基于 AI 的技术货币化计算框架。
        <br />
        计算技术在时间中的价值演化。
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.46 }}
        className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
      >
        <Link
          href="/app"
          className="group inline-flex items-center gap-2 rounded-full bg-vea-neon px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.03] active:scale-95"
        >
          Beta available — start computing
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
        <a
          href="#engine"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white/70 transition-colors hover:border-white/30 hover:text-white"
        >
          See the engine
        </a>
      </motion.div>

      <motion.a
        href="#engine"
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 text-white/30 transition-colors hover:text-white/60"
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="block"
        >
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </motion.a>
    </section>
  );
}
