"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import type { VEICase } from "@/lib/cases";
import ReasoningChain from "./ReasoningChain";

const STEP_MS = 1150; // time each "thinking" step is shown before resolving

export default function WorkingStage({
  data,
  onComplete,
}: {
  data: VEICase;
  onComplete: () => void;
}) {
  const steps = data.working;
  // resolved = number of steps fully done; thinking = index currently spinning
  const [resolved, setResolved] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (resolved >= steps.length) {
      const t = setTimeout(onComplete, 1400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setResolved((r) => r + 1), STEP_MS);
    return () => clearTimeout(t);
  }, [resolved, steps.length, onComplete]);

  // keep newest visible step in view
  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [resolved]);

  const thinkingIndex = resolved < steps.length ? resolved : -1;
  const progress = Math.round((resolved / steps.length) * 100);
  // reveal reasoning nodes in sync with progress
  const activeNodes = Math.round((resolved / steps.length) * data.reasoning.length);

  return (
    <motion.div
      key="working"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(6px)" }}
      transition={{ duration: 0.5 }}
      className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-6 py-20"
    >
      <div className="mb-10 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/60">
          <Loader2 className="h-3.5 w-3.5 animate-spin" style={{ color: data.accent }} />
          AI is working · {data.name}
        </div>
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Understanding your value subject
        </h2>
        <p className="mt-3 text-sm text-white/40">
          No forms. No questionnaires. The agent reasons on its own.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr]">
        {/* streaming status list */}
        <div
          ref={listRef}
          className="glass max-h-[420px] overflow-y-auto rounded-2xl p-5"
        >
          <div className="flex flex-col gap-3">
            {steps.map((step, i) => {
              const isThinking = i === thinkingIndex;
              const isDone = i < resolved;
              const isPending = i > thinkingIndex && thinkingIndex !== -1;
              if (isPending) return null; // reveal progressively
              return (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
                    {isDone ? (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex h-5 w-5 items-center justify-center rounded-full"
                        style={{ background: `${data.accent}22` }}
                      >
                        <Check className="h-3 w-3" style={{ color: data.accent }} />
                      </motion.span>
                    ) : (
                      <Loader2
                        className="h-4 w-4 animate-spin"
                        style={{ color: data.accent }}
                      />
                    )}
                  </span>
                  <div>
                    <p
                      className="text-sm font-medium"
                      style={{ color: isDone ? "#fff" : "rgba(255,255,255,0.85)" }}
                    >
                      {step.label}
                      {isThinking && <span className="caret" />}
                    </p>
                    <AnimatePresence>
                      {isDone && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-1 overflow-hidden text-xs leading-relaxed text-white/45"
                        >
                          {step.detail}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* reasoning chain */}
        <div className="glass rounded-2xl p-5">
          <ReasoningChain
            nodes={data.reasoning}
            activeCount={activeNodes}
            accent={data.accent}
          />
        </div>
      </div>

      {/* progress bar */}
      <div className="mx-auto mt-10 w-full max-w-md">
        <div className="mb-2 flex items-center justify-between text-xs text-white/40">
          <span>Analyzing value paths…</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full"
            style={{ background: data.accent }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
