"use client";

import { Clock, LineChart, Layers, ShieldCheck } from "lucide-react";
import Reveal from "./Reveal";

const POINTS = [
  {
    icon: Clock,
    title: "Time-windowed value paths",
    zh: "时间窗口内的最优路径",
    body: "VEA computes the optimal monetization path for a technology within specific windows — 7, 30, 90, 180 days — so you act when it matters.",
  },
  {
    icon: LineChart,
    title: "Continuous validation",
    zh: "持续验证",
    body: "Every result is validated against commercial outcomes, monetization transactions, and capital markets — and updated as reality moves.",
  },
  {
    icon: Layers,
    title: "Position in the value chain",
    zh: "价值链位置",
    body: "See exactly where a value subject sits today, and the trajectory VEA computes for its position tomorrow.",
  },
  {
    icon: ShieldCheck,
    title: "Results, not process",
    zh: "只交付结果",
    body: "All computation, reasoning, and validation stay in the backend. You receive a clean, high-value Result Package — nothing to learn.",
  },
];

export default function SellingPoints() {
  return (
    <section className="relative px-6 py-28 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-3 text-center text-xs uppercase tracking-[0.25em] text-white/35">
            Why VEA
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mx-auto max-w-3xl text-balance text-center text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            You buy the <span className="neon-text">result.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-xl text-balance text-center text-base leading-relaxed text-white/45">
            把复杂计算隐藏在后台，把高价值结果交付给用户。
          </p>
        </Reveal>

        <div className="mt-16 grid gap-5 sm:grid-cols-2">
          {POINTS.map((p, i) => (
            <Reveal key={p.title} delay={0.1 + i * 0.06}>
              <div className="group h-full rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition-colors hover:border-vea-neon/25">
                <div className="mb-5 inline-flex rounded-2xl border border-white/10 bg-white/5 p-3">
                  <p.icon className="h-5 w-5 text-vea-neon" />
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
