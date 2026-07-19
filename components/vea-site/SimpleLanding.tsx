"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import MissionSection from "./MissionSection";

export default function SimpleLanding() {
  return (
    <main className="landing-canvas relative min-h-[100dvh] overflow-x-hidden text-white">
      <div className="material-texture pointer-events-none absolute inset-0 opacity-90" />
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.16]" />

      <header className="relative z-10 mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-2.5 sm:gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-vea-steel/30 bg-vea-steel/[0.09] text-sm font-bold text-[#c5d7f3] shadow-[inset_0_1px_rgba(255,255,255,0.07),0_10px_24px_rgba(0,0,0,0.22)] sm:h-9 sm:w-9 sm:text-base">
            V
          </span>
          <span className="text-2xl font-semibold tracking-tight text-white sm:text-[1.7rem]">
            VEA
          </span>
          <span className="hidden rounded border border-vea-steel/16 bg-vea-steel/[0.045] px-2 py-1 text-sm font-medium text-white/64 md:inline">
            Technical Asset Monetization Engine
          </span>
        </Link>

        <nav className="flex items-center gap-2">
          <Link
            href="/app"
            className="group inline-flex items-center gap-2 rounded-md border border-white/[0.14] bg-white/[0.055] px-3 py-2 text-sm font-medium text-white/80 transition-colors hover:border-vea-steel/45 hover:bg-vea-steel/[0.10] hover:text-vea-mist sm:px-4"
          >
            Try the Beta
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </nav>
      </header>

      <section className="relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] max-w-4xl flex-col items-center justify-center px-5 pb-12 pt-8 text-center sm:min-h-[calc(100dvh-4rem)] sm:pb-20">
        <p className="mb-4 border-l-2 border-vea-steel/75 bg-vea-steel/[0.06] px-3 py-1 text-sm font-semibold tracking-[0.12em] text-[#bfd2f2] sm:text-base">
          Technical Asset Monetization Engine
        </p>
        <h1 className="max-w-3xl text-balance text-[2.15rem] font-semibold leading-[1.06] tracking-tight text-white/90 sm:text-5xl md:text-[3.6rem]">
          Turn technical position into{" "}
          <span className="text-vea-mist">commercial leverage.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-balance text-sm leading-6 text-white/66 sm:text-base sm:leading-7">
          VEA connects value-chain position, IP evidence, market timing, and
          counterparties to the most viable route to realized value.
        </p>

        <div className="mt-8 flex w-full max-w-sm flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row">
          <Link
            href="/app"
            className="group inline-flex items-center justify-center gap-2 rounded-md bg-vea-steel px-5 py-3 text-sm font-semibold text-[#071019] shadow-[0_12px_34px_rgba(124,156,255,0.18)] transition-colors hover:bg-vea-mist"
          >
            Start computing
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/cases"
            className="inline-flex items-center justify-center rounded-md border border-vea-steel/22 bg-vea-steel/[0.065] px-5 py-3 text-sm font-medium text-white/76 shadow-[inset_0_1px_rgba(255,255,255,0.045)] transition-colors hover:border-vea-steel/40 hover:bg-vea-steel/[0.11] hover:text-white"
          >
            Explore cases
          </Link>
        </div>
      </section>

      <MissionSection />
    </main>
  );
}
