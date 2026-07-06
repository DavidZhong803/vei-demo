import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { CASES } from "@/lib/vea";

export const metadata: Metadata = {
  title: "VEA — Case Library",
  description: "Computed Technical Monetization Result Packages.",
};

export default function CasesPage() {
  return (
    <main className="relative min-h-screen text-slate-900">
      <div className="pointer-events-none fixed inset-0 -z-10 product-canvas" />
      <div className="pointer-events-none fixed inset-0 -z-10 grid-light" />
      <div className="pointer-events-none fixed inset-0 -z-10 grain opacity-[0.04]" />

      <div className="mx-auto max-w-5xl px-6 py-20">
        <Link
          href="/"
          className="group mb-10 inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-3.5 py-1.5 text-xs text-slate-500 transition-colors hover:border-black/20 hover:text-slate-800"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          Home
        </Link>

        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-vea-emerald/20 bg-vea-emerald/[0.06] px-3.5 py-1.5 text-xs font-medium text-vea-emerald">
          Case Library
        </div>
        <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          Computed Result Packages
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-500">
          Each case is shown only as VEA shows it: input → AI output → validated
          result. No process, no methodology — just the delivered result.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CASES.map((c) => (
            <Link
              key={c.id}
              href={`/app?case=${c.id}`}
              className="group paper-card block rounded-2xl p-6 transition-transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="text-xl font-semibold text-slate-900">
                  {c.subject}
                </span>
                <ArrowUpRight className="h-4 w-4 text-slate-300 transition-colors group-hover:text-vea-emerald" />
              </div>
              <p className="mt-1 text-[11px] uppercase tracking-wide text-slate-400">
                {c.kind}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-500">
                {c.executiveSummary}
              </p>
              <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-vea-emerald">
                Open Result Package
                <ArrowUpRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
