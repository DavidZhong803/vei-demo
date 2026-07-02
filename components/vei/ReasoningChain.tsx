"use client";

import { motion } from "framer-motion";
import type { ReasoningNode } from "@/lib/cases";

/**
 * Visualizes the VEI backend reasoning framework:
 * Time → Event → State → Position → Value → Evolution → Advantage
 * Nodes light up progressively as `activeCount` increases.
 */
export default function ReasoningChain({
  nodes,
  activeCount,
  accent,
}: {
  nodes: ReasoningNode[];
  activeCount: number;
  accent: string;
}) {
  return (
    <div className="w-full">
      <p className="mb-4 text-center text-[10px] uppercase tracking-[0.28em] text-white/30">
        VEI Reasoning Engine
      </p>
      <div className="flex flex-col gap-2">
        {nodes.map((node, i) => {
          const active = i < activeCount;
          return (
            <motion.div
              key={node.key}
              initial={false}
              animate={{
                opacity: active ? 1 : 0.28,
              }}
              transition={{ duration: 0.4 }}
              className="relative flex items-start gap-3"
            >
              {/* rail */}
              <div className="flex flex-col items-center">
                <motion.span
                  className="flex h-6 w-6 items-center justify-center rounded-full border text-[10px] font-semibold"
                  animate={{
                    borderColor: active ? accent : "rgba(255,255,255,0.15)",
                    color: active ? accent : "rgba(255,255,255,0.4)",
                    boxShadow: active
                      ? `0 0 16px ${accent}55`
                      : "0 0 0px transparent",
                  }}
                >
                  {i + 1}
                </motion.span>
                {i < nodes.length - 1 && (
                  <span
                    className="my-1 w-px flex-1"
                    style={{
                      minHeight: 14,
                      background: active
                        ? `linear-gradient(${accent}, transparent)`
                        : "rgba(255,255,255,0.08)",
                    }}
                  />
                )}
              </div>

              <div className="pb-1">
                <span
                  className="text-sm font-medium"
                  style={{ color: active ? "#fff" : "rgba(255,255,255,0.5)" }}
                >
                  {node.label}
                </span>
                <motion.p
                  initial={false}
                  animate={{
                    opacity: active ? 1 : 0,
                    height: active ? "auto" : 0,
                  }}
                  className="overflow-hidden text-xs leading-relaxed text-white/45"
                >
                  {node.insight}
                </motion.p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
