"use client";

import { Building2, Cloud, Code2, Monitor, Smartphone } from "lucide-react";
import Reveal from "./Reveal";

const CHANNELS = [
  { icon: Building2, label: "Enterprise" },
  { icon: Cloud, label: "Cloud" },
  { icon: Code2, label: "API" },
  { icon: Monitor, label: "PC" },
  { icon: Smartphone, label: "Mobile" },
];

export default function Access() {
  return (
    <section className="relative px-6 py-24">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-white/35">
            One framework · many ways to call it
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Callable everywhere.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {CHANNELS.map((c) => (
              <div
                key={c.label}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm text-white/70"
              >
                <c.icon className="h-4 w-4 text-vea-neon/80" />
                {c.label}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
