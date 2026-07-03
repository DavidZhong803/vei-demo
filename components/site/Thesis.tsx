"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";

function CostBar({
  label,
  sublabel,
  target,
  tone,
  delay,
}: {
  label: string;
  sublabel: string;
  target: number; // 0-100
  tone: "dim" | "bright";
  delay: number;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <span
          className={`text-sm font-medium ${
            tone === "bright" ? "text-white" : "text-white/45"
          }`}
        >
          {label}
        </span>
        <span className="text-xs text-white/35">{sublabel}</span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          className="h-full rounded-full"
          style={{
            background:
              tone === "bright"
                ? "linear-gradient(90deg, #7c9cff, #a78bfa)"
                : "rgba(255,255,255,0.18)",
          }}
          initial={{ width: 0 }}
          whileInView={{ width: `${target}%` }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

export default function Thesis() {
  return (
    <section id="thesis" className="relative px-6 py-28 sm:py-36">
      <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2">
        <div>
          <Reveal>
            <p className="mb-4 text-xs uppercase tracking-[0.25em] text-white/35">
              The shift
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Execution is getting cheap.
              <br />
              <span className="gradient-text">Deciding is everything.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/50">
              AI is becoming a super brain that leases vast amounts of data and
              turns it into judgment. As it automates execution, value
              concentrates where it always mattered most: the decision.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/35">
              在决策成本远大于执行成本的大多数行业，谁做对决策，谁就赢。
              VEI 不只是帮你执行，更重要的是帮你决策。
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="glass-strong rounded-3xl p-8">
            <p className="mb-8 text-xs uppercase tracking-[0.2em] text-white/30">
              Where value lives · today
            </p>
            <div className="flex flex-col gap-7">
              <CostBar
                label="Execution cost"
                sublabel="automated by AI"
                target={22}
                tone="dim"
                delay={0.1}
              />
              <CostBar
                label="Decision cost"
                sublabel="where value is won or lost"
                target={88}
                tone="bright"
                delay={0.35}
              />
            </div>
            <div className="mt-8 border-t border-white/10 pt-5">
              <p className="text-sm leading-relaxed text-white/45">
                The bottleneck moved. VEI is the decision layer — an operating
                system for the calls that actually move the enterprise.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
