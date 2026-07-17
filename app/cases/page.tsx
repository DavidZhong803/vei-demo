import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { CASES } from "@/lib/vea";

const CASE_TONES = [
  {
    line: "from-vea-neon/80 via-vea-neon/30 to-transparent",
    label: "text-vea-mist",
    wash: "group-hover:bg-vea-neon/[0.045]",
  },
  {
    line: "from-[#9fb3d4] via-vea-steel/30 to-transparent",
    label: "text-[#aebfda]",
    wash: "group-hover:bg-vea-steel/[0.055]",
  },
  {
    line: "from-vea-steel/80 via-vea-steel/30 to-transparent",
    label: "text-vea-steel",
    wash: "group-hover:bg-vea-steel/[0.045]",
  },
];

export const metadata: Metadata = {
  title: "VEA — Case Library",
  description: "Computed Technical Asset Monetization Result Packages.",
};

export default function CasesPage() {
  return (
    <main className="case-canvas relative min-h-screen overflow-hidden text-white">
      <div className="material-texture pointer-events-none fixed inset-0 opacity-90" />
      <div className="pointer-events-none fixed inset-0 grid-bg opacity-[0.14]" />
      <div className="pointer-events-none fixed inset-0 grain opacity-[0.025]" />

      <div className="relative mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-16">
        <Link
          href="/"
          className="group mb-14 inline-flex items-center gap-1.5 text-xs font-medium text-white/66 transition-colors hover:text-white sm:mb-20"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />
          Home
        </Link>

        <p className="mb-4 flex w-fit border-l-2 border-vea-steel/75 bg-vea-steel/[0.065] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#bfd2f2]">
          Explore cases
        </p>
        <h1 className="max-w-2xl text-balance text-4xl font-semibold tracking-tight text-white/92 sm:text-5xl">
          See the computation through its results.
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-7 text-white/66 sm:text-base">
          Select a company to open its computed position, timing window, and monetization path.
        </p>

        <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {CASES.map((c, index) => {
            const tone = CASE_TONES[index % CASE_TONES.length];

            return (
            <Link
              key={c.id}
              href={`/app?case=${c.id}`}
              className={`metal-card group relative flex min-h-[19rem] flex-col overflow-hidden rounded-lg p-5 transition-colors hover:border-vea-steel/30 sm:p-6 ${tone.wash}`}
            >
              <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${tone.line}`} />
              <div className="flex min-h-8 items-start justify-between gap-3">
                <span className="text-xl font-semibold leading-7 text-white/92">
                  {c.subject}
                </span>
                <ArrowUpRight className={`mt-1 h-4 w-4 shrink-0 opacity-55 transition-opacity group-hover:opacity-100 ${tone.label}`} />
              </div>
              <p className={`mt-1 text-[11px] font-medium uppercase tracking-[0.12em] ${tone.label}`}>
                {c.kind}
              </p>
              <p className="mt-5 grow text-sm leading-6 text-white/72">
                {c.executiveSummary}
              </p>
              <div className="mt-6 grid grid-cols-2 border-t border-white/[0.07] pt-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.12em] text-[#9fb7dc]">Position</p>
                  <p className="mt-1 text-sm font-medium text-white/72">{c.currentPosition.percentile}</p>
                </div>
                <div className="border-l border-white/[0.07] pl-4">
                  <p className="text-[10px] uppercase tracking-[0.12em] text-[#9fb7dc]">Probability</p>
                  <p className={`mt-1 text-sm font-semibold ${tone.label}`}>{c.dashboard.realizationProbability}%</p>
                </div>
              </div>
            </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
