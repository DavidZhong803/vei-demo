"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MissionSection from "./MissionSection";

export default function SimpleLanding() {
  return (
    <main className="relative min-h-[100dvh] overflow-x-hidden bg-[#04100b] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(42%_32%_at_52%_16%,rgba(245,166,35,0.10),transparent_70%),radial-gradient(44%_38%_at_52%_88%,rgba(45,212,160,0.10),transparent_72%)]" />
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.16]" />

      <header className="relative z-10 mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-2.5 sm:gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-vea-neon/30 bg-vea-neon/10 text-sm font-bold text-vea-neon sm:h-9 sm:w-9 sm:text-base">
            V
          </span>
          <span className="text-2xl font-semibold tracking-tight text-white sm:text-[1.7rem]">
            VEA
          </span>
          <span className="hidden rounded bg-vea-amber/[0.10] px-2 py-1 text-sm font-medium text-vea-amber-soft/90 md:inline">
            Technical Asset Monetization Engine
          </span>
        </Link>

        <nav className="flex items-center gap-2">
          <Link
            href="/app"
            className="group inline-flex items-center gap-2 rounded-md border border-vea-neon/25 bg-vea-neon/[0.08] px-3 py-2 text-sm font-medium text-vea-neon transition-colors hover:bg-vea-neon/[0.12] sm:px-4"
          >
            Try the Beta
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </nav>
      </header>

      <section className="relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] max-w-4xl flex-col items-center justify-center px-5 pb-12 pt-8 text-center sm:min-h-[calc(100dvh-4rem)] sm:pb-20">
        <p className="mb-4 text-base font-semibold tracking-[0.12em] text-vea-amber-soft sm:text-lg">
          Technical Asset Monetization Engine
        </p>
        <h1 className="max-w-3xl text-balance text-[2.15rem] font-semibold leading-[1.06] tracking-tight text-white/84 sm:text-5xl md:text-[3.6rem]">
          Compute the value of technology in time.
        </h1>
        <p className="mt-5 max-w-xl text-balance text-sm leading-6 text-white/46 sm:text-base sm:leading-7">
          VEA turns market structure, technical assets, and timing windows into
          a clear monetization path.
        </p>

        <div className="mt-8 flex w-full max-w-sm flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row">
          <Link
            href="/app"
            className="group inline-flex items-center justify-center gap-2 rounded-md bg-vea-neon px-5 py-3 text-sm font-semibold text-[#06110d] transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Start computing
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/cases"
            className="inline-flex items-center justify-center rounded-md border border-white/[0.12] bg-white/[0.04] px-5 py-3 text-sm font-medium text-white/62 transition-colors hover:text-white"
          >
            Explore cases
          </Link>
        </div>
      </section>

      <MissionSection />
    </main>
  );
}
