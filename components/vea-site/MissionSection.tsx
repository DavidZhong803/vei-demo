"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CHAIN = [
  { en: "Technical Asset", mobile: "Asset" },
  { en: "Validation", mobile: "Validate" },
  { en: "Productization", mobile: "Productize" },
  { en: "Market", mobile: "Launch" },
  { en: "Monetization", mobile: "Monetize" },
];

const STEP_DELAY = [0, 1.15, 1.7, 2.1, 2.4];
const LOOP = 3.8;

export default function MissionSection() {
  return (
    <section
      id="mission"
      className="relative flex flex-col items-center justify-center overflow-visible px-4 py-16 pt-[env(safe-area-inset-top)] sm:min-h-[92dvh] sm:overflow-hidden sm:px-6 sm:py-20"
    >
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-10" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 50%, rgba(124,156,255,0.075) 0%, transparent 62%), radial-gradient(44% 38% at 88% 88%, rgba(174,197,234,0.05) 0%, transparent 70%), radial-gradient(42% 34% at 8% 94%, rgba(86,111,162,0.045) 0%, transparent 72%)",
        }}
      />

      <div className="relative z-10 w-full max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="mb-4 inline-flex items-center gap-2 border-l-2 border-vea-steel/75 bg-vea-steel/[0.065] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#bfd2f2] sm:mb-6 sm:px-4 sm:py-1.5 sm:text-xs"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-vea-steel/85" />
          Our Mission
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="text-balance text-[1.62rem] font-semibold leading-[1.16] tracking-tight text-white/88 sm:text-4xl md:text-5xl"
        >
          Accelerate technical assets into{" "}
          <span className="text-vea-mist/90">monetized value.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="mx-auto mt-4 max-w-2xl text-balance text-sm leading-7 text-white/66 sm:mt-5 sm:text-base"
        >
          The hardest step in technology is not invention — it is monetization.
          VEA computes the shortest, highest-probability path from a technical
          asset to realized value — moving faster than the market can react.
        </motion.p>

        <div className="mx-auto mt-8 grid w-full max-w-sm gap-2.5 text-left sm:hidden">
          {CHAIN.map((node, i) => (
            <div
              key={node.en}
              className="metal-card flex items-center gap-3 rounded-lg px-3 py-3"
            >
              <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md border text-xs font-semibold ${
                i >= 2
                  ? "border-vea-steel/28 bg-vea-steel/[0.09] text-[#bfd2f2]"
                  : "border-vea-steel/28 bg-vea-steel/[0.08] text-vea-mist"
              }`}>
                {i + 1}
              </span>
              <span className="min-w-0 text-sm font-medium text-white/82">
                {node.mobile}
              </span>
            </div>
          ))}
        </div>

        {/* acceleration chain — timeline on larger screens */}
        <div className="relative mx-auto mt-8 hidden w-full sm:mt-12 sm:block sm:max-w-3xl">
          <div className="absolute inset-x-4 top-2 h-px bg-white/10 sm:inset-x-0" />
          <motion.div
            className="absolute top-2 h-[3px] w-24 -translate-y-1/2 rounded-full sm:w-32"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(245,166,35,0.55), transparent)",
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

          {/* mobile: scrollable row */}
          <div className="relative -mx-1 flex justify-between gap-1 overflow-x-auto px-1 pb-1 sm:mx-0 sm:gap-0 sm:overflow-visible sm:px-0">
            {CHAIN.map((node, i) => (
              <div
                key={node.en}
                className="flex min-w-[4.5rem] shrink-0 flex-col items-center sm:min-w-0 sm:flex-1"
              >
                <motion.span
                  className="h-3.5 w-3.5 rounded-full bg-white/15 sm:h-4 sm:w-4"
                  animate={{
                    backgroundColor: [
                      "rgba(255,255,255,0.15)",
                      "rgba(124,156,255,1)",
                      "rgba(255,255,255,0.15)",
                    ],
                    boxShadow: [
                      "0 0 0px rgba(124,156,255,0)",
                      "0 0 10px rgba(124,156,255,0.45)",
                      "0 0 0px rgba(124,156,255,0)",
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
                <span className="mt-3 text-[11px] font-medium text-white/80 sm:mt-4 sm:text-sm">
                  <span className="sm:hidden">{node.mobile}</span>
                  <span className="hidden sm:inline">{node.en}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-8 hidden max-w-2xl text-balance text-xs leading-6 text-white/58 sm:mt-12 sm:block sm:text-sm"
        >
          Our mission is to accelerate the monetization of technical assets,
          helping each technology become real business value through the
          shortest path and the highest probability.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.28 }}
          className="mt-6 flex flex-col items-center justify-center gap-3 sm:mt-8 sm:flex-row"
        >
          <Link
            href="/app"
            className="group inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-md bg-vea-steel px-6 py-3 text-sm font-semibold text-[#071019] transition-colors hover:bg-vea-mist sm:w-auto"
          >
            Enter the Beta
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <span className="max-w-xs text-[11px] text-white/56 sm:max-w-none sm:text-xs">
            The distance from a technical asset to value is a computation — we
            make it shorter.
          </span>
        </motion.div>
      </div>
    </section>
  );
}
