"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CASES } from "@/lib/cases";
import Reveal from "./Reveal";

export default function CasesPreview() {
  return (
    <section className="relative px-6 py-28 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-4 text-center text-xs uppercase tracking-[0.25em] text-white/35">
            See it decide
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mx-auto max-w-3xl text-balance text-center text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Watch the super brain think through a{" "}
            <span className="gradient-text">real value subject.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-xl text-balance text-center text-base leading-relaxed text-white/45">
            Pick a case and watch VEI reason, decide, and keep optimizing — live.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {CASES.map((c, i) => (
            <Reveal key={c.id} delay={0.1 + i * 0.08}>
              <Link href={`/demo?case=${c.id}`} className="block h-full">
                <motion.div
                  whileHover={{ y: -6 }}
                  className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-white/25"
                >
                  <div
                    className="absolute inset-x-0 top-0 h-px opacity-70"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${c.accent}, transparent)`,
                    }}
                  />
                  <div className="flex items-center justify-between">
                    <span
                      className="text-xl font-semibold"
                      style={{ color: c.accent }}
                    >
                      {c.name}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-white/30 transition-all group-hover:text-white/70" />
                  </div>
                  <p className="mt-1 text-[11px] uppercase tracking-wide text-white/30">
                    {c.kind}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-white/50">
                    {c.tagline}
                  </p>
                </motion.div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-12 flex justify-center">
            <Link
              href="/demo"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.03] active:scale-95"
            >
              Or upload your own value subject
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
