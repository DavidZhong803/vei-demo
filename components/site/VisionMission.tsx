"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

export default function VisionMission() {
  return (
    <section className="relative px-6 py-32 sm:py-40">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <p className="mb-6 text-xs uppercase tracking-[0.25em] text-white/35">
            Vision
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="text-balance text-4xl font-semibold leading-[1.15] tracking-tight sm:text-5xl md:text-6xl">
            The future belongs to enterprises that{" "}
            <span className="gradient-text">
              continuously create and evolve value.
            </span>
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-8 max-w-2xl text-balance text-base leading-relaxed text-white/45">
            未来属于那些能够持续创造价值、持续演化价值的企业。
            <br />
            VEI，为企业构建实现这一目标的 AI 操作系统。
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-12 flex justify-center">
            <Link
              href="/demo"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-transform hover:scale-[1.03] active:scale-95"
            >
              Enter the demo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
