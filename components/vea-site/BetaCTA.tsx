"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

export default function BetaCTA() {
  return (
    <section className="relative px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-vea-neon/25 bg-vea-neon/[0.06] px-4 py-1.5 text-xs font-medium text-vea-neon/90">
            <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-vea-neon" />
            Beta available
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-balance text-4xl font-semibold leading-[1.12] tracking-tight sm:text-5xl md:text-6xl">
            Compute your first result in{" "}
            <span className="neon-text">30 seconds.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-7 max-w-xl text-balance text-base leading-relaxed text-white/45">
            Enter a value subject — a company, a technology, a patent, a
            document. VEA computes and delivers the Result Package.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10 flex justify-center">
            <Link
              href="/app"
              className="group inline-flex items-center gap-2 rounded-full bg-vea-neon px-7 py-3.5 text-sm font-semibold text-black transition-transform hover:scale-[1.03] active:scale-95"
            >
              Enter the Beta
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
