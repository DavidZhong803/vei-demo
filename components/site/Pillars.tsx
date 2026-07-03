"use client";

import { Brain, Feather, GitBranch } from "lucide-react";
import Reveal from "./Reveal";

const PILLARS = [
  {
    icon: Brain,
    title: "One super brain",
    zh: "一个超级大脑",
    body: "Feed it everything — decks, docs, code, financials, the market. VEI leases massive data into a single brain that understands your enterprise as a whole.",
  },
  {
    icon: Feather,
    title: "Lightweight to run",
    zh: "轻量化管理与使用",
    body: "No dashboards to babysit, no forms to fill. You upload; it works. Managing and using your AI OS stays effortless as it grows.",
  },
  {
    icon: GitBranch,
    title: "Decision-first",
    zh: "决策优先",
    body: "It doesn't just execute tasks — it decides what's worth doing. VEI finds the best value path, then drives the actions that realize it.",
  },
];

export default function Pillars() {
  return (
    <section className="relative px-6 py-28 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-4 text-center text-xs uppercase tracking-[0.25em] text-white/35">
            What VEI is
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mx-auto max-w-3xl text-balance text-center text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Your enterprise&apos;s{" "}
            <span className="gradient-text">super brain.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-xl text-balance text-center text-base leading-relaxed text-white/45">
            这个时代的 AI，是一个承租巨量数据的超级大脑。VEI 让它成为你公司的超级大脑。
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={0.1 + i * 0.08}>
              <div className="group h-full rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition-colors hover:border-white/20">
                <div className="mb-5 inline-flex rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p.icon className="h-5 w-5 text-vei-accent" />
                </div>
                <h3 className="text-lg font-semibold text-white">{p.title}</h3>
                <p className="mt-0.5 text-xs text-white/35">{p.zh}</p>
                <p className="mt-4 text-sm leading-relaxed text-white/50">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
