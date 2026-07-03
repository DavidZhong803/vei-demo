"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";

const CHAIN = [
  { label: "Time", desc: "Read the moment — where the S-curve is." },
  { label: "Event", desc: "Detect what just changed in the world." },
  { label: "State", desc: "Know exactly what you have right now." },
  { label: "Position", desc: "Find where you can uniquely win." },
  { label: "Value", desc: "Locate the highest-value path." },
  { label: "Evolution", desc: "Chart how you should evolve into it." },
  { label: "Advantage", desc: "Turn it into a durable moat." },
];

export default function HowItThinks() {
  return (
    <section className="relative px-6 py-28 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-4 text-center text-xs uppercase tracking-[0.25em] text-white/35">
            How the brain reasons
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mx-auto max-w-3xl text-balance text-center text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            A reasoning engine, not a chatbot.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-xl text-balance text-center text-base leading-relaxed text-white/45">
            Every decision runs through the same chain — so the logic is
            transparent, repeatable, and always up to date.
          </p>
        </Reveal>

        <div className="mt-16">
          <div className="flex flex-col gap-3 md:flex-row md:items-stretch md:gap-2">
            {CHAIN.map((node, i) => (
              <motion.div
                key={node.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.09,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative flex-1"
              >
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="mb-3 flex h-7 w-7 items-center justify-center rounded-full border border-vei-accent/40 text-[11px] font-semibold text-vei-accent">
                    {i + 1}
                  </div>
                  <p className="text-sm font-semibold text-white">
                    {node.label}
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-white/45">
                    {node.desc}
                  </p>
                </div>
                {i < CHAIN.length - 1 && (
                  <div className="pointer-events-none absolute right-[-6px] top-1/2 z-10 hidden h-px w-3 -translate-y-1/2 bg-white/20 md:block" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
