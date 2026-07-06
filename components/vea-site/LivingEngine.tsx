"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity } from "lucide-react";
import Reveal from "./Reveal";
import Counter from "./Counter";

const METRICS = [
  { label: "Computing Nodes", zh: "计算节点", value: 128, live: false },
  { label: "Models Running", zh: "运行模型", value: 36, live: false },
  { label: "Events Processed / h", zh: "事件处理 / 小时", value: 23674, live: true },
];

const STREAM = [
  { subject: "AI Semiconductor · HBM", note: "Probability updated", zh: "概率已更新" },
  { subject: "Cloud Infrastructure · CapEx", note: "Path recalculated", zh: "路径已重算" },
  { subject: "Energy Storage · Materials", note: "Signal detected", zh: "信号已检测" },
  { subject: "Biotech · Regenerative", note: "Event probability updated", zh: "事件概率已更新" },
  { subject: "Robotics · Humanoid", note: "Strategy optimized", zh: "策略已优化" },
  { subject: "Optical Interconnect", note: "Position shift up", zh: "位置上升" },
  { subject: "Advanced Packaging", note: "Validation confirmed", zh: "验证已确认" },
];

function nowStamp(offsetSec: number) {
  const d = new Date(Date.now() - offsetSec * 1000);
  return d.toTimeString().slice(0, 8);
}

export default function LivingEngine() {
  const [feed, setFeed] = useState(
    STREAM.slice(0, 5).map((s, i) => ({ ...s, id: i, ts: nowStamp(i * 33) }))
  );

  useEffect(() => {
    let n = STREAM.length;
    const iv = setInterval(() => {
      const s = STREAM[n % STREAM.length];
      setFeed((prev) => [{ ...s, id: n, ts: nowStamp(0) }, ...prev].slice(0, 5));
      n += 1;
    }, 2600);
    return () => clearInterval(iv);
  }, []);

  return (
    <section id="engine" className="relative px-6 py-28 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-3 text-center text-xs uppercase tracking-[0.25em] text-white/35">
            The engine
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mx-auto max-w-3xl text-balance text-center text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            It never stops <span className="neon-text">computing.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-5 max-w-xl text-balance text-center text-base leading-relaxed text-white/45">
            系统正在持续计算 — around the clock, VEA recomputes value paths as the
            world changes.
          </p>
        </Reveal>

        {/* live counters */}
        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {METRICS.map((m, i) => (
            <Reveal key={m.label} delay={0.1 + i * 0.08}>
              <div className="glass rounded-2xl p-6 text-center">
                <p className="font-mono text-4xl font-semibold text-vea-neon">
                  <Counter value={m.value} live={m.live} />
                </p>
                <p className="mt-2 text-sm text-white/70">{m.label}</p>
                <p className="text-xs text-white/35">{m.zh}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* live computation stream */}
        <Reveal delay={0.15}>
          <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/40">
              <Activity className="h-3.5 w-3.5 text-vea-neon" />
              Live computation stream · 实时计算流
            </div>
            <div className="flex flex-col gap-1.5">
              {feed.map((row) => (
                <motion.div
                  key={row.id}
                  layout
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="flex items-center gap-4 rounded-lg px-2 py-2 font-mono text-xs"
                >
                  <span className="text-vea-neon/70">{row.ts}</span>
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-vea-neon" />
                  <span className="min-w-0 flex-1 truncate text-white/75">
                    {row.subject}
                  </span>
                  <span className="hidden text-white/45 sm:inline">{row.note}</span>
                  <span className="text-white/30 sm:hidden">{row.zh}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
